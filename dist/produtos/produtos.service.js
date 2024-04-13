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
exports.ProdutosService = void 0;
const common_1 = require("@nestjs/common");
const knex_1 = require("knex");
const database_service_1 = require("../database/database.service");
const user_service_1 = require("../user/user.service");
const { v4: uuidv4 } = require('uuid');
let ProdutosService = class ProdutosService {
    constructor(knexConnection, testeKnex, userService) {
        this.knexConnection = knexConnection;
        this.testeKnex = testeKnex;
        this.userService = userService;
    }
    async teste() {
        return this.knexConnection
            .select().from('products');
    }
    async getProducts(user, query) {
        const queryProdutos = this.knexConnection
            .select().from('products')
            .where('users_id', '=', user === null || user === void 0 ? void 0 : user.userId);
        if (query === null || query === void 0 ? void 0 : query.queryText) {
            queryProdutos.andWhere('descricao', 'like', `%${query.queryText}%`);
        }
        if (query === null || query === void 0 ? void 0 : query.codigoBarras) {
            queryProdutos.andWhere('codigo_barras', '=', `${query.codigoBarras}`);
        }
        const clonedQuery = queryProdutos.clone();
        const totalQuery = this.knexConnection.count('* as total').from(clonedQuery.as('subquery')).as('count');
        queryProdutos.limit(query === null || query === void 0 ? void 0 : query.limit).offset(((query === null || query === void 0 ? void 0 : query.page) - 1) * (query === null || query === void 0 ? void 0 : query.limit));
        const [result, total] = await Promise.all([
            queryProdutos,
            totalQuery
        ]);
        const totalCount = total[0].total;
        return {
            data: result,
            total: totalCount,
            page: Number(query === null || query === void 0 ? void 0 : query.page)
        };
    }
    async getPedidos(user, query) {
        const userDatabase = await this.userService.findByUser(user.username);
        console.clear();
        console.log(userDatabase);
        const queryPedidos = this.knexConnection
            .select().from('order')
            .where('userId', '=', userDatabase === null || userDatabase === void 0 ? void 0 : userDatabase.uuid);
        const clonedQuery = queryPedidos.clone();
        const totalQuery = this.knexConnection.count('* as total').from(clonedQuery.as('subquery')).as('count');
        queryPedidos.limit(query === null || query === void 0 ? void 0 : query.limit).offset(((query === null || query === void 0 ? void 0 : query.page) - 1) * (query === null || query === void 0 ? void 0 : query.limit));
        const [result, total] = await Promise.all([
            queryPedidos,
            totalQuery
        ]);
        const totalCount = total[0].total;
        return {
            data: result,
            total: totalCount,
            page: Number(query === null || query === void 0 ? void 0 : query.page)
        };
    }
    async getProduct(user, query) {
        const queryProdutos = this.knexConnection
            .select().from('products')
            .where('users_id', '=', user === null || user === void 0 ? void 0 : user.userId).limit(1);
        queryProdutos.andWhere('codigo_barras', '=', `${query.codigoBarras}`);
        const result = await queryProdutos;
        return Object.assign({}, result[0]);
    }
    async getPedidosProduto(user, query) {
        const queryProdutos = this.knexConnection
            .select('A.*', 'A.quantidade as estoque', 'B.id as B_id', 'B.categorias_id', 'B.promocao_id', 'B.estoque as B_estoque', 'B.codigo_barras', 'B.controlar_estoque', 'B.venda_fracionada', 'B.valor_aberto', 'B.fornecedores_id', 'B.descricao', 'B.url_image', 'B.preco_custo', 'B.preco_venda', 'B.uuid as uuid', 'B.user_uuid as user_uuid')
            .from('produto_order as A')
            .join('products as B', 'A.uid', 'B.uuid')
            .where('A.orderId', query.uuid);
        const result = await queryProdutos;
        return result;
    }
    async savePedido(user, query) {
        try {
            const orderData = {
                identificador: query.identificador,
                observacao: query.observacao,
                acrescimo: query.acrescimo,
                desconto: query.desconto,
                quantidadeProdutosPedido: query.quantidadeProdutosPedido,
                ultimoValorProduto: query.ultimoValorProduto,
                ultimoNomeProduto: query.ultimoNomeProduto,
                userId: query.userId,
                uuid: uuidv4(),
                totalGeral: query.totalGeral,
                data_venda: query.data_venda,
                order_status: query.orderStatus,
                forma_pagamento: query.forma_pagamento
            };
            await this.knexConnection('order').insert(orderData);
            const orderId = orderData.uuid;
            for (const produto of query.produtoList || []) {
                const produtoData = {
                    uid: produto.uuid,
                    orderId: orderId,
                    observacao: produto.observacao,
                    users_id: produto.users_id,
                    quantidade: produto.estoque
                };
                await this.knexConnection('produto_order').insert(produtoData);
            }
            return orderData;
        }
        catch (error) {
            console.error("Erro ao salvar pedido:", error);
            throw new common_1.InternalServerErrorException("Erro ao salvar pedido");
        }
    }
    async deletePedidoByUUID(uuid) {
        const trx = await this.knexConnection.transaction();
        try {
            await trx('produto_order').where('orderId', uuid).del();
            await trx('order').where('uuid', uuid).del();
            await trx.commit();
            return { success: true, message: "Pedido excluído com sucesso." };
        }
        catch (error) {
            await trx.rollback();
            console.error("Erro ao excluir pedido:", error);
            throw new common_1.InternalServerErrorException("Erro ao excluir pedido. Por favor, tente novamente mais tarde.");
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
    async contarPedido(user) {
        try {
            const userDatabase = await this.userService.findByUser(user.username);
            const quantidadePedidos = await this.knexConnection('order')
                .where('userId', userDatabase.uuid)
                .count();
            return { success: true, quantidade: quantidadePedidos[0]['count(*)'] };
        }
        catch (error) {
            console.error("Erro ao contar pedidos:", error);
            throw new common_1.InternalServerErrorException("Erro ao contar pedidos. Por favor, tente novamente mais tarde.");
        }
    }
};
ProdutosService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('KnexConnection')),
    __metadata("design:paramtypes", [Function, database_service_1.DatabaseService, user_service_1.UserService])
], ProdutosService);
exports.ProdutosService = ProdutosService;
//# sourceMappingURL=produtos.service.js.map