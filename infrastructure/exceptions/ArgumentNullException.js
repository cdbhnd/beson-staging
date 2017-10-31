"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ArgumentNullException extends Error {
    constructor(argument) {
        super("ARGUMENT_CAN_NOT_BE_NULL");
        this.name = "ARGUMENT_CAN_NOT_BE_NULL";
        this.message = argument.toUpperCase() + "_ARGUMENT_CAN_NOT_BE_NULL";
        this.data = argument;
    }
}
exports.ArgumentNullException = ArgumentNullException;
//# sourceMappingURL=ArgumentNullException.js.map