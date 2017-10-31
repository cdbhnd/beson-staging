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
const moment = require("moment");
const inversify_1 = require("inversify");
let EmployeeHistoryService = class EmployeeHistoryService {
    constructor() {
        this.employeeHistoryRecordRepo = _1.kernel.get(_1.Types.IEmployeeHistoryRecordRepository);
    }
    createRecord(employee, actionName, data, user) {
        return __awaiter(this, void 0, void 0, function* () {
            let now = moment();
            let historyRecord = {
                employeeFirstName: employee.firstName,
                employeeLastName: employee.lastName,
                employeeId: employee.id,
                action: actionName,
                data: data,
                createdAt: now.toISOString(),
                user: user,
            };
            return yield this.employeeHistoryRecordRepo.createEmployeeHistoryRecord(historyRecord);
        });
    }
};
EmployeeHistoryService.employeeCreated = "Employee created";
EmployeeHistoryService.employeeUpdated = "Employee updated";
EmployeeHistoryService.employeeDossierUpdated = "Employee dossier updated";
EmployeeHistoryService.employeeDeleted = "Employee deleted";
EmployeeHistoryService.employeeContractCreated = "Employee contract created";
EmployeeHistoryService.employeeContractTerminated = "Employee contract terminated";
EmployeeHistoryService.employeeContractDeleted = "Employee contract deleted";
EmployeeHistoryService.employeeDocumentCreated = "Employee document created";
EmployeeHistoryService.employeeContractAutoExpire = "employeeContractAutoExpire";
EmployeeHistoryService = __decorate([
    inversify_1.injectable(),
    __metadata("design:paramtypes", [])
], EmployeeHistoryService);
exports.EmployeeHistoryService = EmployeeHistoryService;
//# sourceMappingURL=EmployeeHistoryService.js.map