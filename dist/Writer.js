"use strict";
/*
  =========================
  ParadigmMongo (development)
  Writer.ts @ {master}
  =========================
  @date_inital 27 September 2018
  @date_modified 27 September 2018
  @author Henry Harder

  Writer class to write orders to MongoDB backend.
*/
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const Logger_1 = require("./Logger");
class Writer {
    constructor(options) {
        this.connect = async function () {
            try {
                this.client = await mongodb_1.MongoClient.connect(this.dbURI, { useNewUrlParser: true });
                this.db = this.client.db(this.dbName);
                this.coll = this.db.collection(this.dbColl);
                setTimeout(Logger_1.Logger.logEvent, 2000, 'Connected to DB for writing.');
            }
            catch (error) {
                throw new Error("Error connecting to DB.");
            }
        };
        this.dbURI = options.dbURI;
        this.dbName = options.dbName;
        this.dbColl = options.dbColl;
        try {
            this.connect();
        }
        catch (error) {
            throw new Error("Error connecting to DB.");
        }
    }
    async insertOrder(order) {
        try {
            console.log('Trying to insert to DB');
            let result = await this.coll.insertOne(order);
            console.log("Result (in insertOrder()): " + result);
        }
        catch (error) {
            throw new Error("Error inserting order to DB");
        }
    }
}
exports.Writer = Writer;
