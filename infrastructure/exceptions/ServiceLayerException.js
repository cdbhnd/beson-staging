"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ServiceLayerException extends Error {
    constructor(message, data) {
        super("SERVICE_LAYER_EXCEPTION");
        this.name = "SERVICE_LAYER_EXCEPTION";
        this.message = message;
        this.data = data;
    }
}
exports.ServiceLayerException = ServiceLayerException;
//# sourceMappingURL=ServiceLayerException.js.map