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

// Incoming OrderStream WebSocket URI
export const WS_URI: string = 'wss://bs1.paradigm.market/stream';

// Database backend URI
export const MDB_API_URI: string = 'mongodb://localhost:27017';

// Databse name
export const DB_NAME: string = 'orders';

// Query API config
export const RPC_HOST: string = 'localhost';
export const RPC_PORT: number = 4244;