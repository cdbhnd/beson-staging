"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const routing_controllers_1 = require("routing-controllers");
let GlobalMiddleware = class GlobalMiddleware {
    use(request, response, next) {
        // tslint:disable-next-line:no-string-literal
        global["response_reference"] = response;
        next();
    }
};
GlobalMiddleware = __decorate([
    routing_controllers_1.MiddlewareGlobalBefore()
], GlobalMiddleware);
exports.GlobalMiddleware = GlobalMiddleware;
//# sourceMappingURL=globalMiddleware.js.map