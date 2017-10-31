"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require("../infrastructure/dependency-injection/");
const _2 = require("../infrastructure/exceptions/");
const Password = require("../utility/Password");
const ActionBase_1 = require("./ActionBase");
class Action extends ActionBase_1.ActionBase {
    constructor() {
        super();
        this.userRepository = _1.kernel.get(_1.Types.IUserRepository);
    }
    ;
    execute(context) {
        return __awaiter(this, void 0, void 0, function* () {
            let userFromDb = yield this.userRepository.findByQuery({ username: context.params.username });
            if (userFromDb == null) {
                throw new _2.InvalidCredentialsException(context.params.username, context.params.password);
            }
            let submitedPasswordValid = yield Password.comparePassword(context.params.password, userFromDb.password);
            if (submitedPasswordValid) {
                return userFromDb;
            }
            else {
                // throw error
                throw new _2.InvalidCredentialsException(context.params.username, context.params.password);
            }
        });
    }
    getConstraints() {
        return {
            username: "required",
            password: "required",
        };
    }
    getSanitizationPattern() {
        return {};
    }
}
exports.Action = Action;
//# sourceMappingURL=LoginUser.js.map