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
const ActionBase_1 = require("./ActionBase");
class Action extends ActionBase_1.ActionBase {
    constructor() {
        super();
        this.contractService = _1.kernel.get(_1.Types.IContractService);
        this.employeeRepo = this.employeeRepo = _1.kernel.get(_1.Types.IEmployeeRepository);
        this.userRepo = _1.kernel.get(_1.Types.IUserRepository);
        this.employeeHistoryService = _1.kernel.get(_1.Types.IEmployeeHistoryService);
        this.contractRepo = _1.kernel.get(_1.Types.IContractRepository);
    }
    ;
    execute(context) {
        return __awaiter(this, void 0, void 0, function* () {
            let contractFromDb = yield this.contractRepo.findContract(context.params.contractId);
            let employeeFromDb = yield this.employeeRepo.findEmployee(contractFromDb.employeeId);
            yield this.contractService.terminateContract(contractFromDb);
            employeeFromDb.active = false;
            yield this.employeeRepo.updateEmployee(employeeFromDb);
            yield this.employeeHistoryService.createRecord(employeeFromDb, Services.EmployeeHistoryService.employeeContractAutoExpire, null, "SYSTEM");
        });
    }
    onActionExecuting(context) {
        return __awaiter(this, void 0, void 0, function* () {
            return context;
        });
    }
    getConstraints() {
        return {
            contractId: "required",
        };
    }
    getSanitizationPattern() {
        return {};
    }
}
exports.Action = Action;
//# sourceMappingURL=ContractExpirationAction.js.map