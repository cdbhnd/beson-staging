"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const Server_1 = require("./web/Server");
require("./web/middleware/globalMiddleware");
const DB_1 = require("./database/DB");
const WebSockets_1 = require("./web/WebSockets");
const WebSocketManager_1 = require("./web/WebSocketManager");
const path = require("path");
const Service = require("./services");
const _1 = require("./scheduler/");
// tslint:disable-next-line:no-string-literal
global["appRoot"] = path.resolve(__dirname);
let port = process.env.PORT || 8080;
DB_1.DB.init()
    .then(() => {
    // Initialize WebServer
    let server = new Server_1.Server();
    // Initialize WebSockets Server
    let webSocketsServer = new WebSockets_1.WebSockets(server.listen(port));
    let webSocketManger = new WebSocketManager_1.WebSocketManager(webSocketsServer);
    // Initialize Document Service
    let documentGenerator = new Service.DocumentService();
    // Initialize Scheduler engine to collect all stored schedule actions form database and schedule thei execution again
    _1.Scheduler.init();
});
//# sourceMappingURL=index.js.map