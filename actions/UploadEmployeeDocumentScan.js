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
const fs = require("fs");
const ActionBase_1 = require("./ActionBase");
class Action extends ActionBase_1.ActionBase {
    constructor() {
        super();
        this.employeeRepository = _1.kernel.get(_1.Types.IEmployeeRepository);
        this.userRepository = _1.kernel.get(_1.Types.IUserRepository);
        this.imageService = _1.kernel.get(_1.Types.IImageService);
    }
    ;
    execute(context) {
        return __awaiter(this, void 0, void 0, function* () {
            let imageUrl = yield this.imageService.uploadImage(context.params.localContentUrl);
            fs.unlink(context.params.localContentUrl);
            let employeeFromDb = context.params.employee;
            employeeFromDb.dossier[context.params.docScan] = imageUrl;
            let updatedEmployee = yield this.employeeRepository.updateEmployee(employeeFromDb);
            return updatedEmployee;
        });
    }
    onActionExecuting(context) {
        return __awaiter(this, void 0, void 0, function* () {
            let employee = yield this.employeeRepository.findByQuery({ id: context.params.employeeId });
            if (!employee) {
                throw new Exceptions.EntityNotFoundException(context.params.employeeId, "Employee does not exist.");
            }
            context.params.employee = employee;
            return context;
        });
    }
    getConstraints() {
        return {
            userId: "string|required",
            employeeId: "string|required",
            localContentUrl: "string|required",
            docScan: "string|required",
        };
    }
    getSanitizationPattern() {
        return {};
    }
}
exports.Action = Action;
//# sourceMappingURL=UploadEmployeeDocumentScan.js.map