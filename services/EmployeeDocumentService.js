"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
const Services = require("./");
const inversify_1 = require("inversify");
const Check_1 = require("../utility/Check");
const moment = require("moment");
const config = require("config");
// tslint:disable-next-line:no-var-requires
let JSZip = require("jszip");
// import * as JSZip from "JSZip";
let EmployeeDocumentService = class EmployeeDocumentService extends Services.DocumentService {
    // import * as JSZip from "JSZip";
    constructor() {
        super(...arguments);
        this.documentDateFormat = "DD-MM-YYYY";
        this.documetTemplatePath = "folderPaths.documentTemplates";
        this.assetsPath = "folderPaths.assets";
        this.employeeDocumentsPath = "folderPaths.generateDocuments";
    }
    createKiwa(employee) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.createEmployeeDoc(employee, "kiwa");
        });
    }
    createHouseholdRules(employee) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.createEmployeeDoc(employee, "household_rules");
        });
    }
    createLaborContract(employee) {
        return __awaiter(this, void 0, void 0, function* () {
            let contractRepo = _1.kernel.get(_1.Types.IContractRepository);
            let currentContract = employee.dossier.currentContractId ? yield contractRepo.findContract(employee.dossier.currentContractId) : null;
            return yield this.createEmployeeDoc(employee, "labor_contract", currentContract);
        });
    }
    createPayrollTaxes(employee) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.createEmployeeDoc(employee, "payroll_taxes");
        });
    }
    createVog(employee) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.createEmployeeDoc(employee, "vog");
        });
    }
    createEmployeeDoc(employee, docName, contract) {
        return __awaiter(this, void 0, void 0, function* () {
            Check_1.Check.notNull(employee, "employee");
            // tslint:disable-next-line:no-string-literal
            let pathToTemplate = global["appRoot"] + "/" + config.get(this.assetsPath) + config.get(this.documetTemplatePath) + "/" + docName + ".docx";
            // tslint:disable-next-line:no-string-literal
            let pathWhereDocIsGenerated = global["appRoot"] + "/" + config.get(this.assetsPath) + config.get(this.employeeDocumentsPath) + "/" + employee.firstName + "_" + employee.lastName + "_" + docName + ".docx";
            let hhRulesPayload = {
                companyName: "Beson Distributie B.V.",
                companyAddress: "Ronde Tocht 7",
                companyZipCode: "1507CC",
                companyCity: "ZAANDAM",
                employeeLastName: employee.lastName,
                employeeNameInitial: employee.firstName[0],
                employeeBirthDate: moment(employee.birthInfo.date).format(this.documentDateFormat),
                employeeBirthCity: employee.birthInfo.city,
                employeePostalCode: employee.address.postalCode,
                employeeCity: employee.address.city,
                employeeAddress: employee.address.street + " " + employee.address.streetNumber,
                employeeTitle: "heer",
                signingCity: "ZAANDAM",
                signingDate: moment().format(this.documentDateFormat),
                employeeStartWorkingDate: employee.dossier.startWorkingDate,
                employeeEndWorkingDate: null,
                roleName: employee.dossier.role,
                contractDuration: contract ? contract.duration : null,
                contractStartDate: contract ? contract.startDate : null,
                contractWeeklyHours: contract.maxWorkingHoursPerWeek,
                employeeHourlyWage: employee.dossier.hourlyWage,
            };
            this.generateDocument(pathToTemplate, hhRulesPayload, pathWhereDocIsGenerated);
            // let docStorageProvider: Providers.IDocumentStorageProvider = this.getDcoumentStorageProvider();
            return config.get("host").toString() + config.get(this.employeeDocumentsPath) + "/" + employee.firstName + "_" + employee.lastName + "_" + docName + ".docx";
        });
    }
    getDcoumentStorageProvider() {
        let docStorageProvider = config.get("documentStorageProvider").toString();
        return _1.kernel.getNamed(_1.Types.IDocumentStorageProvider, docStorageProvider);
    }
};
EmployeeDocumentService = __decorate([
    inversify_1.injectable()
], EmployeeDocumentService);
exports.EmployeeDocumentService = EmployeeDocumentService;
//# sourceMappingURL=EmployeeDocumentService.js.map