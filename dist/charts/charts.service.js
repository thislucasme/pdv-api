"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChartsService = void 0;
const common_1 = require("@nestjs/common");
const knex_1 = require("knex");
const database_service_1 = require("../database/database.service");
const user_service_1 = require("../user/user.service");
let ChartsService = class ChartsService {
    constructor(knexConnection, testeKnex, userService) {
        this.knexConnection = knexConnection;
        this.testeKnex = testeKnex;
        this.userService = userService;
    }
    async getPaymentMethodCounts(user, query) {
        try {
            const result = await this.knexConnection
                .select(this.knexConnection.raw("CONCAT(forma_pagamento, ' - ', CASE forma_pagamento " +
                "WHEN 1 THEN 'dinheiro' " +
                "WHEN 2 THEN 'cartão de débito' " +
                "WHEN 3 THEN 'cartão de crédito' " +
                "ELSE 'Outro' END) AS forma_pagamento_label"))
                .count('* as quantidade')
                .from('order')
                .whereNotNull('forma_pagamento')
                .groupBy('forma_pagamento')
                .orderBy('forma_pagamento');
            const dados = result.map((item, index) => (Object.assign(Object.assign({}, item), { fill: ['#ABE16D', '#E16D84', '#926DE1'][index] })));
            return dados;
        }
        catch (error) {
            console.error('Erro ao obter os métodos de pagamento:', error);
            throw error;
        }
    }
};
ChartsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('KnexConnection')),
    __metadata("design:paramtypes", [Function, database_service_1.DatabaseService, user_service_1.UserService])
], ChartsService);
exports.ChartsService = ChartsService;
//# sourceMappingURL=charts.service.js.map