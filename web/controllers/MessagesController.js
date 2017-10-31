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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
const Actions = require("../../actions");
const _1 = require("../../infrastructure/exceptions/");
const routing_controllers_1 = require("routing-controllers");
const actions_1 = require("../../actions");
const authMiddleware_1 = require("../middleware/authMiddleware");
const httpError_1 = require("../decorators/httpError");
let MessagesController = class MessagesController {
    createMessage(userSubmitedParams) {
        return __awaiter(this, void 0, void 0, function* () {
            let createMessageAction = new Actions.CreateMessage.Action();
            let actionContext = new actions_1.ActionContext();
            actionContext.params = userSubmitedParams;
            return yield createMessageAction.run(actionContext);
        });
    }
    getMessages(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            let getAllMessagesAction = new Actions.GetAllMessages.Action();
            let actionContext = new actions_1.ActionContext();
            actionContext.params = {
                userId: userId,
            };
            return yield getAllMessagesAction.run(actionContext);
        });
    }
};
__decorate([
    routing_controllers_1.Post("/messages"),
    routing_controllers_1.HttpCode(201),
    routing_controllers_1.UseBefore(authMiddleware_1.AuthMiddleware),
    httpError_1.HttpError(400, _1.ExceptionTypes.ValidationException),
    __param(0, routing_controllers_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MessagesController.prototype, "createMessage", null);
__decorate([
    routing_controllers_1.Get("/messages"),
    routing_controllers_1.HttpCode(201),
    routing_controllers_1.UseBefore(authMiddleware_1.AuthMiddleware),
    httpError_1.HttpError(400, _1.ExceptionTypes.ValidationException),
    __param(0, routing_controllers_1.Param("userId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MessagesController.prototype, "getMessages", null);
MessagesController = __decorate([
    routing_controllers_1.JsonController()
], MessagesController);
exports.MessagesController = MessagesController;
//# sourceMappingURL=MessagesController.js.map