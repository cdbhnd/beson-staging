"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./ValidationException"));
__export(require("./InvalidCredentialsException"));
__export(require("./EntityNotFoundException"));
__export(require("./UsernameNotAvailableException"));
__export(require("./UserNotAuthorizedException"));
__export(require("./ArgumentNullException"));
__export(require("./ServiceLayerException"));
__export(require("./UserAlreadyExist"));
__export(require("./UseOperationNotAllowed"));
__export(require("./EntityAlreadyExist"));
__export(require("./OperationNotPermited"));
class ExceptionTypes {
}
ExceptionTypes.ValidationException = "ValidationException";
ExceptionTypes.InvalidCredentialsException = "InvalidCredentialsException";
ExceptionTypes.EntityNotFoundException = "EntityNotFoundException";
ExceptionTypes.UserAlreadyExist = "UserAlreadyExist";
ExceptionTypes.UseOperationNotAllowed = "UseOperationNotAllowed";
ExceptionTypes.UsernameNotAvailableException = "UsernameNotAvailableException";
ExceptionTypes.UserNotAuthorizedException = "UserNotAuthorizedException";
ExceptionTypes.ArgumentNullException = "ArgumentNullException";
ExceptionTypes.ServiceLayerException = "ServiceLayerException";
ExceptionTypes.EntityAlreadyExist = "EntityAlreadyExist";
ExceptionTypes.OperationNotPermited = "OperationNotPermited";
exports.ExceptionTypes = ExceptionTypes;
//# sourceMappingURL=index.js.map