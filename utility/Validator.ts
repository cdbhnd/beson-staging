import { ValidationException } from "../infrastructure/exceptions";
import indicative = require("indicative");

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

export async function validate(params: any, constraints: any, message?: string) {
    try {
        let validationResult = await indicative.validateAll(params, constraints);
    } catch (error) {
        throw new ValidationException(error, message);
    }
}
