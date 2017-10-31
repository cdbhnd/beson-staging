"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable-next-line:no-var-requires
let timeCalculator = require("./lib/TimeCalculator");
class TimeCalculator {
    static add(firstTimeString, secondTimeString) {
        return timeCalculator.add(firstTimeString, secondTimeString);
    }
    static addMulti(timeStrings) {
        let result = "00:00";
        for (let i = 0; i < timeStrings.length; i++) {
            result = this.add(result, timeStrings[i]);
        }
        return result;
    }
    static gt(ts1, ts2) {
        return timeCalculator.gt(ts1, ts2);
    }
    static lt(ts1, ts2) {
        return timeCalculator.lt(ts1, ts2);
    }
    static subtract(firstTimeString, secondTimeString) {
        return timeCalculator.subtract(firstTimeString, secondTimeString);
    }
    static convertDecimalToTimeString(timeInMinues) {
        return timeCalculator.convertDecimalToTimeString(timeInMinues);
    }
    static convertTimestringToDecimal(ts) {
        return timeCalculator.convertTimeStringToDecimal(ts);
    }
}
exports.TimeCalculator = TimeCalculator;
//# sourceMappingURL=TimeCalculator.js.map