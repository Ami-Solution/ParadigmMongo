/*
  =========================
  ParadigmMongo (development)
  server.ts @ {master}
  =========================
  @date_inital 27 September 2018
  @date_modified 27 September 2018
  @author Henry Harder

  TypeScript implementation of the ParadigmCore RPC Server (using async functions).
*/

import * as _mdb from "mongodb";
import * as express from "express";
import * as http from "http";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import * as WebSocket from "ws";

import * as API_DATA from "./api.json";
import * as config from "./config";

import { Logger } from "./Logger"
import { Message } from "./Message";
import { Writer } from "./Writer";

var mc = _mdb.MongoClient;
var app: express.Express = express();
var server = http.createServer(app);

app.use(bodyParser.json());
app.use(cors());

var client;
var db;
let ws;

// Root endpoint, provides version data and API endpoint info
app.get('/', async (_, res) => {
    res.status(200).send(API_DATA);
});

// Provides API endpoint info
app.get('/api', async (_, res) => {
    res.status(200).send(API_DATA.api);
});

// Returns all orders on OrderStream
app.get('/api/all', async (_, res) => {
    try {
        const docs = await db.collection('assets').find({}).toArray();
        res.send(docs);
    } catch (error) {
        Message.staticSendError(res, "Error retrieving data. Check request and try again.", 500);
    }
});

// Returns a single order by OrderID
app.get('/api/order/:id', async (req, res) => {
    try {
        const docs = await db.collection('orders').find({
            "id":req.params.id}).toArray();
        if(docs.length != 0) {
            res.send(docs);
        } else {
            Message.staticSendError(res, "No orders found with specified ID.", 404);
        }
    } catch (error) {
        Message.staticSendError(res, "Error retrieving data. Check request and try again.", 404);
    }
});


// Returns all orders for specified SubContract address
app.get('/api/subcontract/:address', async (req, res) => {
    try {
        const docs = await db.collection('orders').find({
            "data.subContract":req.params.address}).toArray();
        if(docs.length != 0) {
            res.send(docs);
        } else {
            Message.staticSendError(res, "No orders found for specified SubContract.", 404);
        }
    } catch (error) {
        Message.staticSendError(res, "Error retrieving data. Check request and try again.", 404);
    }
});

// Returns all orders from specified maker address
app.get('/api/maker/:address', async (req, res) => {
    try {
        const docs = await db.collection('orders').find({
            "data.maker":req.params.address}).toArray();
        if(docs.length != 0) {
            res.send(docs);
        } else {
            Message.staticSendError(res, "No orders found from specified maker.", 404);
        }
    } catch (error) {
        Message.staticSendError(res, "Error retrieving data. Check request and try again.", 404);
    }
});

// Begin bad request handler functions
// Responds with errors for impropper request formats for given endpoint
app.get('/api/order', async (_, res) => {
    Message.staticSendError(res, "Missing required 'ID' parameter.", 400);
});

app.get('/api/maker', async (_, res) => {
    Message.staticSendError(res, "Missing required 'address' parameter.", 400);
});

app.get('/api/subcontract', async (_, res) => {
    Message.staticSendError(res, "Missing required 'address' parameter.", 400);
});

app.post('/', async (_, res) => {
    Message.staticSendError(res, "Impropper request format 'POST' for / endpoint.", 400);
});

app.post('/api', async (_, res) => {
    Message.staticSendError(res, "Impropper request format 'POST' for /api endpoint.", 400);
});

app.post('/api/order', async (_, res) => {
    Message.staticSendError(res, "Impropper request format 'POST' for /api/order endpoint.", 400);
});

app.post('/api/order/:id', async (_, res) => {
    Message.staticSendError(res, "Impropper request format 'POST' for /api/order endpoint.", 400);
});

app.post('/api/maker', async (_, res) => {
    Message.staticSendError(res, "Impropper request format 'POST' for /api/maker endpoint.", 400);
});

app.post('/api/maker/:address', async (_, res) => {
    Message.staticSendError(res, "Impropper request format 'POST' for /api/maker endpoint.", 400);
});

app.post('/api/subcontract', async (_, res) => {
    Message.staticSendError(res, "Impropper request format 'POST' for /api/subcontract endpoint.", 400);
});

app.post('/api/subcontract/:address', async (_, res) => {
    Message.staticSendError(res, "Impropper request format 'POST' for /api/subcontract endpoint.", 400);
});
// End bad request endpoint function handlers

// 404 Bad Request Handler
app.use((_, res) => {
    Message.staticSendError(res, "Invalid endpoint. Check request and try again.", 404);
});

connect();

// Main function to connect to MongoDB backend
async function connect() {
    try {
        client = await mc.connect(config.MDB_API_URI, {useNewUrlParser: true});
        db = client.db(config.DB_NAME);
        server.listen(config.RPC_PORT, config.RPC_HOST);
        server.on("listening", () => {
            // Logger.logEvent(`Server started on port ${server.address().port} at ${server.address().address}`);
            Logger.logEvent(`Server started on port ${config.RPC_PORT} at ${config.RPC_HOST}`);
        });
    } catch (error) {
        Logger.logError("Internal server error. Try again.");
    }
}

let writer = new Writer({
    dbURI: config.MDB_API_URI,
    dbName: config.DB_NAME,
    dbColl: config.DB_COL
});

try {
    ws = new WebSocket(config.WS_URI);
    Logger.logEvent("Connected to WebSocket server.")
} catch (error) {
    Logger.logError("Error connecting to WebSocket server.")
}

ws.on('message', (data) => {
    try {
        let dataObj = JSON.parse(data);
        if(dataObj.event === "order") {
            writer.insertOrder(dataObj);
            Logger.logEvent("Added new order to DB");
        } else {
            Logger.logEvent("Skipping 'message' event");
        }
    }
    catch (error) {
        Logger.logError("Failed to add order to DB.");
    }
});