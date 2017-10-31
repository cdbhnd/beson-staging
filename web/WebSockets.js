"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socketsIO = require("socket.io");
// import { AuthService } from "./AuthService";
class WebSockets {
    constructor(httpServer) {
        // this.authService = new AuthService();
        this.webSockets = socketsIO(httpServer);
        this.webSockets.on("connection", (socket) => {
            // this.ensureUserIsAuthenticated(socket);
        });
    }
    boradcastMessage(topic, message) {
        this.webSockets.emit(topic, message);
    }
}
exports.WebSockets = WebSockets;
//# sourceMappingURL=WebSockets.js.map