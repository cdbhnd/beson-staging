"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UseOperationNotAllowed extends Error {
    constructor(name, message, data) {
        super("UseOperationNotAllowed");
        this.name = name;
        this.message = message;
        this.data = data;
    }
}
exports.UseOperationNotAllowed = UseOperationNotAllowed;
//# sourceMappingURL=UseOperationNotAllowed.js.map