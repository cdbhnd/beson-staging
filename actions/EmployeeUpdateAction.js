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
const Diff_1 = require("../utility/Diff");
class Action extends ActionBase_1.ActionBase {
    constructor() {
        super();
        this.employeeService = _1.kernel.get(_1.Types.IEmployeeService);
        this.employeeRepo = this.employeeRepo = _1.kernel.get(_1.Types.IEmployeeRepository);
        this.userRepo = _1.kernel.get(_1.Types.IUserRepository);
        this.employeeHistoryService = _1.kernel.get(_1.Types.IEmployeeHistoryService);
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
            let diff = Diff_1.Diff.compare(employeeFromDb, context.params, true, ["employeeId", "userId"]);
            let updatedEmployee = yield this.employeeService.updateEmployee(employeeFromDb, context.params);
            let action = diff.diff.dossier ? Services.EmployeeHistoryService.employeeDossierUpdated : Services.EmployeeHistoryService.employeeUpdated;
            yield this.employeeHistoryService.createRecord(employeeFromDb, action, diff.diff, user.name + " " + user.lastName);
            return updatedEmployee;
        });
    }
    getConstraints(params) {
        return {
            "userId": "string|required",
            "employeeId": "required",
            "idDocumentType": "idDocumentType",
            "marriageStatus": "marriageStatusType",
            "dossier.role": "roleType",
            "dossier.department": "departmentType",
        };
    }
    getSanitizationPattern() {
        return {};
    }
}
exports.Action = Action;
//# sourceMappingURL=EmployeeUpdateAction.js.map