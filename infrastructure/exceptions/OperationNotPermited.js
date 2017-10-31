"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class OperationNotPermited extends Error {
    constructor(name, message, data) {
        super("OperationNotPermited");
        this.name = name;
        this.message = message;
        this.data = data;
    }
}
exports.OperationNotPermited = OperationNotPermited;
//# sourceMappingURL=OperationNotPermited.js.map