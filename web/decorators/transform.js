"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function TransformResponse(sourceModel, destModel) {
    return (target, propertyKey, descriptor) => {
        let originalMethod = descriptor.value;
        descriptor.value = (...args) => {
            return originalMethod
                .apply(this, args)
                .then((data) => {
                return automapper.map(sourceModel, destModel, data);
            });
        };
        return descriptor;
    };
}
exports.TransformResponse = TransformResponse;
//# sourceMappingURL=transform.js.map