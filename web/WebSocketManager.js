"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EventAggregator_1 = require("../infrastructure/eventEngine/EventAggregator");
class WebSocketManager {
    constructor(webSocketServer) {
        this.sockets = webSocketServer;
        this.monitorEvents();
    }
    monitorEvents() {
        let eventMediator = EventAggregator_1.EventAggregator.getMediator();
        eventMediator.subscribe(EventAggregator_1.EventAggregator.TEST_EVENT, this.passInformationToSockets.bind(this));
        eventMediator.subscribe(EventAggregator_1.EventAggregator.USER_MESSAGE_SENT, this.passInformationToSockets.bind(this));
        eventMediator.subscribe(EventAggregator_1.EventAggregator.MESSAGE_STATUS_UPDATED, this.passInformationToSockets.bind(this));
    }
    passInformationToSockets(msg, data) {
        console.log("Pass info to sockets", msg, data);
        this.sockets.boradcastMessage(msg, data);
    }
}
exports.WebSocketManager = WebSocketManager;
;
//# sourceMappingURL=WebSocketManager.js.map