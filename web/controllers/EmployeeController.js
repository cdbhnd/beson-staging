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
exports.IMAGE_FILE_UPLOAD_OPTIONS = {
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            // tslint:disable-next-line:no-string-literal
            cb(null, global["appRoot"] + "/" + config.get("folderPaths.assets"));
        },
        filename: (req, file, cb) => {
            console.log(file);
            cb(null, file.originalname);
        },
    }),
};
let EmployeeController = class EmployeeController {
    createEmployee(userId, employeeData) {
        return __awaiter(this, void 0, void 0, function* () {
            let createEmployeeAction = new Actions.CreateEmployeeAction.Action();
            let actionContext = new actions_1.ActionContext();
            actionContext.params = employeeData;
            actionContext.params.userId = userId;
            let createdEmoloyee = yield createEmployeeAction.run(actionContext);
            return createdEmoloyee;
        });
    }
    uploadImageToArticle(file, userId, employeeId) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(file);
            let uploadEmployeePhotoAction = new Actions.UploadEmployeePhoto.Action();
            let actionContext = new actions_1.ActionContext();
            actionContext.params = {
                userId: userId,
                employeeId: employeeId,
                // tslint:disable-next-line:no-string-literal
                localContentUrl: global["appRoot"] + "/" + config.get("folderPaths.assets") + "/" + file.originalname,
            };
            return yield uploadEmployeePhotoAction.run(actionContext);
        });
    }
    uploadEmployeeIdScan(file, userId, employeeId) {
        return __awaiter(this, void 0, void 0, function* () {
            let uploadIdScanAction = new Actions.UploadEmployeeDocumentScan.Action();
            let actionContext = new actions_1.ActionContext();
            actionContext.params = {
                employeeId: employeeId,
                userId: userId,
                // tslint:disable-next-line:no-string-literal
                localContentUrl: global["appRoot"] + "/" + config.get("folderPaths.assets") + "/" + file.originalname,
                docScan: "idScan",
            };
            return yield uploadIdScanAction.run(actionContext);
        });
    }
    uploadEmployeeDriversLicenseScan(file, userId, employeeId) {
        return __awaiter(this, void 0, void 0, function* () {
            let uploadIdScanAction = new Actions.UploadEmployeeDocumentScan.Action();
            let actionContext = new actions_1.ActionContext();
            actionContext.params = {
                employeeId: employeeId,
                userId: userId,
                // tslint:disable-next-line:no-string-literal
                localContentUrl: global["appRoot"] + "/" + config.get("folderPaths.assets") + "/" + file.originalname,
                docScan: "driversLicenseScan",
            };
            return yield uploadIdScanAction.run(actionContext);
        });
    }
    updateEmployee(userId, employeeId, employeeData) {
        return __awaiter(this, void 0, void 0, function* () {
            let updateEmployeeAction = new Actions.EmployeeUpdateAction.Action();
            let actionContext = new actions_1.ActionContext();
            actionContext.params = employeeData;
            actionContext.params.employeeId = employeeId;
            actionContext.params.userId = userId;
            let updatedEmployee = yield updateEmployeeAction.run(actionContext);
            return updatedEmployee;
        });
    }
    createContract(userId, employeeId, employeeData) {
        return __awaiter(this, void 0, void 0, function* () {
            let contractCreateAction = new Actions.ContractCreateAction.Action();
            let actionContext = new actions_1.ActionContext();
            actionContext.params = employeeData;
            actionContext.params.employeeId = employeeId;
            actionContext.params.userId = userId;
            let createdContract = yield contractCreateAction.run(actionContext);
            return createdContract;
        });
    }
    terminateEmployeeContract(userId, employeeId, contractId) {
        return __awaiter(this, void 0, void 0, function* () {
            let terminateEmployeeContractAction = new Actions.TerminateEmployeeContract.Action();
            let actionContext = new actions_1.ActionContext();
            actionContext.params = {};
            actionContext.params.employeeId = employeeId;
            actionContext.params.contractId = contractId;
            actionContext.params.userId = userId;
            let terminatedContractObj = yield terminateEmployeeContractAction.run(actionContext);
            return terminatedContractObj;
        });
    }
    getEmployeeContracts(employeeId) {
        return __awaiter(this, void 0, void 0, function* () {
            let getEmployeeContractsAction = new Actions.GetEmployeeContracts.Action();
            let actionContext = new actions_1.ActionContext();
            actionContext.params = {};
            actionContext.params.employeeId = employeeId;
            let allEmployeeContracts = yield getEmployeeContractsAction.run(actionContext);
            return allEmployeeContracts;
        });
    }
    deleteEmployeeContract(userId, employeeId, contractId) {
        return __awaiter(this, void 0, void 0, function* () {
            let deleteEmployeeContractAction = new Actions.DeleteEmployeeContract.Action();
            let actionContext = new actions_1.ActionContext();
            actionContext.params = {};
            actionContext.params.employeeId = employeeId;
            actionContext.params.contractId = contractId;
            actionContext.params.userId = userId;
            return yield deleteEmployeeContractAction.run(actionContext);
        });
    }
    getAllEmployees() {
        return __awaiter(this, void 0, void 0, function* () {
            let getAllEmployees = new Actions.EmployeeGetAllAction.Action();
            let actionContext = new actions_1.ActionContext();
            return yield getAllEmployees.run(actionContext);
        });
    }
    getEmployeeById(employeeId) {
        return __awaiter(this, void 0, void 0, function* () {
            let getEmployeeByIdAction = new Actions.EmployeeGetByIdAction.Action();
            let actionContext = new actions_1.ActionContext();
            actionContext.params = {};
            actionContext.params.employeeId = employeeId;
            return yield getEmployeeByIdAction.run(actionContext);
        });
    }
    deleteEmployee(employeeId) {
        return __awaiter(this, void 0, void 0, function* () {
            let deleteEmployeeAction = new Actions.EmployeeDeleteAction.Action();
            let actionContext = new actions_1.ActionContext();
            actionContext.params = {
                employeeId: employeeId,
            };
            return yield deleteEmployeeAction.run(actionContext);
        });
    }
    createEmployeeDoc(userId, employeeId, documentsData) {
        return __awaiter(this, void 0, void 0, function* () {
            let generateEmployeeDocument = new Actions.GenerateEmployeeDocuments.Action();
            let actionContext = new actions_1.ActionContext();
            actionContext.params = documentsData;
            actionContext.params.employeeId = employeeId;
            actionContext.params.userId = userId;
            return yield generateEmployeeDocument.run(actionContext);
        });
    }
    getAllEmployeeDocumetns(employeeId) {
        return __awaiter(this, void 0, void 0, function* () {
            let getAllEmployeeDocuments = new Actions.GetAllEmployeeDocuments.Action();
            let actionContext = new actions_1.ActionContext();
            actionContext.params = {};
            actionContext.params.employeeId = employeeId;
            return yield getAllEmployeeDocuments.run(actionContext);
        });
    }
    getEmployeeHistoryRecords(employeeId) {
        return __awaiter(this, void 0, void 0, function* () {
            let getEmployeeHistoryRecordsAction = new Actions.GetEmployeeActionHistory.Action();
            let actionContext = new actions_1.ActionContext();
            actionContext.params = {};
            actionContext.params.employeeId = employeeId;
            return yield getEmployeeHistoryRecordsAction.run(actionContext);
        });
    }
    getEmployeeAlarms(employeeId) {
        return __awaiter(this, void 0, void 0, function* () {
            let getEmployeeAlarms = new Actions.GetEmployeeAlarms.Action();
            let actionContext = new actions_1.ActionContext();
            actionContext.params = {};
            actionContext.params.employeeId = employeeId;
            return yield getEmployeeAlarms.run(actionContext);
        });
    }
    createEmployeeAlarms(userId, employeeId, alarmData) {
        return __awaiter(this, void 0, void 0, function* () {
            let createEmployeeAlarm = new Actions.CreateEmployeeAlarm.Action();
            let actionContext = new actions_1.ActionContext();
            actionContext.params = alarmData;
            actionContext.params.employeeId = employeeId;
            actionContext.params.userId = userId;
            return yield createEmployeeAlarm.run(actionContext);
        });
    }
    getPerformanceReportDoc(employeeId, year, month, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let getPerformanceReportDoc = new Actions.GetPerformanceReportDocument.Action();
            let actionContext = new actions_1.ActionContext();
            actionContext.params = {
                employeeId: employeeId,
                year: year,
                month: month,
            };
            let file = yield getPerformanceReportDoc.run(actionContext);
            return {
                path: "/document_templates/monthly-report-" + employeeId + ".xlsx",
            };
        });
    }
    getPerformnceReport(employeeId, year, month) {
        return __awaiter(this, void 0, void 0, function* () {
            let getPerformanceReportAction = new Actions.GetPerformanceReportAction.Action();
            let actionContext = new actions_1.ActionContext();
            actionContext.params = {
                employeeId: employeeId,
                year: year,
                month: month,
            };
            return yield getPerformanceReportAction.run(actionContext);
        });
    }
    updatePerformanceReport(userId, employeeId, year, month, performanceData) {
        return __awaiter(this, void 0, void 0, function* () {
            let updatePerformanceReportAction = new Actions.UpdatePerformanceReportAction.Action();
            let actionContext = new actions_1.ActionContext();
            actionContext.params = {
                employeeId: employeeId,
                year: year,
                month: month,
                performanceRecord: performanceData,
                userId: userId,
            };
            return yield updatePerformanceReportAction.run(actionContext);
        });
    }
    searchEmpoyeeDays(employeeId, userId, searchParams) {
        return __awaiter(this, void 0, void 0, function* () {
            let searchEmployeeDays = new Actions.SearchEmployeeDays.Action();
            let actionContext = new actions_1.ActionContext();
            actionContext.params = searchParams;
            actionContext.params.employeeId = employeeId;
            actionContext.params.userId = userId;
            return yield searchEmployeeDays.run(actionContext);
        });
    }
};
__decorate([
    routing_controllers_1.Post("/employee"),
    routing_controllers_1.UseBefore(authMiddleware_1.AuthMiddleware),
    routing_controllers_1.HttpCode(201),
    httpError_1.HttpError(401, _1.ExceptionTypes.InvalidCredentialsException),
    httpError_1.HttpError(400, _1.ExceptionTypes.ValidationException),
    __param(0, routing_controllers_1.Param("userId")), __param(1, routing_controllers_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], EmployeeController.prototype, "createEmployee", null);
__decorate([
    routing_controllers_1.Post("/employee/:employeeId/image"),
    routing_controllers_1.UseBefore(authMiddleware_1.AuthMiddleware),
    routing_controllers_1.HttpCode(200),
    httpError_1.HttpError(400, _1.ExceptionTypes.ValidationException),
    httpError_1.HttpError(403, _1.ExceptionTypes.UserNotAuthorizedException),
    __param(0, routing_controllers_1.UploadedFile("fileName", { uploadOptions: exports.IMAGE_FILE_UPLOAD_OPTIONS })), __param(1, routing_controllers_1.Param("userId")), __param(2, routing_controllers_1.Param("employeeId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], EmployeeController.prototype, "uploadImageToArticle", null);
__decorate([
    routing_controllers_1.Post("/employee/:employeeId/id-scan"),
    routing_controllers_1.UseBefore(authMiddleware_1.AuthMiddleware),
    routing_controllers_1.HttpCode(200),
    httpError_1.HttpError(403, _1.ExceptionTypes.UserNotAuthorizedException),
    httpError_1.HttpError(404, _1.ExceptionTypes.EntityNotFoundException),
    httpError_1.HttpError(400, _1.ExceptionTypes.ValidationException),
    __param(0, routing_controllers_1.UploadedFile("fileName", { uploadOptions: exports.IMAGE_FILE_UPLOAD_OPTIONS })), __param(1, routing_controllers_1.Param("userId")), __param(2, routing_controllers_1.Param("employeeId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], EmployeeController.prototype, "uploadEmployeeIdScan", null);
__decorate([
    routing_controllers_1.Post("/employee/:employeeId/drivers-license-scan"),
    routing_controllers_1.UseBefore(authMiddleware_1.AuthMiddleware),
    routing_controllers_1.HttpCode(200),
    httpError_1.HttpError(403, _1.ExceptionTypes.UserNotAuthorizedException),
    httpError_1.HttpError(404, _1.ExceptionTypes.EntityNotFoundException),
    httpError_1.HttpError(400, _1.ExceptionTypes.ValidationException),
    __param(0, routing_controllers_1.UploadedFile("fileName", { uploadOptions: exports.IMAGE_FILE_UPLOAD_OPTIONS })), __param(1, routing_controllers_1.Param("userId")), __param(2, routing_controllers_1.Param("employeeId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], EmployeeController.prototype, "uploadEmployeeDriversLicenseScan", null);
__decorate([
    routing_controllers_1.Put("/employee/:employeeId"),
    routing_controllers_1.UseBefore(authMiddleware_1.AuthMiddleware),
    routing_controllers_1.HttpCode(201),
    httpError_1.HttpError(401, _1.ExceptionTypes.InvalidCredentialsException),
    httpError_1.HttpError(400, _1.ExceptionTypes.ValidationException),
    __param(0, routing_controllers_1.Param("userId")), __param(1, routing_controllers_1.Param("employeeId")), __param(2, routing_controllers_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], EmployeeController.prototype, "updateEmployee", null);
__decorate([
    routing_controllers_1.Post("/employee/:employeeId/contract"),
    routing_controllers_1.UseBefore(authMiddleware_1.AuthMiddleware),
    routing_controllers_1.HttpCode(201),
    httpError_1.HttpError(401, _1.ExceptionTypes.InvalidCredentialsException),
    httpError_1.HttpError(400, _1.ExceptionTypes.ValidationException),
    httpError_1.HttpError(404, _1.ExceptionTypes.EntityNotFoundException),
    __param(0, routing_controllers_1.Param("userId")), __param(1, routing_controllers_1.Param("employeeId")), __param(2, routing_controllers_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], EmployeeController.prototype, "createContract", null);
__decorate([
    routing_controllers_1.Put("/employee/:employeeId/contract/:contractId"),
    routing_controllers_1.UseBefore(authMiddleware_1.AuthMiddleware),
    routing_controllers_1.HttpCode(201),
    httpError_1.HttpError(401, _1.ExceptionTypes.InvalidCredentialsException),
    httpError_1.HttpError(400, _1.ExceptionTypes.ValidationException),
    httpError_1.HttpError(404, _1.ExceptionTypes.EntityNotFoundException),
    __param(0, routing_controllers_1.Param("userId")), __param(1, routing_controllers_1.Param("employeeId")), __param(2, routing_controllers_1.Param("contractId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], EmployeeController.prototype, "terminateEmployeeContract", null);
__decorate([
    routing_controllers_1.Get("/employee/:employeeId/contract"),
    routing_controllers_1.UseBefore(authMiddleware_1.AuthMiddleware),
    routing_controllers_1.HttpCode(201),
    httpError_1.HttpError(401, _1.ExceptionTypes.InvalidCredentialsException),
    httpError_1.HttpError(400, _1.ExceptionTypes.ValidationException),
    httpError_1.HttpError(404, _1.ExceptionTypes.EntityNotFoundException),
    __param(0, routing_controllers_1.Param("employeeId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EmployeeController.prototype, "getEmployeeContracts", null);
__decorate([
    routing_controllers_1.Delete("/employee/:employeeId/contract/:contractId"),
    routing_controllers_1.UseBefore(authMiddleware_1.AuthMiddleware),
    routing_controllers_1.HttpCode(204),
    httpError_1.HttpError(401, _1.ExceptionTypes.InvalidCredentialsException),
    httpError_1.HttpError(400, _1.ExceptionTypes.ValidationException),
    httpError_1.HttpError(404, _1.ExceptionTypes.EntityNotFoundException),
    httpError_1.HttpError(404, _1.ExceptionTypes.ServiceLayerException),
    __param(0, routing_controllers_1.Param("userId")), __param(1, routing_controllers_1.Param("employeeId")), __param(2, routing_controllers_1.Param("contractId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], EmployeeController.prototype, "deleteEmployeeContract", null);
__decorate([
    routing_controllers_1.Get("/employee"),
    routing_controllers_1.UseBefore(authMiddleware_1.AuthMiddleware),
    routing_controllers_1.HttpCode(200),
    httpError_1.HttpError(401, _1.ExceptionTypes.InvalidCredentialsException),
    httpError_1.HttpError(403, _1.ExceptionTypes.UserNotAuthorizedException),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], EmployeeController.prototype, "getAllEmployees", null);
__decorate([
    routing_controllers_1.Get("/employee/:employeeId"),
    routing_controllers_1.UseBefore(authMiddleware_1.AuthMiddleware),
    routing_controllers_1.HttpCode(200),
    httpError_1.HttpError(401, _1.ExceptionTypes.InvalidCredentialsException),
    httpError_1.HttpError(403, _1.ExceptionTypes.UserNotAuthorizedException),
    httpError_1.HttpError(404, _1.ExceptionTypes.EntityNotFoundException),
    __param(0, routing_controllers_1.Param("employeeId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EmployeeController.prototype, "getEmployeeById", null);
__decorate([
    routing_controllers_1.Delete("/employee/:employeeId"),
    routing_controllers_1.HttpCode(204),
    routing_controllers_1.UseBefore(authMiddleware_1.AuthMiddleware),
    httpError_1.HttpError(401, _1.ExceptionTypes.InvalidCredentialsException),
    httpError_1.HttpError(403, _1.ExceptionTypes.UserNotAuthorizedException),
    __param(0, routing_controllers_1.Param("employeeId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EmployeeController.prototype, "deleteEmployee", null);
__decorate([
    routing_controllers_1.Post("/employee/:employeeId/documents"),
    routing_controllers_1.UseBefore(authMiddleware_1.AuthMiddleware),
    routing_controllers_1.HttpCode(201),
    httpError_1.HttpError(403, _1.ExceptionTypes.UserNotAuthorizedException),
    httpError_1.HttpError(404, _1.ExceptionTypes.EntityNotFoundException),
    httpError_1.HttpError(400, _1.ExceptionTypes.ValidationException),
    __param(0, routing_controllers_1.Param("userId")), __param(1, routing_controllers_1.Param("employeeId")), __param(2, routing_controllers_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], EmployeeController.prototype, "createEmployeeDoc", null);
__decorate([
    routing_controllers_1.Get("/employee/:employeeId/documents"),
    routing_controllers_1.HttpCode(200),
    httpError_1.HttpError(403, _1.ExceptionTypes.UserNotAuthorizedException),
    httpError_1.HttpError(404, _1.ExceptionTypes.EntityNotFoundException),
    httpError_1.HttpError(400, _1.ExceptionTypes.ValidationException),
    __param(0, routing_controllers_1.Param("employeeId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EmployeeController.prototype, "getAllEmployeeDocumetns", null);
__decorate([
    routing_controllers_1.Get("/employee/:employeeId/history"),
    routing_controllers_1.HttpCode(200),
    httpError_1.HttpError(403, _1.ExceptionTypes.UserNotAuthorizedException),
    httpError_1.HttpError(404, _1.ExceptionTypes.EntityNotFoundException),
    httpError_1.HttpError(400, _1.ExceptionTypes.ValidationException),
    __param(0, routing_controllers_1.Param("employeeId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EmployeeController.prototype, "getEmployeeHistoryRecords", null);
__decorate([
    routing_controllers_1.Get("/employee/:employeeId/alarms"),
    routing_controllers_1.HttpCode(200),
    httpError_1.HttpError(403, _1.ExceptionTypes.UserNotAuthorizedException),
    httpError_1.HttpError(404, _1.ExceptionTypes.EntityNotFoundException),
    httpError_1.HttpError(400, _1.ExceptionTypes.ValidationException),
    __param(0, routing_controllers_1.Param("employeeId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EmployeeController.prototype, "getEmployeeAlarms", null);
__decorate([
    routing_controllers_1.Post("/employee/:employeeId/alarms"),
    routing_controllers_1.UseBefore(authMiddleware_1.AuthMiddleware),
    routing_controllers_1.HttpCode(200),
    httpError_1.HttpError(403, _1.ExceptionTypes.UserNotAuthorizedException),
    httpError_1.HttpError(404, _1.ExceptionTypes.EntityNotFoundException),
    httpError_1.HttpError(400, _1.ExceptionTypes.ValidationException),
    __param(0, routing_controllers_1.Param("userId")), __param(1, routing_controllers_1.Param("employeeId")), __param(2, routing_controllers_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], EmployeeController.prototype, "createEmployeeAlarms", null);
__decorate([
    routing_controllers_1.Get("/employee/:employeeId/performance/:year/:month/report"),
    routing_controllers_1.HttpCode(200),
    httpError_1.HttpError(403, _1.ExceptionTypes.UserNotAuthorizedException),
    httpError_1.HttpError(404, _1.ExceptionTypes.EntityNotFoundException),
    httpError_1.HttpError(400, _1.ExceptionTypes.ValidationException),
    __param(0, routing_controllers_1.Param("employeeId")), __param(1, routing_controllers_1.Param("year")), __param(2, routing_controllers_1.Param("month")), __param(3, routing_controllers_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number, Object]),
    __metadata("design:returntype", Promise)
], EmployeeController.prototype, "getPerformanceReportDoc", null);
__decorate([
    routing_controllers_1.Get("/employee/:employeeId/performance/:year/:month"),
    routing_controllers_1.HttpCode(200),
    httpError_1.HttpError(403, _1.ExceptionTypes.UserNotAuthorizedException),
    httpError_1.HttpError(404, _1.ExceptionTypes.EntityNotFoundException),
    httpError_1.HttpError(400, _1.ExceptionTypes.ValidationException),
    __param(0, routing_controllers_1.Param("employeeId")), __param(1, routing_controllers_1.Param("year")), __param(2, routing_controllers_1.Param("month")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number]),
    __metadata("design:returntype", Promise)
], EmployeeController.prototype, "getPerformnceReport", null);
__decorate([
    routing_controllers_1.Put("/employee/:employeeId/performance/:year/:month"),
    routing_controllers_1.UseBefore(authMiddleware_1.AuthMiddleware),
    routing_controllers_1.HttpCode(200),
    httpError_1.HttpError(403, _1.ExceptionTypes.UserNotAuthorizedException),
    httpError_1.HttpError(404, _1.ExceptionTypes.EntityNotFoundException),
    httpError_1.HttpError(400, _1.ExceptionTypes.ValidationException),
    httpError_1.HttpError(400, _1.ExceptionTypes.OperationNotPermited),
    __param(0, routing_controllers_1.Param("userId")), __param(1, routing_controllers_1.Param("employeeId")), __param(2, routing_controllers_1.Param("year")), __param(3, routing_controllers_1.Param("month")), __param(4, routing_controllers_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Number, Number, Object]),
    __metadata("design:returntype", Promise)
], EmployeeController.prototype, "updatePerformanceReport", null);
__decorate([
    routing_controllers_1.Post("/employee/:employeeId/days"),
    routing_controllers_1.HttpCode(200),
    routing_controllers_1.UseBefore(authMiddleware_1.AuthMiddleware),
    __param(0, routing_controllers_1.Param("employeeId")), __param(1, routing_controllers_1.Param("userId")), __param(2, routing_controllers_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], EmployeeController.prototype, "searchEmpoyeeDays", null);
EmployeeController = __decorate([
    routing_controllers_1.JsonController()
], EmployeeController);
exports.EmployeeController = EmployeeController;
//# sourceMappingURL=EmployeeController.js.map