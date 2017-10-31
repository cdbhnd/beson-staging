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
const jwt = require("jwt-simple");
const config = require("config");
const httpError_1 = require("../decorators/httpError");
let UserController = class UserController {
    login(userSubmitedParams) {
        return __awaiter(this, void 0, void 0, function* () {
            let userLoginAction = new Actions.LoginUser.Action();
            let actionContext = new actions_1.ActionContext();
            actionContext.params = userSubmitedParams;
            let userFromDb = yield userLoginAction.run(actionContext);
            let secret = String(config.get("secret"));
            userFromDb.token = jwt.encode({ authUserId: userFromDb.id }, secret);
            return userFromDb;
        });
    }
    getUserMessages(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let getUserMessagesActions = new Actions.GetUserMessages.Action();
            let actionContext = new actions_1.ActionContext();
            actionContext.params = {
                userId: id,
            };
            return yield getUserMessagesActions.run(actionContext);
        });
    }
    updateUserMessage(userId, messageId, userSubmitedParams) {
        return __awaiter(this, void 0, void 0, function* () {
            let getUserMessagesActions = new Actions.UpdateUserMessage.Action();
            let actionContext = new actions_1.ActionContext();
            actionContext.params = userSubmitedParams;
            actionContext.params.userId = userId;
            actionContext.params.messageId = messageId;
            return yield getUserMessagesActions.run(actionContext);
        });
    }
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            let getAllUsersAction = new Actions.GetAllUsers.Action();
            let actionContext = new actions_1.ActionContext();
            actionContext.params = {};
            return getAllUsersAction.run(actionContext);
        });
    }
};
__decorate([
    routing_controllers_1.Post("/user/login"),
    routing_controllers_1.HttpCode(200),
    httpError_1.HttpError(401, _1.ExceptionTypes.InvalidCredentialsException),
    __param(0, routing_controllers_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "login", null);
__decorate([
    routing_controllers_1.Get("/user/:id/messages"),
    routing_controllers_1.HttpCode(200),
    routing_controllers_1.UseBefore(authMiddleware_1.AuthMiddleware),
    httpError_1.HttpError(400, _1.ExceptionTypes.ValidationException),
    __param(0, routing_controllers_1.Param("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUserMessages", null);
__decorate([
    routing_controllers_1.Put("/user/:id/messages/:messageId"),
    routing_controllers_1.HttpCode(200),
    routing_controllers_1.UseBefore(authMiddleware_1.AuthMiddleware),
    httpError_1.HttpError(400, _1.ExceptionTypes.ValidationException),
    __param(0, routing_controllers_1.Param("id")), __param(1, routing_controllers_1.Param("messageId")), __param(2, routing_controllers_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUserMessage", null);
__decorate([
    routing_controllers_1.Get("/users"),
    routing_controllers_1.HttpCode(200),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getAllUsers", null);
UserController = __decorate([
    routing_controllers_1.JsonController()
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=UserController.js.map