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
const Exceptions = require("../infrastructure/exceptions/");
class Action extends ActionBase_1.ActionBase {
    constructor() {
        super();
        this.userInboxRepo = _1.kernel.get(_1.Types.IUserInboxRepository);
        this.messageService = _1.kernel.get(_1.Types.IMessageService);
        this.userRepo = _1.kernel.get(_1.Types.IUserRepository);
    }
    ;
    execute(context) {
        return __awaiter(this, void 0, void 0, function* () {
            let userInboxFromDb = context.params.userInbox;
            for (let i = 0; i < userInboxFromDb.messages.length; i++) {
                if (userInboxFromDb.messages[i].id === context.params.messageId) {
                    userInboxFromDb.messages[i].seen = context.params.seen ? context.params.seen : false;
                    userInboxFromDb.messages[i].deleted = context.params.deleted ? context.params.deleted : false;
                    if (context.params.status && context.params.assignee) {
                        let user = yield this.userRepo.findUser(context.params.assignee);
                        let message = yield this.messageService.updateMessageStatus(context.params.messageId, context.params.status, user);
                        userInboxFromDb.messages[i].status = message.status;
                        userInboxFromDb.messages[i].assignee = message.assignee;
                        userInboxFromDb.messages[i].assigneeName = message.assigneeName;
                    }
                    userInboxFromDb = yield this.userInboxRepo.update(userInboxFromDb);
                    return userInboxFromDb.messages[i];
                }
            }
            return null;
        });
    }
    onActionExecuting(context) {
        return __awaiter(this, void 0, void 0, function* () {
            let userInbox = yield this.userInboxRepo.findOne({ userId: context.params.userId });
            if (!userInbox) {
                throw new Exceptions.EntityNotFoundException("UserInbox", context.params.userId);
            }
            context.params.userInbox = userInbox;
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
            userId: "string|required",
            messageId: "string|required",
            seen: "boolean",
            deleted: "boolean",
            status: "string",
            assignee: "string",
        };
    }
    getSanitizationPattern() {
        return {};
    }
}
exports.Action = Action;
//# sourceMappingURL=UpdateUserMessage.js.map