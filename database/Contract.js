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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
const inversify_1 = require("inversify");
const BaseRepository_1 = require("./BaseRepository");
let Contract = class Contract extends BaseRepository_1.BaseRepository {
    constructor(entityName) {
        super(entityName);
    }
    createContract(contract) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.create(contract);
        });
    }
    findContract(contractId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.findOne({ id: contractId });
        });
    }
    findByQuery(query) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.find(query);
        });
    }
    updateContract(contract) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.update(contract);
        });
    }
    deleteContract(contractId) {
        return __awaiter(this, void 0, void 0, function* () {
            let contract = yield this.findOne({ id: contractId });
            return yield this.delete(contract);
        });
    }
};
Contract = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject("entityName")),
    __metadata("design:paramtypes", [String])
], Contract);
exports.Contract = Contract;
//# sourceMappingURL=Contract.js.map