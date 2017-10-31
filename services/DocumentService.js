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
const fs = require("fs");
const path = require("path");
const Docxtemplater = require("docxtemplater");
const Exceptions = require("../infrastructure/exceptions/");
const inversify_1 = require("inversify");
// tslint:disable-next-line:no-var-requires
let JSZip = require("jszip");
const XlsxTemplate = require("xlsx-template");
let DocumentService = class DocumentService {
    generateDocument(pathToTemplate, documentData, destinationPath) {
        let content = fs.readFileSync(path.resolve(pathToTemplate), "binary");
        let zip = new JSZip(content);
        let doc = new Docxtemplater();
        doc.loadZip(zip);
        doc.setData(documentData);
        try {
            doc.render();
        }
        catch (error) {
            let e = {
                message: error.message,
                name: error.name,
                stack: error.stack,
                properties: error.properties,
            };
            console.log(JSON.stringify({ error: e }));
            throw new Exceptions.ServiceLayerException("Document service error.", error);
        }
        let buf = doc.getZip()
            .generate({ type: "nodebuffer" });
        fs.writeFileSync(path.resolve(destinationPath), buf);
    }
    generateReport(pathToTemplate, reportData, destinationPath) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                fs.readFile(path.resolve(pathToTemplate), (err, data) => {
                    try {
                        let template = new XlsxTemplate(data);
                        let sheetNumber = 1;
                        template.substitute(sheetNumber, reportData);
                        fs.writeFileSync(path.resolve(destinationPath), template.generate(), { encoding: "binary" });
                        resolve(path.resolve(destinationPath));
                    }
                    catch (err) {
                        reject(err);
                    }
                });
            });
        });
    }
};
DocumentService = __decorate([
    inversify_1.injectable()
], DocumentService);
exports.DocumentService = DocumentService;
//# sourceMappingURL=DocumentService.js.map