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
const exceptions_1 = require("../infrastructure/exceptions");
const indicative = require("indicative");
// TODO Custom rules
const userType = (data, field, message, args, get) => {
    return new Promise((resolve, reject) => {
        let allowedValues = [1, 2, 3];
        // get value of field under validation
        const fieldValue = get(data, field);
        if (Number.isInteger(fieldValue) && allowedValues.indexOf(fieldValue) != -1) {
            return resolve();
        }
        return reject("userType field must be integer and must be in range 1-3");
    });
};
const genderType = (data, field, message, args, get) => {
    return new Promise((resolve, reject) => {
        let allowedValues = ["male", "female"];
        // get value of field under validation
        const fieldValue = get(data, field);
        if (allowedValues.indexOf(fieldValue) != -1) {
            return resolve();
        }
        if (!fieldValue) {
            return resolve();
        }
        return reject("Wrong gender value");
    });
};
const marriageStatusType = (data, field, message, args, get) => {
    return new Promise((resolve, reject) => {
        let allowedValues = ["Divorced after marriage", "Separated after partnership", "Unmarried", "Partnership", "Widower after marriage", "Widower after partnership", "Legally married"];
        // get value of field under validation
        const fieldValue = get(data, field);
        if (allowedValues.indexOf(fieldValue) != -1) {
            return resolve();
        }
        if (!fieldValue) {
            return resolve();
        }
        return reject("Wrong marriageStatusType value");
    });
};
const idDocumentType = (data, field, message, args, get) => {
    return new Promise((resolve, reject) => {
        let allowedValues = ["IDK", "P", "VG"];
        // get value of field under validation
        const fieldValue = get(data, field);
        if (allowedValues.indexOf(fieldValue) != -1) {
            return resolve();
        }
        if (!fieldValue) {
            return resolve();
        }
        return reject("Wrong idDocumentType value ");
    });
};
const languageType = (data, field, message, args, get) => {
    return new Promise((resolve, reject) => {
        let allowedValues = ["en", "sr", "nl"];
        // get value of field under validation
        const fieldValue = get(data, field);
        if (allowedValues.indexOf(fieldValue) != -1) {
            return resolve();
        }
        if (!fieldValue) {
            return resolve();
        }
        return reject("Wrong language value ");
    });
};
const roleType = (data, field, message, args, get) => {
    return new Promise((resolve, reject) => {
        let allowedValues = ["Courrier", "Driver", "administrationEmployee", "fleetEmployee"];
        // get value of field under validation
        const fieldValue = get(data, field);
        if (allowedValues.indexOf(fieldValue) != -1) {
            return resolve();
        }
        if (!fieldValue) {
            return resolve();
        }
        return reject("Wrong role value ");
    });
};
const contractType = (data, field, message, args, get) => {
    return new Promise((resolve, reject) => {
        let allowedValues = ["limited", "unlimited", "deferred"];
        // get value of field under validation
        const fieldValue = get(data, field);
        if (allowedValues.indexOf(fieldValue) != -1) {
            return resolve();
        }
        if (!fieldValue) {
            return resolve();
        }
        return reject("Wrong type value ");
    });
};
const departmentType = (data, field, message, args, get) => {
    return new Promise((resolve, reject) => {
        let allowedValues = ["Algemeen", "Dachser", "DHL", "DPD"];
        // get value of field under validation
        const fieldValue = get(data, field);
        if (allowedValues.indexOf(fieldValue) != -1) {
            return resolve();
        }
        if (!fieldValue) {
            return resolve();
        }
        return reject("Wrong departmentType value ");
    });
};
// TODO indicative library extended with custom rules
indicative.extend("userType", userType, null);
indicative.extend("genderType", genderType, null);
indicative.extend("marriageStatusType", marriageStatusType, null);
indicative.extend("idDocumentType", idDocumentType, null);
indicative.extend("languageType", languageType, null);
indicative.extend("roleType", roleType, null);
indicative.extend("contractType", contractType, null);
indicative.extend("departmentType", departmentType, null);
function validate(params, constraints, message) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let validationResult = yield indicative.validateAll(params, constraints);
        }
        catch (error) {
            throw new exceptions_1.ValidationException(error, message);
        }
    });
}
exports.validate = validate;
//# sourceMappingURL=Validator.js.map