"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
const inversify_1 = require("inversify");
const PubSub = require("pubsub-js");
const request = require("request-promise");
const config = require("config");
let EventMediator = class EventMediator {
    subscribe(eventName, callback) {
        return PubSub.subscribe(eventName, callback);
    }
    unsubscribe(indentifier) {
        PubSub.unsubscribe(indentifier);
    }
    boradcastEvent(eventName, data) {
        PubSub.publish(eventName, data);
    }
    broadcastEventToHooks(eventName, data) {
        return __awaiter(this, void 0, void 0, function* () {
            let systemsToBeNotified = config.get("eventSettings.instance_urls");
            let options = {
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    eventName: eventName, data: data,
                }),
            };
            try {
                for (let i = 0; i < systemsToBeNotified.length; i++) {
                    yield request.post(systemsToBeNotified[i], options);
                }
            }
            catch (e) {
                console.error(e);
            }
        });
    }
};
EventMediator = __decorate([
    inversify_1.injectable()
], EventMediator);
exports.EventMediator = EventMediator;
//# sourceMappingURL=EventMediator.js.map