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
const Exceptions = require("../infrastructure/exceptions/");
const moment = require("moment");
const _1 = require("../infrastructure/dependency-injection/");
const inversify_1 = require("inversify");
let ContractService = class ContractService {
    constructor() {
        this.employeeRepo = this.employeeRepo = _1.kernel.get(_1.Types.IEmployeeRepository);
        this.contractRepo = _1.kernel.get(_1.Types.IContractRepository);
    }
    createEmployeeContract(contract) {
        return __awaiter(this, void 0, void 0, function* () {
            let employeeFromDB = yield this.employeeRepo.findByQuery({ id: contract.employeeId });
            contract.expired = false;
            this.setDurationOnContract(contract);
            this.setFirstLastNameOnContract(contract, employeeFromDB);
            let createdContract = yield this.contractRepo.createContract(contract);
            yield this.setPreviousContractToExpired(employeeFromDB);
            return createdContract;
        });
    }
    terminateContract(contract) {
        return __awaiter(this, void 0, void 0, function* () {
            contract.expired = true;
            contract.terminatedAt = moment().toISOString();
            return yield this.contractRepo.updateContract(contract);
        });
    }
    deleteContract(contract) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!contract.expired) {
                throw new Exceptions.ServiceLayerException("Contract is active and can not be deleted", contract.id);
            }
            yield this.contractRepo.deleteContract(contract.id);
            return contract;
        });
    }
    deleteAllContractsForEmployee(employeeId) {
        return __awaiter(this, void 0, void 0, function* () {
            let allContractForEmployee = yield this.contractRepo.findByQuery({ employeeId: employeeId });
            for (let i = 0; i < allContractForEmployee.length; i++) {
                this.contractRepo.deleteContract(allContractForEmployee[i].id);
            }
        });
    }
    setDurationOnContract(contract) {
        let startDate = moment(contract.startDate);
        let endDate = moment(contract.endDate);
        let durationInDays = endDate.diff(startDate, "days");
        contract.duration = durationInDays;
    }
    setFirstLastNameOnContract(contract, employee) {
        contract.employeeFirstName = employee.firstName;
        contract.employeeLastName = employee.lastName;
    }
    setPreviousContractToExpired(employee) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!employee.dossier.currentContractId) {
                return;
            }
            let lastEmployeeContract = yield this.contractRepo.find({ id: employee.dossier.currentContractId });
            if (lastEmployeeContract.length) {
                lastEmployeeContract[0].expired = true;
                return yield this.contractRepo.updateContract(lastEmployeeContract[0]);
            }
        });
    }
};
ContractService = __decorate([
    inversify_1.injectable(),
    __metadata("design:paramtypes", [])
], ContractService);
exports.ContractService = ContractService;
//# sourceMappingURL=ContractService.js.map