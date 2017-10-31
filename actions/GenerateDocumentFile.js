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
const _1 = require("../infrastructure/dependency-injection/");
const ActionBase_1 = require("./ActionBase");
const config = require("config");
const path = require("path");
class Action extends ActionBase_1.ActionBase {
    constructor() {
        super();
        this.documentService = _1.kernel.get(_1.Types.IDocumentService);
    }
    ;
    execute(context) {
        return __awaiter(this, void 0, void 0, function* () {
            let pathToTemplate = config.get("folderPaths.documentTemplates") + "/" + context.params.templateName + ".docx";
            let pathWhereDocIsGenerated = config.get("folderPaths.generateDocuments") + "/" + context.params.fileName + ".docx";
            let documentDataToBind = context.params.documentData;
            try {
                yield this.documentService.generateDocument(pathToTemplate, documentDataToBind, pathWhereDocIsGenerated);
                return path.resolve(pathWhereDocIsGenerated);
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    getConstraints() {
        return {
            templateName: "required",
            fileName: "required",
            documentData: "required",
        };
    }
    getSanitizationPattern() {
        return {};
    }
}
exports.Action = Action;
//# sourceMappingURL=GenerateDocumentFile.js.map