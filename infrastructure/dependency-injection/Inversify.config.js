"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const Types_1 = require("./Types");
const Services = require("../../services/");
const Providers = require("../../providers/");
const DB = require("../../database/index");
const Logger_1 = require("../logger/Logger");
const EventMediator_1 = require("../eventEngine/EventMediator");
let kernel = new inversify_1.Kernel();
// repos
kernel.bind(Types_1.default.IUserRepository).to(DB.User);
kernel.bind(Types_1.default.IEmployeeRepository).to(DB.Employee);
kernel.bind(Types_1.default.IContractRepository).to(DB.Contract);
kernel.bind(Types_1.default.IEmployeeDocumentReposiotry).to(DB.EmployeeDocuments);
kernel.bind(Types_1.default.IEmployeeHistoryRecordRepository).to(DB.EmployeeHistoryRecord);
kernel.bind(Types_1.default.IMessageRepository).to(DB.Message);
kernel.bind(Types_1.default.IUserInboxRepository).to(DB.UserInbox);
kernel.bind(Types_1.default.IScheduledTaskRepository).to(DB.ScheduledTask);
kernel.bind(Types_1.default.IPerformanceReportRepository).to(DB.PerformanceReport);
// services
kernel.bind(Types_1.default.IStorageService).to(Services.StorageService);
kernel.bind(Types_1.default.IDocumentService).to(Services.DocumentService);
kernel.bind(Types_1.default.IEmployeeService).to(Services.EmployeeServce);
kernel.bind(Types_1.default.IContractService).to(Services.ContractService);
kernel.bind(Types_1.default.IEmployeeDocumentService).to(Services.EmployeeDocumentService);
kernel.bind(Types_1.default.IEmployeeHistoryService).to(Services.EmployeeHistoryService);
kernel.bind(Types_1.default.IMessageService).to(Services.MessageService);
kernel.bind(Types_1.default.IImageService).to(Services.CloudinaryServce);
kernel.bind(Types_1.default.IReportService).to(Services.ReportService);
// providers
kernel.bind(Types_1.default.IDocumentStorageProvider).to(Providers.DropboxDocumentStorageProvider).whenTargetNamed("dropbox");
// utility
kernel.bind(Types_1.default.Logger).to(Logger_1.Logger).inSingletonScope();
kernel.bind(Types_1.default.EventMediator).to(EventMediator_1.EventMediator);
// variable bindings
kernel.bind("entityName").toConstantValue("user").whenInjectedInto(DB.User);
kernel.bind("entityName").toConstantValue("employee").whenInjectedInto(DB.Employee);
kernel.bind("entityName").toConstantValue("contract").whenInjectedInto(DB.Contract);
kernel.bind("entityName").toConstantValue("employeeDocuments").whenInjectedInto(DB.EmployeeDocuments);
kernel.bind("entityName").toConstantValue("employeeHistoryRecord").whenInjectedInto(DB.EmployeeHistoryRecord);
kernel.bind("entityName").toConstantValue("messages").whenInjectedInto(DB.Message);
kernel.bind("entityName").toConstantValue("userInboxes").whenInjectedInto(DB.UserInbox);
kernel.bind("entityName").toConstantValue("scheduledTasks").whenInjectedInto(DB.ScheduledTask);
kernel.bind("entityName").toConstantValue("performanceReport").whenInjectedInto(DB.PerformanceReport);
exports.default = kernel;
//# sourceMappingURL=Inversify.config.js.map