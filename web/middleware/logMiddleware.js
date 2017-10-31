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
const _1 = require("../../infrastructure/dependency-injection/");
let logger = _1.kernel.get(_1.Types.Logger);
function logMiddleware(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        let oldWrite = res.write;
        let oldEnd = res.end;
        let log = {
            createdAt: new Date(),
            request: {
                headers: req.headers,
                method: req.method,
                url: req.url,
                params: req.params,
                query: req.query,
                body: req.body,
            },
            response: {
                headers: null,
                statusCode: null,
                body: null,
            },
        };
        let chunks = [];
        res.write = (chunk) => {
            chunks.push(chunk);
            oldWrite.call(res, chunk);
        };
        res.end = (chunk) => {
            try {
                if (chunk) {
                    chunks.push(chunk);
                }
                // if exception is trown, chunk is string
                if (typeof chunk == "string") {
                    log.response.body = chunk;
                }
                else {
                    log.response.body = Buffer.concat(chunks).toString("utf8");
                }
                log.response.headers = res._headers;
                log.response.statusCode = res.statusCode;
                logger.createHttpLog(log);
            }
            catch (e) {
                console.log("Error occurred in logging middleware " + e);
            }
            oldEnd.call(res, chunk);
        };
        next();
    });
}
exports.logMiddleware = logMiddleware;
//# sourceMappingURL=logMiddleware.js.map