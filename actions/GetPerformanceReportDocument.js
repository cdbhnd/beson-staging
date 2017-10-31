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
const config = require("config");
class Action extends ActionBase_1.ActionBase {
    constructor() {
        super();
        this.documentService = _1.kernel.get(_1.Types.IDocumentService);
        this.employeeRepo = _1.kernel.get(_1.Types.IEmployeeRepository);
        this.performanceReportRepo = _1.kernel.get(_1.Types.IPerformanceReportRepository);
        this.performanceService = _1.kernel.get(_1.Types.IReportService);
    }
    ;
    execute(context) {
        return __awaiter(this, void 0, void 0, function* () {
            let storedPerformanceReport = yield this.performanceService.findReport(context.params.employee, context.params.month, context.params.year);
            // tslint:disable-next-line:no-string-literal
            let pathToTemplate = global["appRoot"] + "/" + config.get("folderPaths.assets") + config.get("folderPaths.documentTemplates") + "/employee-monthly-report.xlsx";
            // tslint:disable-next-line:no-string-literal
            let pathToFile = global["appRoot"] + "/" + config.get("folderPaths.assets") + config.get("folderPaths.documentTemplates") + "/monthly-report-" + context.params.employeeId + ".xlsx";
            return yield this.documentService.generateReport(pathToTemplate, this.performanceService.prepareReportForExport(storedPerformanceReport, context.params.employee), pathToFile);
        });
    }
    onActionExecuting(context) {
        return __awaiter(this, void 0, void 0, function* () {
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
            employeeId: "required",
            month: "required",
            year: "required",
        };
    }
    getSanitizationPattern() {
        return {};
    }
}
exports.Action = Action;
//# sourceMappingURL=GetPerformanceReportDocument.js.map