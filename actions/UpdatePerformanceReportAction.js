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
const Diff_1 = require("../utility/Diff");
class Action extends ActionBase_1.ActionBase {
    constructor() {
        super();
        this.employeeRepo = _1.kernel.get(_1.Types.IEmployeeRepository);
        this.performanceReportRepo = _1.kernel.get(_1.Types.IPerformanceReportRepository);
        this.employeeHistoryService = _1.kernel.get(_1.Types.IEmployeeHistoryService);
        this.userRepo = _1.kernel.get(_1.Types.IUserRepository);
    }
    ;
    execute(context) {
        return __awaiter(this, void 0, void 0, function* () {
            let storedPerformanceReport = yield this.performanceReportRepo.findOne({
                employeeId: context.params.employee.id,
                currentYear: context.params.year,
                currentMonth: context.params.month,
            });
            if (!storedPerformanceReport) {
                throw new Exceptions.EntityNotFoundException("PerformanceReport", {
                    employeeId: context.params.employee.id,
                    currentYear: context.params.year,
                    currentMonth: context.params.month,
                });
            }
            let diff = Diff_1.Diff.compare(storedPerformanceReport, context.params.performanceRecord, true, ["notEditablePassword", "notEditable"]);
            yield this.employeeHistoryService.createRecord(context.params.employee, "Update performance", diff.diff, context.params.user.name + " " + context.params.user.lastName);
            if (storedPerformanceReport.notEditable && context.params.performanceRecord.notEditable) {
                throw new Exceptions.OperationNotPermited("Update entity", "Performance report for" + (context.params.performanceRecord.currentMonth + 1) + "/" + context.params.performanceRecord.currentYear + " is not editable");
            }
            storedPerformanceReport.week = context.params.performanceRecord.week;
            storedPerformanceReport.notEditable = context.params.performanceRecord.notEditable;
            storedPerformanceReport.notEditablePassword = context.params.performanceRecord.notEditablePassword;
            storedPerformanceReport.salaryReductions = context.params.performanceRecord.salaryReductions ? context.params.performanceRecord.salaryReductions : [];
            if (context.params.performanceRecord.weekendHoursMultiplier) {
                storedPerformanceReport.weekendHoursMultiplier = context.params.performanceRecord.weekendHoursMultiplier;
            }
            if (context.params.performanceRecord.overTimeHoursMultiplier) {
                storedPerformanceReport.overTimeHoursMultiplier = context.params.performanceRecord.overTimeHoursMultiplier;
            }
            return this.performanceReportRepo.update(storedPerformanceReport);
        });
    }
    onActionExecuting(context) {
        return __awaiter(this, void 0, void 0, function* () {
            let employee = yield this.employeeRepo.findEmployee(context.params.employeeId);
            if (!employee) {
                throw new Exceptions.EntityNotFoundException("Employee", context.params.employeeId);
            }
            let user = yield this.userRepo.findUser(context.params.userId);
            if (!user) {
                throw new Exceptions.EntityNotFoundException("User", context.params.userId);
            }
            context.params.user = user;
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
            employeeId: "required",
            month: "required",
            year: "required",
            performanceRecord: "required",
        };
    }
    getSanitizationPattern() {
        return {};
    }
}
exports.Action = Action;
//# sourceMappingURL=UpdatePerformanceReportAction.js.map