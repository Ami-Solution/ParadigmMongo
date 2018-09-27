"use strict";
/*
  =========================
  ParadigmCore (developent)
  config.ts @ {master}
  =========================
  @date_inital 16 July 2018
  @date_modified 20 August 2018
  @author Henry Harder

  Constants and configuration.
*/
Object.defineProperty(exports, "__esModule", { value: true });
// Incoming OrderStream WebSocket URI
exports.WS_URI = 'ws://localhost:4242';
//export const WS_URI: string = 'wss://bs1.paradigm.market/stream';
// Database backend URI
exports.MDB_API_URI = 'mongodb://localhost:27017';
// Databse name
exports.DB_NAME = 'local';
exports.DB_COL = 'orders';
// Query API config
exports.RPC_HOST = 'localhost';
exports.RPC_PORT = 4244;
