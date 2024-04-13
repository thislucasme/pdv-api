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
exports.PedidoService = void 0;
const common_1 = require("@nestjs/common");
const knex_1 = require("knex");
let PedidoService = class PedidoService {
    constructor(knexConnection) {
        this.knexConnection = knexConnection;
    }
    async getLucroTotal(user, query) {
        console.clear();
        console.log(query, user);
        try {
            const result = await this.knexConnection.transaction(async (trx) => {
                const userQuery = trx('users').where('email', '=', user.username);
                const [usuario] = await userQuery;
                console.log(query);
                const totalProdutosQuery = trx('pdv_test.order as A')
                    .join('produto_order as B', 'B.orderId', '=', 'A.uuid')
                    .join('products as C', 'C.uuid', '=', 'B.uid')
                    .select(trx.raw("ifnull(sum(C.quantidade * C.preco_venda), 0) as total_produtos"))
                    .whereRaw(`DATE(A.data_venda) >= '${query.startDate}' AND DATE(A.data_venda) <= ''${query.endDate}''`)
                    .where('A.userId', '=', `${usuario.uuid}`);
                const totalBrutoQuery = trx('pdv_test.order as A')
                    .join('produto_order as B', 'B.orderId', '=', 'A.uuid')
                    .join('products as C', 'C.uuid', '=', 'B.uid')
                    .select(trx.raw("ifnull(sum(C.quantidade * C.preco_custo), 0) as total_bruto"))
                    .whereRaw(`DATE(A.data_venda) >= '${query.startDate}' AND DATE(A.data_venda) <= ''${query.endDate}''`)
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
};
PedidoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('KnexConnection')),
    __metadata("design:paramtypes", [Function])
], PedidoService);
exports.PedidoService = PedidoService;
//# sourceMappingURL=pedido.service.js.map