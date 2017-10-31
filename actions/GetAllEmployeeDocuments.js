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
        this.employeeRepo = _1.kernel.get(_1.Types.IEmployeeRepository);
        this.employeeDocumentsRepo = _1.kernel.get(_1.Types.IEmployeeDocumentReposiotry);
    }
    ;
    execute(context) {
        return __awaiter(this, void 0, void 0, function* () {
            let allEmployeeDocuments = yield this.employeeDocumentsRepo.find({ employeeId: context.params.employeeId });
            return allEmployeeDocuments;
        });
    }
    onActionExecuting(context) {
        return __awaiter(this, void 0, void 0, function* () {
            context.params.employeeFromDb = yield this.employeeRepo.findEmployee(context.params.employeeId);
            if (!context.params.employeeFromDb) {
                throw new Exceptions.EntityNotFoundException("Employee", context.params.employeeId);
            }
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
//# sourceMappingURL=GetAllEmployeeDocuments.js.map