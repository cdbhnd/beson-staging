"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EventAggregator_1 = require("../../infrastructure/eventEngine/EventAggregator");
function EventListener(event) {
    return (target, propertyKey, descriptor) => {
        let originalMethod = descriptor.value;
        let eventMediator = EventAggregator_1.EventAggregator.getMediator();
        eventMediator.subscribe(event, originalMethod);
    };
}
exports.EventListener = EventListener;
//# sourceMappingURL=EventListener.js.map