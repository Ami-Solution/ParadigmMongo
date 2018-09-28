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

import { MongoClient } from "mongodb";
import { Logger } from "./Logger";
import { MDB_API_URI, DB_NAME } from "./config";

export class Writer {
    private dbURI: string; // MongoDB RPC URL
    private dbName: string; // MongoDB database name
    private dbColl: string; // MongoDB collection name

    private client: MongoClient;
    private db: any; // Connected DB
    private coll: any; // Collection in use

    private connect = async function() {
        try {
            this.client = await MongoClient.connect(this.dbURI, {useNewUrlParser: true});
            this.db = this.client.db(this.dbName)
            this.coll = this.db.collection(this.dbColl);
            setTimeout(Logger.logEvent, 2000, 'Connected to DB for writing.');
        } catch (error) {
            console.log("in connect(): " + error);
            throw new Error("Error connecting to DB.");
        }
    }

    constructor (options: any) {
        this.dbURI = options.dbURI;
        this.dbName = options.dbName;
        this.dbColl = options.dbColl;

        try {
            this.connect().catch(err => { console.log("from connect: "+err) });
        } catch (error) {
            throw new Error("Error connecting to DB.");
        }
    }

    public async insertOrder(order: object) {
        try {
            let result = await this.coll.insertOne(order);
            if (result.ok != 1) {
                console.log(result);
                throw new Error(result);
            }
        } catch (error) {
            throw new Error("Error inserting order to DB");
        }      
    }
}