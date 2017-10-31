"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class InvalidCredentialsException extends Error {
    constructor(username, encryptePassword, message, data) {
        super("INVALID_CREDENTIALS");
        this.name = "INVALID_CREDENTIALS";
        this.username = username;
        this.encryptedPassword = encryptePassword;
        this.message = !!message ? message : "INVALID_CREDENTIALS";
        this.data = data;
    }
}
exports.InvalidCredentialsException = InvalidCredentialsException;
//# sourceMappingURL=InvalidCredentialsException.js.map