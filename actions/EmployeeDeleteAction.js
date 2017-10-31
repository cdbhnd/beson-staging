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
const ActionBase_1 = require("./ActionBase");
class Action extends ActionBase_1.ActionBase {
    constructor() {
        super();
        this.contractService = _1.kernel.get(_1.Types.IContractService);
        this.employeeRepo = this.employeeRepo = _1.kernel.get(_1.Types.IEmployeeRepository);
        this.employeeService = _1.kernel.get(_1.Types.IEmployeeService);
        this.employeeHistoryService = _1.kernel.get(_1.Types.IEmployeeHistoryService);
    }
    ;
    execute(context) {
        return __awaiter(this, void 0, void 0, function* () {
            let employee = yield this.employeeRepo.findEmployee(context.params.employeeId);
            if (!employee) {
                throw new Exceptions.EntityNotFoundException("Employee", context.params.employeeId);
            }
            yield this.employeeRepo.deleteEmployee(employee.id);
            yield this.contractService.deleteAllContractsForEmployee(employee.id);
            yield this.employeeHistoryService.createRecord(employee, Services.EmployeeHistoryService.employeeDeleted, context.params);
            return " ";
        });
    }
    onActionExecuting(context) {
        return __awaiter(this, void 0, void 0, function* () {
            return context;
        });
    }
    getConstraints() {
        return {
            employeeId: "required",
        };
    }
    getSanitizationPattern() {
        return {};
    }
}
exports.Action = Action;
//# sourceMappingURL=EmployeeDeleteAction.js.map