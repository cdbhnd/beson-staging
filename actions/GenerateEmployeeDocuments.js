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
const Exceptions = require("../infrastructure/exceptions/");
class Action extends ActionBase_1.ActionBase {
    constructor() {
        super();
        this.documentService = _1.kernel.get(_1.Types.IEmployeeDocumentService);
        this.employeeRepo = _1.kernel.get(_1.Types.IEmployeeRepository);
        this.employeeDocumentsRepo = _1.kernel.get(_1.Types.IEmployeeDocumentReposiotry);
        this.employeeHistoryService = _1.kernel.get(_1.Types.IEmployeeHistoryService);
        this.userRepo = _1.kernel.get(_1.Types.IUserRepository);
    }
    ;
    execute(context) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = yield this.userRepo.findUser(context.params.userId);
            if (!user) {
                throw new Exceptions.EntityNotFoundException("User", context.params.userId);
            }
            let result = [];
            for (let i = 0; i < context.params.documents.length; i++) {
                let path;
                switch (context.params.documents[i].toLowerCase()) {
                    case "kiwa":
                        path = yield this.documentService.createKiwa(context.params.employeeFromDb);
                        break;
                    case "household_rules":
                        path = yield this.documentService.createHouseholdRules(context.params.employeeFromDb);
                        break;
                    case "labor_contract":
                        path = yield this.documentService.createLaborContract(context.params.employeeFromDb);
                        break;
                    case "payroll_taxes":
                        path = yield this.documentService.createPayrollTaxes(context.params.employeeFromDb);
                        break;
                    case "vog":
                        path = yield this.documentService.createVog(context.params.employeeFromDb);
                        break;
                    default:
                        break;
                }
                if (path) {
                    let empDoc = {
                        employeeId: context.params.employeeFromDb.id,
                        createdAt: new Date().toISOString(),
                        name: context.params.documents[i].toLowerCase(),
                        path: path,
                    };
                    yield this.employeeDocumentsRepo.create(empDoc);
                    result.push(empDoc);
                }
            }
            yield this.employeeHistoryService.createRecord(context.params.employeeFromDb, Services.EmployeeHistoryService.employeeDocumentCreated, context.params, user.name + " " + user.lastName);
            return result;
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
            documents: "required|array",
            employeeId: "required",
            userId: "string|required",
        };
    }
    getSanitizationPattern() {
        return {};
    }
}
exports.Action = Action;
//# sourceMappingURL=GenerateEmployeeDocuments.js.map