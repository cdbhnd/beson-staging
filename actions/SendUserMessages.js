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
const ActionBase_1 = require("./ActionBase");
class Action extends ActionBase_1.ActionBase {
    constructor() {
        super();
        this.messageRepo = _1.kernel.get(_1.Types.IMessageRepository);
        this.userRepo = _1.kernel.get(_1.Types.IUserRepository);
        this.messageService = _1.kernel.get(_1.Types.IMessageService);
    }
    ;
    execute(context) {
        return __awaiter(this, void 0, void 0, function* () {
            let message = yield this.messageRepo.findOne({ id: context.params.messageId });
            for (let i = 0; i < context.params.userIds.length; i++) {
                let user = yield this.userRepo.findUser(context.params.userIds[i]);
                yield this.messageService.send(message, user);
            }
            return message;
        });
    }
    onActionExecuting(context) {
        return __awaiter(this, void 0, void 0, function* () {
            return context;
        });
    }
    onActionExecuted(result) {
        return __awaiter(this, void 0, void 0, function* () {
            return result;
        });
    }
    getConstraints() {
        return {
            messageId: "string|required",
        };
    }
    getSanitizationPattern() {
        return {};
    }
}
exports.Action = Action;
//# sourceMappingURL=SendUserMessages.js.map