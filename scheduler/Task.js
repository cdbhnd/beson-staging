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
const schedule = require("node-schedule");
const Actions = require("../actions");
const _1 = require("../infrastructure/dependency-injection/");
/**
 * Create an instance of the single Task to be scheduled and executed at specific dateTime
 *
 * @param {ScheduledTask} scheduledTask
 * @param {Operator} user
 */
class Task {
    constructor(scheduledTask) {
        this.task = scheduledTask;
    }
    schedule() {
        return __awaiter(this, void 0, void 0, function* () {
            return schedule.scheduleJob(new Date(this.task.date), () => __awaiter(this, void 0, void 0, function* () {
                let promise;
                let payload = JSON.parse(JSON.stringify(this.task.data));
                let actionToBeExecuted = new Actions[this.task.action].Action();
                let actionContext = new Actions.ActionContext();
                actionContext.params = payload;
                let scheduledTaskRepository = _1.kernel.get(_1.Types.IScheduledTaskRepository);
                try {
                    let result = yield actionToBeExecuted.run(actionContext);
                    this.task.log = JSON.stringify(result);
                    this.task.success = true;
                    this.task.executed = true;
                }
                catch (err) {
                    this.task.log = JSON.stringify(err);
                    this.task.error = true;
                    this.task.executed = true;
                }
                scheduledTaskRepository.update(this.task);
            }));
        });
    }
}
exports.Task = Task;
//# sourceMappingURL=Task.js.map