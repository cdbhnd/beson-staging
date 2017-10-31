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
const Entities = require("../entities/");
class Action extends ActionBase_1.ActionBase {
    constructor() {
        super();
        this.messageService = _1.kernel.get(_1.Types.IMessageService);
    }
    ;
    execute(context) {
        return __awaiter(this, void 0, void 0, function* () {
            let message = {
                id: null,
                content: context.params.content,
                createdAt: (new Date()).toISOString(),
                deleted: false,
                executionType: context.params.executionType,
                origin: context.params.origin,
                originName: null,
                scheduledAt: context.params.scheduledAt,
                seen: false,
                sent: false,
                sentAt: null,
                target: context.params.target,
                targetName: null,
                type: context.params.type,
                status: Entities.MessageStatus.OPEN,
                assignee: null,
                assigneeName: null,
                notificationType: Entities.NotificationType.INFO,
            };
            return yield this.messageService.create(message);
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
            type: "string|required",
            origin: "string|required",
            target: "string|required",
            content: "string|required",
            executionType: "string|required",
            scheduledAt: "string",
        };
    }
    getSanitizationPattern() {
        return {};
    }
}
exports.Action = Action;
//# sourceMappingURL=CreateMessage.js.map