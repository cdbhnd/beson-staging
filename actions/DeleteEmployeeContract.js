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
        this.employeeService = _1.kernel.get(_1.Types.IEmployeeService);
        this.contractService = _1.kernel.get(_1.Types.IContractService);
        this.employeeRepo = this.employeeRepo = _1.kernel.get(_1.Types.IEmployeeRepository);
        this.contractRepo = _1.kernel.get(_1.Types.IContractRepository);
        this.employeeHistoryService = _1.kernel.get(_1.Types.IEmployeeHistoryService);
        this.userRepo = _1.kernel.get(_1.Types.IUserRepository);
    }
    ;
    execute(context) {
        return __awaiter(this, void 0, void 0, function* () {
            let employeeFromDb = yield this.employeeRepo.findEmployee(context.params.employeeId);
            if (!employeeFromDb) {
                throw new Exceptions.EntityNotFoundException("Employee", context.params.employeeId);
            }
            let user = yield this.userRepo.findUser(context.params.userId);
            if (!user) {
                throw new Exceptions.EntityNotFoundException("User", context.params.userId);
            }
            let contractFromDb = yield this.contractRepo.findContract(context.params.contractId);
            if (!contractFromDb) {
                throw new Exceptions.EntityNotFoundException("Contract", context.params.contractId);
            }
            let deletedContract = yield this.contractService.deleteContract(contractFromDb);
            yield this.employeeService.removeContractFromEmployee(deletedContract, employeeFromDb);
            yield this.employeeHistoryService.createRecord(employeeFromDb, Services.EmployeeHistoryService.employeeContractDeleted, context.params, user.name + " " + user.lastName);
            return " ";
        });
    }
    getConstraints(params) {
        return {
            employeeId: "required",
            contractId: "required",
            userId: "required",
        };
    }
    getSanitizationPattern() {
        return {};
    }
}
exports.Action = Action;
//# sourceMappingURL=DeleteEmployeeContract.js.map