"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
require("./controllers/");
// import { MapperRegistry } from "./mappers/Register";
const config = require("config");
const queryParserMiddleware_1 = require("./middleware/queryParserMiddleware");
const corsMiddleware_1 = require("./middleware/corsMiddleware");
const routing_controllers_1 = require("routing-controllers");
const bodyParser = require("body-parser");
require("automapper-ts");
class Server {
    constructor() {
        this.app = express();
        this.app.use(corsMiddleware_1.corsMiddleware);
        this.app.use(queryParserMiddleware_1.queryParserMiddleware);
        this.app.use(express.static(String(config.get("folderPaths.assets"))));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        // this.app.use(logMiddleware);
        routing_controllers_1.useExpressServer(this.app);
    }
    listen(port) {
        let expressApp = this.app;
        let expresServerInstance = expressApp.listen(port);
        // let mr: MapperRegistry = new MapperRegistry();
        // mr.init();
        console.log("Application listening at port: " + port);
        return expresServerInstance;
    }
}
exports.Server = Server;
//# sourceMappingURL=Server.js.map