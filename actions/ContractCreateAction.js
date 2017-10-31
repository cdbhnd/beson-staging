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
const Exceptions = require("../infrastructure/exceptions/");
const Services = require("../services/");
const Entities = require("../entities/");
const ActionBase_1 = require("./ActionBase");
const moment = require("moment");
const _2 = require("../scheduler/");
class Action extends ActionBase_1.ActionBase {
    constructor() {
        super();
        this.contractService = _1.kernel.get(_1.Types.IContractService);
        this.employeeRepo = this.employeeRepo = _1.kernel.get(_1.Types.IEmployeeRepository);
        this.employeeService = _1.kernel.get(_1.Types.IEmployeeService);
        this.userRepo = _1.kernel.get(_1.Types.IUserRepository);
        this.employeeHistoryService = _1.kernel.get(_1.Types.IEmployeeHistoryService);
        this.messageService = _1.kernel.get(_1.Types.IMessageService);
        this.reportService = _1.kernel.get(_1.Types.IReportService);
    }
    ;
    execute(context) {
        return __awaiter(this, void 0, void 0, function* () {
            let employeeFromDb = yield this.employeeRepo.findEmployee(context.params.employeeId);
            let user = yield this.userRepo.findUser(context.params.userId);
            if (!user) {
                throw new Exceptions.EntityNotFoundException("User", context.params.userId);
            }
            let createdContract = yield this.contractService.createEmployeeContract(context.params);
            if (createdContract.type == Entities.ConctractTypes.LIMITED || createdContract.type == Entities.ConctractTypes.DEFERRED) {
                // schedule action to terminate contract when contract expire
                let contractEndDate = moment(createdContract.endDate);
                contractEndDate.add(1, "day");
                contractEndDate.hours(5);
                _2.Scheduler.create("Expire contract", "ContractExpirationAction", new Date(contractEndDate.toISOString()), { contractId: createdContract.id });
                // set alarm message on employee
                contractEndDate = moment(createdContract.endDate);
                contractEndDate.subtract(2, "months");
                let message = {
                    id: null,
                    content: "In 2 months employee contract will expire.",
                    createdAt: (new Date()).toISOString(),
                    deleted: false,
                    executionType: Entities.MessageExecutionType.SCHEDULED,
                    origin: "SYSTEM",
                    originName: "SYSTEM",
                    scheduledAt: contractEndDate.toISOString(),
                    seen: false,
                    sent: false,
                    sentAt: null,
                    target: Entities.MessageType.ALL,
                    targetName: Entities.MessageType.ALL,
                    type: Entities.MessageType.ALL,
                    status: Entities.MessageStatus.OPEN,
                    assignee: null,
                    assigneeName: null,
                    notificationType: Entities.NotificationType.INFO,
                };
                yield this.messageService.create(message);
                if (!employeeFromDb.dossier.alarms) {
                    employeeFromDb.dossier.alarms = [];
                }
                employeeFromDb.dossier.alarms.push({
                    message: message.content,
                    scheduledAt: message.scheduledAt,
                });
                employeeFromDb = yield this.employeeRepo.updateEmployee(employeeFromDb);
            }
            yield this.employeeService.setContractOnEmployee(createdContract, employeeFromDb);
            // create performance records
            let createPerformanceRecordsTo = null;
            if (createdContract.type == Entities.ConctractTypes.UNLIMITED) {
                createPerformanceRecordsTo = moment(createdContract.startDate).add(12, "month");
            }
            else {
                createPerformanceRecordsTo = createdContract.endDate;
            }
            yield this.reportService.createPerformanceReports(employeeFromDb, createdContract.startDate, createPerformanceRecordsTo);
            yield this.employeeHistoryService.createRecord(employeeFromDb, Services.EmployeeHistoryService.employeeContractCreated, context.params, user.name + " " + user.lastName);
            return createdContract;
        });
    }
    onActionExecuting(context) {
        return __awaiter(this, void 0, void 0, function* () {
            let employeeFromDb = yield this.employeeRepo.findEmployee(context.params.employeeId);
            if (!employeeFromDb) {
                throw new Exceptions.EntityNotFoundException("Employee", context.params.employeeId);
            }
            return context;
        });
    }
    getConstraints() {
        return {
            type: "required|contractType",
            startDate: "required",
            endDate: "required",
            employeeId: "required",
            userId: "string|required",
        };
    }
    getSanitizationPattern() {
        return {};
    }
}
exports.Action = Action;
//# sourceMappingURL=ContractCreateAction.js.map