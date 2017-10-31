"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UsernameNotAvailableException extends Error {
    constructor(username, message, data) {
        super("USERNAME_UNAVAILABLE");
        this.name = "USERNAME_UNAVAILABLE";
        this.username = username;
        this.message = !!message ? message : "USERNAME_UNAVAILABLE";
        this.data = data;
    }
}
exports.UsernameNotAvailableException = UsernameNotAvailableException;
//# sourceMappingURL=UsernameNotAvailableException.js.map