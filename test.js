"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Diff_1 = require("./utility/Diff");
const moment = require("moment");
class Tests {
    static testDiff() {
        let diff = Diff_1.Diff.compare({
            name: "paja",
            test: "hero",
            array: ["A", "B", "C", "D"],
            dossier: {
                role: "Chouffer",
                array1: ["A", "B", "C"],
            },
        }, {
            name: "paja",
            test: "hero",
            array: ["A", "B", "C"],
            dossier: {
                role: "Chouffer",
                array1: ["A", "B"],
            },
        });
        console.log(JSON.stringify(diff));
    }
    static getWeeksInMonth(month, year) {
        moment.locale("de");
        let startDate = moment([year, month]);
        let firstDay = moment(startDate).startOf("month").hours(4);
        let endDay = moment(startDate).endOf("month").hours(4);
        let weeks = [];
        let dayInWeeks = {};
        for (let m = firstDay; m.isBefore(endDay); m.add(1, "days")) {
            if (weeks.indexOf(m.week()) === -1) {
                weeks.push(m.week());
            }
            if (!dayInWeeks[m.week()]) {
                dayInWeeks[m.week()] = [];
            }
            dayInWeeks[m.week()].push(m.toISOString());
        }
        return { weeks: weeks, days: dayInWeeks };
    }
}
exports.Tests = Tests;
(() => {
    console.log(Tests.getWeeksInMonth(4, 2017));
})();
//# sourceMappingURL=test.js.map