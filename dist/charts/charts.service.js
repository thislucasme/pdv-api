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
    async getTotals(user, query) {
        try {
            const result = await this.knexConnection.transaction(async (trx) => {
                const userQuery = trx('users').where('email', '=', user.username);
                const [usuario] = await userQuery;
                console.log(query);
                const totalVendaQuery = trx('pdv_test.order as A')
                    .join('produto_order as B', 'B.orderId', '=', 'A.uuid')
                    .join('products as C', 'C.uuid', '=', 'B.uid')
                    .select(trx.raw("ifnull(sum(C.quantidade * C.preco_venda), 0) as total_venda"))
                    .whereRaw(`DATE(A.data_venda) >= '${query.startDate}' AND DATE(A.data_venda) <= '${query.endDate}'`)
                    .where('A.userId', '=', usuario.uuid);
                console.log(totalVendaQuery.toQuery());
                const totalProdutosQuery = trx('products as po')
                    .select(trx.raw('SUM(po.quantidade * po.preco_venda) AS total_produtos'))
                    .where("po.user_uuid", "=", `${usuario.uuid}`);
                const quantidadeProdutosQuery = trx('products')
                    .count('* as quantidade_produtos')
                    .where("products.user_uuid", "=", `${usuario.uuid}`);
                ;
                const [totalVendaResult, totalProdutosResult, quantidadeProdutosResult] = await Promise.all([
                    totalVendaQuery,
                    totalProdutosQuery,
                    quantidadeProdutosQuery
                ]);
                const totalVendas = totalVendaResult[0];
                const totalProdutos = totalProdutosResult[0];
                const quantidadeProduto = quantidadeProdutosResult[0];
                return {
                    total_venda: totalVendas.total_venda,
                    total_produtos: totalProdutos.total_produtos,
                    quantidade_produtos: quantidadeProduto.quantidade_produtos
                };
            });
            return result;
        }
        catch (error) {
            console.log('Erro ao obter os dados:', error);
            throw error;
        }
    }
    async getLucroTotal(user, query) {
        try {
            const result = await this.knexConnection.transaction(async (trx) => {
                console.log(query.startDate, query.endDate);
                const userQuery = trx('users').where('email', '=', user.username);
                const [usuario] = await userQuery;
                const totalProdutosQuery = trx('pdv_test.order as A')
                    .join('produto_order as B', 'B.orderId', '=', 'A.uuid')
                    .join('products as C', 'C.uuid', '=', 'B.uid')
                    .select(trx.raw("ifnull(sum(C.quantidade * C.preco_venda), 0) as total_produtos"))
                    .whereRaw(`DATE(A.data_venda) >= '${query.startDate}' AND DATE(A.data_venda) <= '${query.endDate}'`)
                    .where('A.userId', '=', `${usuario.uuid}`);
                const totalBrutoQuery = trx('pdv_test.order as A')
                    .join('produto_order as B', 'B.orderId', '=', 'A.uuid')
                    .join('products as C', 'C.uuid', '=', 'B.uid')
                    .select(trx.raw("ifnull(sum(C.quantidade * C.preco_custo), 0) as total_bruto"))
                    .whereRaw(`DATE(A.data_venda) >= '${query.startDate}' AND DATE(A.data_venda) <= '${query.endDate}'`)
                    .where('A.userId', '=', `${usuario.uuid}`);
                const [totalProdutosResult, totalBrutoResult] = await Promise.all([
                    totalProdutosQuery,
                    totalBrutoQuery
                ]);
                const totalProdutos = totalProdutosResult[0];
                const totalBruto = totalBrutoResult[0];
                const lucro = Number(totalProdutos) - Number(totalBruto);
                return {
                    total_produtos: totalProdutos.total_produtos,
                    total_bruto: totalBruto.total_bruto,
                    lucro: Number(totalProdutos.total_produtos) - Number(totalBruto.total_bruto),
                    porcentagem_lucro: ((Number(totalProdutos.total_produtos) - Number(totalBruto.total_bruto)) / Number(totalBruto.total_bruto)) * 100
                };
            });
            return result;
        }
        catch (error) {
            console.log('Erro ao obter os dados:', error);
            throw error;
        }
    }
    async getPeriodo(user, query) {
        const result = await this.knexConnection
            .select()
            .from('order')
            .select(this.knexConnection.raw('DATE_FORMAT(data_venda, "%d-%m-%Y") AS data'))
            .count('* as quantidade_pedidos')
            .where('data_venda', '>=', this.knexConnection.raw(`DATE_SUB(CURDATE(), INTERVAL ${query.dias} DAY)`))
            .groupBy(this.knexConnection.raw('DATE(data_venda), data_venda'))
            .orderBy('data_venda', 'asc');
        return result;
    }
};
ChartsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('KnexConnection')),
    __metadata("design:paramtypes", [Function, database_service_1.DatabaseService, user_service_1.UserService])
], ChartsService);
exports.ChartsService = ChartsService;
//# sourceMappingURL=charts.service.js.map