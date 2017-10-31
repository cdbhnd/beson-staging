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
const Services = require("../services/");
const Entities = require("../entities/");
const ActionBase_1 = require("./ActionBase");
const Exceptions = require("../infrastructure/exceptions/");
const moment = require("moment");
class Action extends ActionBase_1.ActionBase {
    constructor() {
        super();
        this.employeeService = _1.kernel.get(_1.Types.IEmployeeService);
        this.employeeRepo = _1.kernel.get(_1.Types.IEmployeeRepository);
        this.employeeHistoryService = _1.kernel.get(_1.Types.IEmployeeHistoryService);
        this.userRepo = _1.kernel.get(_1.Types.IUserRepository);
        this.messageService = _1.kernel.get(_1.Types.IMessageService);
    }
    ;
    execute(context) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = yield this.userRepo.findUser(context.params.userId);
            if (!user) {
                throw new Exceptions.EntityNotFoundException("User", context.params.userId);
            }
            let createdEmployee = yield this.employeeService.createEmployee(context.params);
            //  set alarm message for employee
            if (context.params.dossier.startWorkingDate) {
                let startWorkingDateObj = moment(context.params.dossier.startWorkingDate);
                startWorkingDateObj.add(22, "months");
                let message = {
                    id: null,
                    content: "In 2 months employee will get right for unlimited contract.",
                    createdAt: (new Date()).toISOString(),
                    deleted: false,
                    executionType: Entities.MessageExecutionType.SCHEDULED,
                    origin: "SYSTEM",
                    originName: "SYSTEM",
                    scheduledAt: startWorkingDateObj.toISOString(),
                    seen: false,
                    sent: false,
                    sentAt: null,
                    target: Entities.MessageType.ALL,
                    targetName: Entities.MessageType.ALL,
                    type: Entities.MessageType.ALL,
                    status: Entities.MessageStatus.OPEN,
                    assignee: null,
                    assigneeName: null,
                    notificationType: Entities.NotificationType.ACTION,
                };
                yield this.messageService.create(message);
                if (!createdEmployee.dossier.alarms) {
                    createdEmployee.dossier.alarms = [];
                }
                createdEmployee.dossier.alarms.push({
                    message: message.content,
                    scheduledAt: message.scheduledAt,
                });
                createdEmployee = yield this.employeeRepo.updateEmployee(createdEmployee);
            }
            yield this.employeeHistoryService.createRecord(createdEmployee, Services.EmployeeHistoryService.employeeCreated, context.params, user.name + " " + user.lastName);
            if (user.userType === Entities.UserType.operator) {
                // send message to all administrators
                this.messageService.create({
                    id: null,
                    content: "New employee " + createdEmployee.firstName + " " + createdEmployee.lastName + " has been created, please check it out.",
                    createdAt: (new Date()).toISOString(),
                    deleted: false,
                    executionType: Entities.MessageExecutionType.INSTANT,
                    origin: user.id,
                    originName: user.name + " " + user.lastName,
                    scheduledAt: null,
                    seen: false,
                    sent: false,
                    sentAt: null,
                    target: Entities.MessageType.ALL,
                    targetName: Entities.MessageType.ALL,
                    type: Entities.MessageType.ALL,
                    status: Entities.MessageStatus.OPEN,
                    assignee: null,
                    assigneeName: null,
                    notificationType: Entities.NotificationType.ACTION,
                });
            }
            return createdEmployee;
        });
    }
    getConstraints() {
        return {
            "userId": "string|required",
            "firstName": "required",
            "lastName": "required",
            "address": "required",
            "gender": "required|genderType",
            "nationality": "required",
            "idDocumentType": "required|idDocumentType",
            "idDocumentExpiration": "required",
            "language": "required|languageType",
            "birthInfo": "required",
            "phone": "required",
            "email": "required",
            "marriageStatus": "required|marriageStatusType",
            "bsn": "string",
            "bankAccountNumber": "string",
            "dossier.role": "required|roleType",
            "dossier.department": "required|departmentType",
            "dossier.startWorkingDate": "required",
        };
    }
    getSanitizationPattern() {
        return {};
    }
}
exports.Action = Action;
//# sourceMappingURL=CreateEmployeeAction.js.map