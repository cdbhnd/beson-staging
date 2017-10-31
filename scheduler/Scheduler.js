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
const Task_1 = require("./Task");
const _1 = require("../infrastructure/dependency-injection/");
class Scheduler {
    static init() {
        return __awaiter(this, void 0, void 0, function* () {
            let scheduledTasks = yield this.getScheduleRepository().find({ executed: false });
            for (let i = 0; i < scheduledTasks.length; i++) {
                yield this.scheduleExecution(scheduledTasks[i]);
            }
            return true;
        });
    }
    static create(name, action, date, data) {
        return __awaiter(this, void 0, void 0, function* () {
            let newScheduledTask = {
                action: action,
                data: data,
                date: date.toISOString(),
                error: false,
                executed: false,
                log: null,
                name: name,
                success: false,
                type: "action",
            };
            newScheduledTask = yield this.getScheduleRepository().create(newScheduledTask);
            yield this.scheduleExecution(newScheduledTask);
            return true;
        });
    }
    static get(name, action, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.getScheduleRepository().findOne({
                name: name,
                action: action,
                type: "action",
                data: data,
            });
        });
    }
    static getScheduleRepository() {
        return _1.kernel.get(_1.Types.IScheduledTaskRepository);
    }
    static scheduleExecution(scheduledTask) {
        return __awaiter(this, void 0, void 0, function* () {
            let newTask = new Task_1.Task(scheduledTask);
            this.scheduledJobs.push(yield newTask.schedule());
        });
    }
}
Scheduler.scheduledJobs = [];
exports.Scheduler = Scheduler;
//# sourceMappingURL=Scheduler.js.map