"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = () => {
    var _a, _b;
    return ({
        chaveCripto: process.env.CHAVE_CRIPTO,
        clientUrl: process.env.URL_CLIENT,
        siteSuccess: {
            host: process.env.SITE_SUCCESS_DB_HOST,
            port: parseInt((_a = process.env.SITE_SUCCESS_DB_PORT) !== null && _a !== void 0 ? _a : '3306', 10),
            user: process.env.SITE_SUCCESS_DB_USER,
            password: process.env.SITE_SUCCESS_DB_PASSWORD,
            name: process.env.SITE_SUCCESS_DB_NAME,
        },
        atualizacaoAutomatica: {
            host: process.env.ATUALIZACAO_DB_HOST,
            port: parseInt((_b = process.env.ATUALIZACAO_DB_PORT) !== null && _b !== void 0 ? _b : '3309', 10),
            user: process.env.ATUALIZACAO_DB_USER,
            password: process.env.ATUALIZACAO_DB_PASS,
            name: process.env.ATUALIZACAO_DB_DATABASE,
        },
    });
};
//# sourceMappingURL=configuracao.js.map