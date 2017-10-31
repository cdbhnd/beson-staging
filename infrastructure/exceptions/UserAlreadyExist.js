"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserAlreadyExist extends Error {
    constructor(name, message, data) {
        super("UserAlreadyExist");
        this.name = name;
        this.message = message;
        this.data = data;
    }
}
exports.UserAlreadyExist = UserAlreadyExist;
//# sourceMappingURL=UserAlreadyExist.js.map