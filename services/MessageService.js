"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
const inversify_1 = require("inversify");
const _2 = require("../entities/");
const Check_1 = require("../utility/Check");
const Exceptions = require("../infrastructure/exceptions/");
const EventAggregator_1 = require("../infrastructure/eventEngine/EventAggregator");
const _3 = require("../scheduler/");
let MessageService = class MessageService {
    constructor() {
        this.messageRepository = _1.kernel.get(_1.Types.IMessageRepository);
        this.userInboxRepository = _1.kernel.get(_1.Types.IUserInboxRepository);
        this.userRepo = _1.kernel.get(_1.Types.IUserRepository);
    }
    create(message) {
        return __awaiter(this, void 0, void 0, function* () {
            Check_1.Check.notNull(message, "message");
            if (message.origin !== "SYSTEM") {
                let originUser = yield this.userRepo.findUser(message.origin);
                if (!originUser) {
                    throw new Exceptions.EntityNotFoundException("User", message.origin);
                }
                message.originName = originUser.name + " " + originUser.lastName;
            }
            else {
                message.originName = message.origin;
            }
            let targetUsers;
            if (message.target !== "ALL") {
                let targetUser = yield this.userRepo.findUser(message.origin);
                if (!targetUser) {
                    throw new Exceptions.EntityNotFoundException("User", message.origin);
                }
                message.targetName = targetUser.name + " " + targetUser.lastName;
                targetUsers = [targetUser];
            }
            else {
                targetUsers = yield this.userRepo.findAll();
                message.targetName = message.target;
            }
            let createdMessage = yield this.messageRepository.create(message);
            if (createdMessage.executionType === _2.MessageExecutionType.INSTANT) {
                for (let i = 0; i < targetUsers.length; i++) {
                    yield this.send(createdMessage, targetUsers[i]);
                }
            }
            else if (createdMessage.executionType === _2.MessageExecutionType.SCHEDULED) {
                // Call scheduler and schedule new task for sending a message to the User
                _3.Scheduler.create("SendUserMessages", "SendUserMessages", new Date(createdMessage.scheduledAt), {
                    messageId: createdMessage.id,
                    userIds: targetUsers.map((u) => { return u.id; }),
                });
            }
            return createdMessage;
        });
    }
    send(message, user) {
        return __awaiter(this, void 0, void 0, function* () {
            Check_1.Check.notNull(message, "message");
            Check_1.Check.notNull(user, "user");
            let userInbox = yield this.userInboxRepository.findOne({ userId: user.id });
            if (!userInbox) {
                userInbox = yield this.userInboxRepository.create({
                    id: null,
                    messages: [],
                    userId: user.id,
                });
            }
            let messageCopy = JSON.parse(JSON.stringify(message));
            messageCopy.sent = true;
            messageCopy.sentAt = (new Date()).toISOString();
            messageCopy.target = user.id;
            userInbox.messages.push(messageCopy);
            yield this.userInboxRepository.update(userInbox);
            EventAggregator_1.EventAggregator.getMediator().boradcastEvent(EventAggregator_1.EventAggregator.USER_MESSAGE_SENT, {
                user: user,
                message: messageCopy,
            });
            return message;
        });
    }
    updateMessageStatus(messageId, status, assignee) {
        return __awaiter(this, void 0, void 0, function* () {
            Check_1.Check.notNull(messageId, "messgeId");
            Check_1.Check.notNull(status, "status");
            Check_1.Check.notNull(assignee, "assignee");
            let message = yield this.messageRepository.findOne({ id: messageId });
            if (!message) {
                throw new Exceptions.EntityNotFoundException("message", messageId);
            }
            if (message.status === _2.MessageStatus.OPEN && status !== _2.MessageStatus.IN_PROGRESS) {
                throw new Exceptions.OperationNotPermited("Message status change is not mermitted");
            }
            if (message.status === _2.MessageStatus.IN_PROGRESS && status !== _2.MessageStatus.DONE) {
                throw new Exceptions.OperationNotPermited("Message status change is not mermitted");
            }
            if (message.status === _2.MessageStatus.DONE) {
                throw new Exceptions.OperationNotPermited("Message status change is not mermitted");
            }
            message.status = status;
            message.assignee = assignee.id;
            message.assigneeName = assignee.name + " " + assignee.lastName;
            let userInboxes = yield this.userInboxRepository.find({ "messages.id": messageId });
            for (let i = 0; i < userInboxes.length; i++) {
                let userMessage = userInboxes[i].messages.find((item) => { return item.id === messageId; });
                userMessage.status = message.status;
                userMessage.assignee = message.assignee;
                userMessage.assigneeName = message.assigneeName;
                this.userInboxRepository.update(userInboxes[i]);
            }
            message = yield this.messageRepository.update(message);
            EventAggregator_1.EventAggregator.getMediator().boradcastEvent(EventAggregator_1.EventAggregator.MESSAGE_STATUS_UPDATED, { message: message });
            return message;
        });
    }
};
MessageService = __decorate([
    inversify_1.injectable(),
    __metadata("design:paramtypes", [])
], MessageService);
exports.MessageService = MessageService;
//# sourceMappingURL=MessageService.js.map