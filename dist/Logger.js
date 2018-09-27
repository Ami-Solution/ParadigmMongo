"use strict";
/*
  =========================
  ParadigmCore (developent)
  Logger.ts @ {master}
  =========================
  @date_inital 22 August 2018
  @date_modified 23 August 2018
  @author Henry Harder
  Logger class for pretty outputs on the server console.
*/
Object.defineProperty(exports, "__esModule", { value: true });
class Logger {
    static logOrder(orderID) {
        console.log(`[PC-Mongo LOG: New Order @ ${new Date().toLocaleString()}] ID: ${orderID}`);
    }
    static logError(error) {
        console.log(`[PC-Mongo LOG: Error @ ${new Date().toLocaleString()}] Error: ${error}`);
    }
    static logEvent(message) {
        console.log(`[PC-Mongo LOG: Event @ ${new Date().toLocaleString()}] Event: ${message}`);
    }
}
exports.Logger = Logger;
