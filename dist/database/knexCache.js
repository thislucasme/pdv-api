"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveKnexInstance = exports.getKnex = void 0;
const knexCache = new Map();
const getKnex = (contrato) => {
    return knexCache.get(contrato);
};
exports.getKnex = getKnex;
const saveKnexInstance = (contrato, instance) => {
    knexCache.set(contrato, instance);
};
exports.saveKnexInstance = saveKnexInstance;
//# sourceMappingURL=knexCache.js.map