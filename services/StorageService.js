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
const Check_1 = require("../utility/Check");
const cloudinary = require("cloudinary");
const inversify_1 = require("inversify");
const config = require("config");
let StorageService = class StorageService {
    uploadImageFile(url) {
        return __awaiter(this, void 0, void 0, function* () {
            Check_1.Check.notNull(url, "url");
            return new Promise((resolve, reject) => {
                cloudinary.config({
                    cloud_name: String(config.get("cloudinary.cloudName")),
                    api_key: String(config.get("cloudinary.apiKey")),
                    api_secret: String(config.get("cloudinary.apiSecret")),
                });
                cloudinary.uploader.upload(url, (result) => {
                    if (result.error) {
                        reject(result.error);
                    }
                    else {
                        resolve(result.secure_url);
                    }
                }, { width: 1000 });
            });
        });
    }
};
StorageService = __decorate([
    inversify_1.injectable()
], StorageService);
exports.StorageService = StorageService;
//# sourceMappingURL=StorageService.js.map