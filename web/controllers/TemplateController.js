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
const config = require("config");
const httpError_1 = require("../decorators/httpError");
const multer = require("multer");
const path = require("path");
exports.TEMPLATE_FILE_UPLOAD_OPTIONS = {
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            // tslint:disable-next-line:no-string-literal
            cb(null, global["appRoot"] + "/" + config.get("folderPaths.assets") + "/" + config.get("folderPaths.documentTemplates"));
        },
        filename: (req, file, cb) => {
            console.log(file);
            // instead of saving file with its original name save file with name (param)
            let re = /(?:\.([^.]+))?$/;
            // extension of original file
            let ext = re.exec(file.originalname)[1];
            cb(null, req.params.name + "." + ext);
        },
    }),
};
let TemplateController = class TemplateController {
    getAllTemplates() {
        return __awaiter(this, void 0, void 0, function* () {
            // tslint:disable-next-line:no-string-literal
            let templates = ["kiwa", "vog", "payroll_taxes", "household_rules", "labor_contract"];
            let response = {};
            for (let i = 0; i < templates.length; i++) {
                response[templates[i]] = config.get("folderPaths.documentTemplates") + "/" + templates[i] + ".docx";
            }
            return response;
        });
    }
    uploadTemplateFile(file, name) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(file);
            // tslint:disable-next-line:no-string-literal
            return path.resolve(config.get("folderPaths.documentTemplates") + "/" + name + ".docx");
        });
    }
    generateDoc(templateName, fileName, documentData) {
        return __awaiter(this, void 0, void 0, function* () {
            let generateDocAction = new Actions.GenerateDocumentFile.Action();
            let actionContext = new actions_1.ActionContext();
            actionContext.params = {};
            // tslint:disable-next-line:no-string-literal
            actionContext.params["documentData"] = documentData;
            // tslint:disable-next-line:no-string-literal
            actionContext.params["templateName"] = templateName;
            // tslint:disable-next-line:no-string-literal
            actionContext.params["fileName"] = fileName;
            let pathToCreatedFile = yield generateDocAction.run(actionContext);
            return pathToCreatedFile;
        });
    }
};
__decorate([
    routing_controllers_1.Get("/templates"),
    routing_controllers_1.HttpCode(201),
    httpError_1.HttpError(400, _1.ExceptionTypes.ValidationException),
    httpError_1.HttpError(403, _1.ExceptionTypes.UserNotAuthorizedException),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TemplateController.prototype, "getAllTemplates", null);
__decorate([
    routing_controllers_1.Post("/templates/:name"),
    routing_controllers_1.UseBefore(authMiddleware_1.AuthMiddleware),
    routing_controllers_1.HttpCode(201),
    httpError_1.HttpError(400, _1.ExceptionTypes.ValidationException),
    httpError_1.HttpError(403, _1.ExceptionTypes.UserNotAuthorizedException),
    __param(0, routing_controllers_1.UploadedFile("fileName", { uploadOptions: exports.TEMPLATE_FILE_UPLOAD_OPTIONS })), __param(1, routing_controllers_1.Param("name")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], TemplateController.prototype, "uploadTemplateFile", null);
__decorate([
    routing_controllers_1.Post("/templates/:templateName/generate/:fileName"),
    routing_controllers_1.HttpCode(201)
    // @UseBefore(AuthMiddleware)
    ,
    httpError_1.HttpError(401, _1.ExceptionTypes.InvalidCredentialsException),
    httpError_1.HttpError(403, _1.ExceptionTypes.UserNotAuthorizedException),
    __param(0, routing_controllers_1.Param("templateName")), __param(1, routing_controllers_1.Param("fileName")), __param(2, routing_controllers_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], TemplateController.prototype, "generateDoc", null);
TemplateController = __decorate([
    routing_controllers_1.JsonController()
], TemplateController);
exports.TemplateController = TemplateController;
//# sourceMappingURL=TemplateController.js.map