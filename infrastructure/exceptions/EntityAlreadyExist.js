"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class EntityAlreadyExist extends Error {
    constructor(name, message, data) {
        super("EntityAlreadyExist");
        this.name = name;
        this.message = message;
        this.data = data;
    }
}
exports.EntityAlreadyExist = EntityAlreadyExist;
//# sourceMappingURL=EntityAlreadyExist.js.map