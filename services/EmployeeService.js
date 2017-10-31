"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
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
const moment = require("moment");
const _1 = require("../infrastructure/dependency-injection/");
const config = require("config");
const inversify_1 = require("inversify");
let EmployeeServce = class EmployeeServce {
    constructor() {
        this.employeeRepo = _1.kernel.get(_1.Types.IEmployeeRepository);
    }
    createEmployee(employee) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!employee.nickname) {
                employee.nickname = null;
            }
            if (!employee.debtInfo) {
                employee.debtInfo = null;
            }
            if (!employee.wageTaxRebate) {
                employee.wageTaxRebate = null;
            }
            if (!employee.driversLicense) {
                employee.driversLicense = null;
            }
            if (!employee.dossier.companyCar) {
                employee.dossier.companyCar = null;
            }
            if (!employee.dossier.hourlyWage) {
                employee.dossier.hourlyWage = null;
            }
            if (!employee.dossier.commuteCosts) {
                employee.dossier.commuteCosts = null;
            }
            employee.dossier.contractsIds = [];
            employee.dossier.currentContractId = null;
            employee.terminationReason = null;
            employee.active = false;
            this.setEmployeeAge(employee);
            this.setEmployeeWorkingPeriod(employee);
            this.setDepartmentAddress(employee);
            let createdEmployee = yield this.employeeRepo.createEmployee(employee);
            return createdEmployee;
        });
    }
    updateEmployee(employee, data) {
        return __awaiter(this, void 0, void 0, function* () {
            let dataToUpdate = {
                id: employee.id,
                firstName: employee.firstName,
                lastName: employee.lastName,
                gender: employee.gender,
                birthInfo: data.birthInfo ? data.birthInfo : employee.birthInfo,
                wageTaxRebate: data.wageTaxRebate ? data.wageTaxRebate : employee.wageTaxRebate,
                nickname: data.nickname ? data.nickname : employee.nickname,
                nationality: data.nationality ? data.nationality : employee.nationality,
                idDocumentType: data.idDocumentType ? data.idDocumentType : employee.idDocumentType,
                idDocumentExpiration: data.idDocumentExpiration ? data.idDocumentExpiration : employee.idDocumentExpiration,
                language: data.language ? data.language : employee.language,
                address: data.address ? data.address : employee.address,
                phone: data.phone ? data.phone : employee.phone,
                email: data.email ? data.email : employee.email,
                marriageStatus: data.marriageStatus ? data.marriageStatus : employee.marriageStatus,
                bsn: data.bsn ? data.bsn : employee.bsn,
                debtInfo: data.debtInfo ? data.debtInfo : employee.debtInfo,
                bankAccountNumber: data.bankAccountNumber ? data.bankAccountNumber : employee.bankAccountNumber,
                dossier: employee.dossier,
                driversLicense: data.driversLicense ? data.driversLicense : employee.driversLicense,
                terminationReason: data.terminationReason ? data.terminationReason : employee.terminationReason,
            };
            dataToUpdate.dossier.startWorkingDate = data.dossier.startWorkingDate ? data.dossier.startWorkingDate : employee.dossier.startWorkingDate;
            dataToUpdate.dossier.role = data.dossier.role ? data.dossier.role : employee.dossier.role;
            dataToUpdate.dossier.department = data.dossier.department ? data.dossier.department : employee.dossier.department;
            dataToUpdate.dossier.companyCar = data.dossier.companyCar ? data.dossier.companyCar : employee.dossier.companyCar;
            dataToUpdate.dossier.commuteCosts = data.dossier.commuteCosts ? data.dossier.commuteCosts : employee.dossier.commuteCosts;
            dataToUpdate.dossier.hourlyWage = data.dossier.hourlyWage ? data.dossier.hourlyWage : employee.dossier.hourlyWage;
            this.setDepartmentAddress(dataToUpdate);
            this.setCommuteCosts(dataToUpdate);
            let updatedEmployee = yield this.employeeRepo.updateEmployee(dataToUpdate);
            return updatedEmployee;
        });
    }
    removeContractFromEmployee(contract, employee) {
        return __awaiter(this, void 0, void 0, function* () {
            // remove contractId from employe contract records
            for (let i = 0; i < employee.dossier.contractsIds.length; i++) {
                if (contract.id == employee.dossier.contractsIds[i]) {
                    employee.dossier.contractsIds.splice(i, 1);
                }
            }
            let updatedEmployee = yield this.employeeRepo.updateEmployee(employee);
            return updatedEmployee;
        });
    }
    setContractOnEmployee(contract, employee) {
        return __awaiter(this, void 0, void 0, function* () {
            employee.dossier.contractsIds.push(contract.id);
            employee.dossier.currentContractId = contract.id;
            employee.active = true;
            return yield this.employeeRepo.updateEmployee(employee);
        });
    }
    setActiveOnEmployee(employee) {
        return __awaiter(this, void 0, void 0, function* () {
            employee.active = true;
            return yield this.employeeRepo.updateEmployee(employee);
        });
    }
    setInactiveOnEmployee(employee) {
        return __awaiter(this, void 0, void 0, function* () {
            employee.active = false;
            return yield this.employeeRepo.updateEmployee(employee);
        });
    }
    setEmployeeAge(employee) {
        let present = moment();
        let birthDate = moment(employee.birthInfo.date);
        let yearsOld = (present.diff(birthDate, "days") / Number(config.get("numberOfDaysInYear")));
        employee.age = Number(yearsOld.toFixed(Number(config.get("numberOfYearDecimals"))));
    }
    setEmployeeWorkingPeriod(employee) {
        let present = moment();
        let startWorkingDate = moment(employee.dossier.startWorkingDate);
        let workingPeriodInYears = (present.diff(startWorkingDate, "days") / Number(config.get("numberOfDaysInYear")));
        employee.dossier.workingPeriod = Number(workingPeriodInYears.toFixed(Number(config.get("numberOfYearDecimals"))));
    }
    setDepartmentAddress(employee) {
        let departmentAddressInfo = config.get("besonDepartmentInfo" + "." + employee.dossier.department + "." + "addressInfo");
        employee.dossier.departmentAddress = {};
        employee.dossier.departmentAddress.street = departmentAddressInfo.street;
        employee.dossier.departmentAddress.postalCode = departmentAddressInfo.postalCode;
        employee.dossier.departmentAddress.city = departmentAddressInfo.city;
    }
    setCommuteCosts(employee) {
        if (employee.dossier.commuteCosts.type == "PUBLIC") {
            employee.dossier.commuteCosts.totalKm = 0;
        }
    }
};
EmployeeServce = __decorate([
    inversify_1.injectable(),
    __metadata("design:paramtypes", [])
], EmployeeServce);
exports.EmployeeServce = EmployeeServce;
//# sourceMappingURL=EmployeeService.js.map