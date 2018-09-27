# ParadigmMongo
Simple Node.js add-on to subscribe to OrderStream and insert orders into a MongoDB server. Also provides simple query API via HTTP.

## Prerequisites
This application is intended as an optional add-on interface for [ParadigmCore](https://github.com/paradigmfoundation/paradigmcore) that connects to the event-stream output of an OrderStream node, and adds orders to a MongoDB database. This program also provides a query API.

- Must run on an OrderStream node
    - Full validator with `tendermint`
    - Recent version of ParadigmCore
- Must have MongoDB server running:
    - `mongod` must be running on `27017`, or adjust `config`
- OS Node must be broadcasting on default port `4242` (or the `config` must be adjusted.)

## Install
The `ParadigmMongo` is implemented in TypeScript, and does not ship with compiled files. To build, you must have TypeScript (>3.x):
```
sudo npm i typescript -g
```
Clone this repository:
```
git clone https://github.com/paradigmfoundation/paradigmmongo
```
Install dependencies via NPM (or yarn):
```
npm i
```

## Build
To generate the JS files in `./dist/`, compile the TypeScript source with:
```
npm run build OR tsc
```

## Run
Launching (assuming config is setup, and background processes are running) is a simple as running the startup command:
```
npm start OR node ./dist/server.js
```

This will launch a MongoDB query API on `localhost:4244` that you can access in browser or via `curl` or similar to view all the endpoints:
```
http://localhost:4244/api
```

## In Production
If running in production, you should make sure your node is hardened (always do this), and then proxy the query API behind reverse-proxy or webserver to expose the API to the public. 

