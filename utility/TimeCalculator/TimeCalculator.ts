// tslint:disable-next-line:no-var-requires
let timeCalculator = require("./lib/TimeCalculator");
export class TimeCalculator {

    public static add(firstTimeString: string, secondTimeString: string): string {
        return timeCalculator.add(firstTimeString, secondTimeString);
    }

    public static addMulti(timeStrings: string[]): string {
        let result: string = "00:00";
        for (let i = 0; i < timeStrings.length; i++) {
            result = this.add(result, timeStrings[i]);
        }
        return result;
    }

    public static gt(ts1: string, ts2: string): boolean {
        return timeCalculator.gt(ts1, ts2);
    }

    public static lt(ts1: string, ts2: string): boolean {
        return timeCalculator.lt(ts1, ts2);
    }

    public static subtract(firstTimeString: string, secondTimeString: string): string {
        return timeCalculator.subtract(firstTimeString, secondTimeString);
    }

    public static convertDecimalToTimeString(timeInMinues: number): string {
        return timeCalculator.convertDecimalToTimeString(timeInMinues);
    }

    public static convertTimestringToDecimal(ts: string): number {
        return timeCalculator.convertTimeStringToDecimal(ts);
    }
}
