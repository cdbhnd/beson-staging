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
const _1 = require("../entities/");
const _2 = require("../infrastructure/dependency-injection/");
const inversify_1 = require("inversify");
const Check_1 = require("../utility/Check");
const moment = require("moment");
const TimeCalculator_1 = require("../utility/TimeCalculator/TimeCalculator");
let ReportService = class ReportService {
    constructor() {
        this.contractRepo = _2.kernel.get(_2.Types.IContractRepository);
        this.performanceReportRepo = _2.kernel.get(_2.Types.IPerformanceReportRepository);
    }
    findReport(employee, month, year) {
        return __awaiter(this, void 0, void 0, function* () {
            let dbReport = yield this.performanceReportRepo.findOne({
                employeeId: employee.id,
                currentYear: year,
                currentMonth: month,
            });
            let freshReport = yield this.buildReport(employee, month, year);
            if (dbReport) {
                freshReport.week = dbReport.week;
                freshReport.salaryReductions = dbReport.salaryReductions;
            }
            return freshReport;
        });
    }
    buildReport(employee, month, year) {
        return __awaiter(this, void 0, void 0, function* () {
            Check_1.Check.notNull(employee, "employee");
            let contract = yield this.contractRepo.findContract(employee.dossier.currentContractId);
            Check_1.Check.notNull(contract, "contract");
            return {
                id: null,
                birthDate: employee.birthInfo.date,
                bsn: employee.bsn,
                commuteCostsPerKm: employee.dossier.commuteCosts.ammount,
                commuteDailyKm: employee.dossier.commuteCosts.totalKm,
                commutePublicTotal: employee.dossier.commuteCosts.ammount,
                contractCount: employee.dossier.contractsIds.length,
                contractType: contract.type,
                currentContractEnd: contract.endDate,
                currentContractStart: contract.startDate,
                currentMonthLabel: "%MONTH_LABEL%",
                currentYear: year,
                currentMonth: month,
                employeeId: employee.id,
                firstName: employee.firstName,
                lastName: employee.lastName,
                hourlyWage: employee.dossier.hourlyWage,
                iban: employee.bankAccountNumber,
                lastMonthVacation: 0,
                maxHoursPerWeek: contract.maxWorkingHoursPerWeek,
                minHoursPerWeek: contract.minWorkingHoursPerWeek,
                workingHoursPerDay: this.calculateHowMuchEmployeeShouldWorkDaily(contract.minWorkingHoursPerWeek, contract.maxWorkingHoursPerWeek),
                vacationMultiplier: 1,
                notEditable: false,
                notEditablePassword: null,
                week: this.getEmployeeWeeksInMonth(employee, month, year, contract),
                salaryReductions: [],
                overTimeHoursMultiplier: 1,
                weekendHoursMultiplier: 1,
            };
        });
    }
    createPerformanceReports(employee, dateFrom, dateTo) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.deletePerformanceReports(employee, dateFrom, dateTo);
            let startDate = moment(dateFrom);
            let endDate = moment(dateTo);
            let performanceReports = [];
            while (!startDate.isSame(endDate)) {
                let generatedPerformanceReport = yield this.buildReport(employee, startDate.month(), startDate.year());
                performanceReports.push(this.performanceReportRepo.create(generatedPerformanceReport));
                startDate.add(1, "month");
            }
            return Promise.all(performanceReports);
        });
    }
    deletePerformanceReports(employee, dateFrom, dateTo) {
        return __awaiter(this, void 0, void 0, function* () {
            let startDate = moment(dateFrom);
            let endDate = moment(dateTo);
            let deletePerformanceReportQueries = [];
            while (!startDate.isAfter(endDate)) {
                let query = {
                    employeeId: employee.id,
                    currentMonth: startDate.month(),
                    currentYear: startDate.year(),
                };
                deletePerformanceReportQueries.push(this.performanceReportRepo.deleteByQuery(query));
                startDate.add(1, "month");
            }
            return Promise.all(deletePerformanceReportQueries)
                .then((res) => {
                return true;
            })
                .catch((err) => {
                return false;
            });
        });
    }
    findReports(employee, dateFrom, dateTo) {
        return __awaiter(this, void 0, void 0, function* () {
            let mDateFrom = moment(dateFrom);
            let mDateTo = moment(dateTo);
            let results = [];
            let loadedReports = [];
            for (let m = mDateFrom; m.isBefore(mDateTo); m.add(1, "days")) {
                let reportMonth = m.month() + "-" + m.year();
                if (loadedReports.indexOf(reportMonth) === -1) {
                    let report = yield this.performanceReportRepo.findOne({ currentMonth: m.month(), currentYear: m.year(), employeeId: employee.id });
                    if (!report) {
                        report = yield this.buildReport(employee, m.month(), m.year());
                    }
                    results.push(report);
                    loadedReports.push(reportMonth);
                }
            }
            return results;
        });
    }
    prepareReportForExport(report, employee) {
        let clone = JSON.parse(JSON.stringify(report));
        clone.week = {};
        clone.week.first = this.prepareWorkingWeekForExport(report.week[0]);
        clone.week.second = this.prepareWorkingWeekForExport(report.week[1]);
        clone.week.third = this.prepareWorkingWeekForExport(report.week[2]);
        clone.week.fourth = this.prepareWorkingWeekForExport(report.week[3]);
        clone.week.fifth = this.prepareWorkingWeekForExport(report.week[4]);
        this.calculateMonthlyTotals(clone, employee);
        clone.salaryDecrease = report.salaryReductions.filter((item) => {
            return item.modificator === _1.SalaryModificators.DECREASE;
        });
        clone.salaryIncrease = report.salaryReductions.filter((item) => {
            return item.modificator === _1.SalaryModificators.INCREASE;
        });
        return clone;
    }
    calculateMonthlyTotals(reportData, employee) {
        reportData.totalBruto = this.sumWeeklyTotals(reportData, "totalBruto");
        reportData.totalPauze = this.sumWeeklyTotals(reportData, "totalPauze");
        reportData.totalNeto = this.sumWeeklyTotals(reportData, "totalNeto");
        reportData.totalOvertime = this.sumWeeklyTotals(reportData, "totalOvertime");
        reportData.totalWeekend = this.sumWeeklyTotals(reportData, "totalWeekend");
        reportData.overtimeHours = TimeCalculator_1.TimeCalculator.convertDecimalToTimeString(TimeCalculator_1.TimeCalculator.convertTimestringToDecimal(TimeCalculator_1.TimeCalculator.add(reportData.totalOvertime, reportData.totalWeekend)) * reportData.vacationMultiplier);
        reportData.driverOvertimeHours = "00:00";
        if (employee.dossier.role === "Driver") {
            reportData.driverOvertimeHours = this.sumWeeklyTotals(reportData, "driverOvertimeHours");
        }
    }
    sumWeeklyTotals(reportData, total) {
        return TimeCalculator_1.TimeCalculator.addMulti([reportData.week.first[total],
            reportData.week.second[total],
            reportData.week.third[total],
            reportData.week.fourth[total],
            reportData.week.fifth[total]]);
    }
    prepareWorkingWeekForExport(week) {
        let cloneWeek = JSON.parse(JSON.stringify(week));
        cloneWeek.totalBruto = "00:00";
        cloneWeek.totalNeto = "00:00";
        cloneWeek.totalPauze = "00:00";
        cloneWeek.totalOvertime = "00:00";
        cloneWeek.totalWeekend = "00:00";
        cloneWeek.driverOvertimeHours = "00:00";
        for (let prop in cloneWeek.days) {
            if (cloneWeek.days.hasOwnProperty(prop) && cloneWeek.days[prop]) {
                let day = cloneWeek.days[prop];
                day.from = day.worked === 1 ? this.sanitizeHoursString(day.from) : "00:00";
                day.to = day.worked === 1 ? this.sanitizeHoursString(day.to) : "00:00";
                day.bruto = day.worked === 1 ? this.sanitizeHoursString(day.bruto) : "00:00";
                day.neto = day.worked === 1 ? this.sanitizeHoursString(day.neto) : "00:00";
                day.pauze = day.worked === 1 ? this.sanitizeHoursString(day.pauze) : "00:00";
                day.overtime = day.worked === 1 ? this.sanitizeHoursString(day.overtime) : "00:00";
                cloneWeek.totalBruto = TimeCalculator_1.TimeCalculator.add(cloneWeek.totalBruto, day.bruto);
                cloneWeek.totalNeto = TimeCalculator_1.TimeCalculator.add(cloneWeek.totalNeto, day.neto);
                cloneWeek.totalPauze = TimeCalculator_1.TimeCalculator.add(cloneWeek.totalPauze, day.pauze);
                cloneWeek.totalOvertime = TimeCalculator_1.TimeCalculator.add(cloneWeek.totalOvertime, day.overtime);
                let driverOvertime = TimeCalculator_1.TimeCalculator.gt(day.neto, "04:00") ? day.neto : "00:00";
                cloneWeek.driverOvertimeHours = TimeCalculator_1.TimeCalculator.add(cloneWeek.driverOvertimeHours, driverOvertime);
                if (prop === "zaterdag" || prop === "zondag") {
                    cloneWeek.totalWeekend = TimeCalculator_1.TimeCalculator.add(cloneWeek.totalWeekend, day.neto);
                }
            }
        }
        return cloneWeek;
    }
    sanitizeHoursString(hours) {
        // if (hours[0] === "0") {
        //   return hours[1] + hours[2] + hours[3] + hours[4];
        // }
        return hours;
    }
    getEmployeeWeeksInMonth(employee, month, year, contract) {
        moment.locale("nl");
        let startDate = moment([year, month]);
        let firstDay = moment(startDate).startOf("month").hours(4);
        let endDay = moment(startDate).endOf("month").hours(4);
        let dayInWeeks = {};
        for (let m = firstDay; m.isBefore(endDay); m.add(1, "days")) {
            if (!dayInWeeks[m.week()]) {
                dayInWeeks[m.week()] = [];
            }
            dayInWeeks[m.week()].push(m.toISOString());
        }
        let weeks = [];
        for (let i in dayInWeeks) {
            if (!dayInWeeks.hasOwnProperty(i)) {
                continue;
            }
            let week = {
                yearIndex: parseInt(i, 10),
                days: {
                    maandag: null,
                    dinsdag: null,
                    woensdag: null,
                    donderdag: null,
                    vrijdag: null,
                    zaterdag: null,
                    zondag: null,
                },
            };
            for (let j = 0; j < dayInWeeks[i].length; j++) {
                let momentInstance = moment(dayInWeeks[i][j]);
                let dayName = momentInstance.format("dddd").toLowerCase();
                let workedToday = 0;
                if (moment(contract.startDate).isBefore(momentInstance)) {
                    workedToday = !this.isWeekend(momentInstance) ? 1 : 0;
                }
                week.days[dayName] = {
                    date: momentInstance.format("DD/MM/YYYY"),
                    isoDate: momentInstance.toISOString(),
                    worked: workedToday,
                    from: workedToday === 1 ? this.getStartWorkingTime(contract) : "00:00",
                    to: workedToday === 1 ? this.getEndWorkingTime(contract) : "00:00",
                    bruto: workedToday === 1 ? this.getBrutoWorkingTime(contract) : "00:00",
                    pauze: workedToday === 1 ? this.getPauzeTime(contract) : "00:00",
                    neto: workedToday === 1 ? this.getNetoWorkingTime(contract) : "00:00",
                    overtime: "00:00",
                    vacation: "00:00",
                    absence: [],
                    locked: false,
                };
            }
            weeks.push(week);
        }
        return weeks;
    }
    getStartWorkingTime(contract) {
        if (contract.minWorkingHoursPerWeek === contract.maxWorkingHoursPerWeek) {
            return "08:00";
        }
        return "00:00";
    }
    getEndWorkingTime(contract) {
        if (contract.minWorkingHoursPerWeek === contract.maxWorkingHoursPerWeek) {
            let hoursDaily = Math.floor(contract.maxWorkingHoursPerWeek / 5);
            return TimeCalculator_1.TimeCalculator.addMulti(["08:00", "0" + hoursDaily + ":00", "01:00"]);
        }
        return "00:00";
    }
    getBrutoWorkingTime(contract) {
        if (contract.minWorkingHoursPerWeek === contract.maxWorkingHoursPerWeek) {
            let hoursDaily = Math.floor(contract.maxWorkingHoursPerWeek / 5);
            return TimeCalculator_1.TimeCalculator.add("01:00", "0" + hoursDaily + ":00");
        }
        return "00:00";
    }
    getNetoWorkingTime(contract) {
        if (contract.minWorkingHoursPerWeek === contract.maxWorkingHoursPerWeek) {
            let hoursDaily = Math.floor(contract.maxWorkingHoursPerWeek / 5);
            return "0" + hoursDaily + ":00";
        }
        return "00:00";
    }
    getPauzeTime(contract) {
        if (contract.minWorkingHoursPerWeek === contract.maxWorkingHoursPerWeek) {
            return "01:00";
        }
        return "00:00";
    }
    isWeekend(moment) {
        return moment.day() === 0 || moment.day() === 6;
    }
    calculateHowMuchEmployeeShouldWorkDaily(minHrsPerWeek, maxHrsPerWeek) {
        if (minHrsPerWeek != maxHrsPerWeek) {
            return TimeCalculator_1.TimeCalculator.convertDecimalToTimeString(0);
        }
        let numberOfWorkingDays = 5;
        let numberOfMinutesEmployeeShoudlWorkDaily = ((maxHrsPerWeek * 60) / numberOfWorkingDays);
        return TimeCalculator_1.TimeCalculator.convertDecimalToTimeString(numberOfMinutesEmployeeShoudlWorkDaily);
    }
};
ReportService = __decorate([
    inversify_1.injectable(),
    __metadata("design:paramtypes", [])
], ReportService);
exports.ReportService = ReportService;
//# sourceMappingURL=ReportService.js.map