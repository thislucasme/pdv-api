"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseAppModule = void 0;
const common_1 = require("@nestjs/common");
const knex_1 = require("knex");
const knexProvider = {
    provide: 'KnexConnection',
    useFactory: async () => {
        const connection = (0, knex_1.default)({
            client: 'mysql2',
            connection: {
                host: '127.0.0.1',
                user: 'root',
                password: '14209826',
                database: 'pdv_test',
                port: 3306
            },
        });
        return connection;
    },
};
let DatabaseAppModule = class DatabaseAppModule {
};
DatabaseAppModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [],
        controllers: [],
        providers: [knexProvider],
        exports: [knexProvider]
    })
], DatabaseAppModule);
exports.DatabaseAppModule = DatabaseAppModule;
//# sourceMappingURL=database-app.module.js.map