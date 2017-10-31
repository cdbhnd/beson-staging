"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require("../../infrastructure/dependency-injection/");
class EventAggregator {
    static getMediator() {
        return _1.kernel.get(_1.Types.EventMediator);
    }
}
EventAggregator.TEST_EVENT = "TEST_EVENT";
EventAggregator.USER_MESSAGE_SENT = "USER_MESSAGE_SENT";
EventAggregator.MESSAGE_STATUS_UPDATED = "MESSAGE_STATUS_UPDATED";
exports.EventAggregator = EventAggregator;
//# sourceMappingURL=EventAggregator.js.map