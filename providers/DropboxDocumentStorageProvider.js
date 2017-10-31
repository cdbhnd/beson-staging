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
const config = require("config");
const DropboxClient = require("dropbox");
const inversify_1 = require("inversify");
let DropboxDocumentStorageProvider = class DropboxDocumentStorageProvider {
    storeDocument(sourcePath, destinationPath) {
        return __awaiter(this, void 0, void 0, function* () {
            let dbClient = yield this.getClient();
            let fullDestPath = "/employees/" + destinationPath;
            let res = yield this.doStore(dbClient, sourcePath, fullDestPath);
            return yield this.getShareableLink(dbClient, fullDestPath);
        });
    }
    getClient() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                let appKey = config.get("dropbox.app_key").toString();
                let appSecret = config.get("dropbox.app_secret").toString();
                let accessToken = config.get("dropbox.access_token").toString();
                let client = new DropboxClient({ accessToken: accessToken });
                resolve(client);
            });
        });
    }
    doStore(dbClient, sourcePath, destinationPath) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                dbClient.filesSaveUrl({
                    url: sourcePath,
                    path: destinationPath,
                })
                    .then((res) => {
                    resolve(res);
                })
                    .catch((err) => {
                    console.log(err);
                    reject(err);
                });
            });
        });
    }
    getShareableLink(dbClient, fullDestPath) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    dbClient.sharingCreateSharedLink({
                        path: fullDestPath,
                        pending_upload: {
                            ".tag": "file",
                        },
                    })
                        .then((res) => {
                        resolve(res.url.replace("dl=0", "dl=1"));
                    })
                        .catch((err) => {
                        console.log(err);
                        this.getShareableLink(dbClient, fullDestPath)
                            .then((res) => {
                            resolve(res);
                        });
                    });
                }, 3000);
            });
        });
    }
    sleep(miliseconds) {
        let currentTime = new Date().getTime();
        // tslint:disable-next-line:no-empty
        while (currentTime + miliseconds >= new Date().getTime()) { }
    }
};
DropboxDocumentStorageProvider = __decorate([
    inversify_1.injectable()
], DropboxDocumentStorageProvider);
exports.DropboxDocumentStorageProvider = DropboxDocumentStorageProvider;
//# sourceMappingURL=DropboxDocumentStorageProvider.js.map