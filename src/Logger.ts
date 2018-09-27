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

export class Logger {
    public static logOrder(orderID: string): void {
        console.log(`[PC LOG: New Order @ ${new Date().toLocaleString()}] ID: ${orderID}`);
    }

    public static logError(error: string): void {
        console.log(`[PC LOG: Error @ ${new Date().toLocaleString()}] Error: ${error}`);
    }

    public static logEvent(message: string): void {
        console.log(`[PC LOG: Event @ ${new Date().toLocaleString()}] Event: ${message}`);
    }
}