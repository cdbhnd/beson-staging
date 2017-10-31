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
        this.userRepo = _1.kernel.get(_1.Types.IUserRepository);
        this.employeeRepo = _1.kernel.get(_1.Types.IEmployeeRepository);
        this.reportService = _1.kernel.get(_1.Types.IReportService);
    }
    ;
    execute(context) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = context.params.user;
            let employee = context.params.employee;
            let firstDay = new Date(context.params.dateFrom);
            let lastDay = new Date(context.params.dateTo);
            let reports = yield this.reportService.findReports(employee, firstDay, lastDay);
            let results = [];
            for (let i = 0; i < reports.length; i++) {
                for (let j = 0; j < reports[i].week.length; j++) {
                    for (let day in reports[i].week[j].days) {
                        if (!reports[i].week[j].days.hasOwnProperty(day)) {
                            continue;
                        }
                        if (!reports[i].week[j].days[day]) {
                            continue;
                        }
                        let addDayInResults = true;
                        if (context.params.absence) {
                            addDayInResults = reports[i].week[j].days[day].absence.length > 0;
                        }
                        if (addDayInResults) {
                            results.push(reports[i].week[j].days[day]);
                        }
                    }
                }
            }
            return results;
        });
    }
    onActionExecuting(context) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = yield this.userRepo.findUser(context.params.userId);
            if (!user) {
                throw new Exceptions.EntityNotFoundException("user", context.params.userId);
            }
            context.params.user = user;
            let employee = yield this.employeeRepo.findEmployee(context.params.employeeId);
            if (!employee) {
                throw new Exceptions.EntityNotFoundException("employee", context.params.employeeId);
            }
            context.params.employee = employee;
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
            employeeId: "string|required",
            dateFrom: "string|required",
            dateTo: "string|required",
            absence: "boolean",
        };
    }
    getSanitizationPattern() {
        return {};
    }
}
exports.Action = Action;
//# sourceMappingURL=SearchEmployeeDays.js.map