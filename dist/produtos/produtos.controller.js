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
exports.ProdutosController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const currentUser_1 = require("../auth/utils/currentUser");
const produtos_service_1 = require("./produtos.service");
let ProdutosController = class ProdutosController {
    constructor(produtosService) {
        this.produtosService = produtosService;
    }
    async pagination(user, query, response) {
        const result = await this.produtosService.getProducts(user, query);
        console.log(result);
        try {
            const result = await this.produtosService.getProducts(user, query);
            if ((result === null || result === void 0 ? void 0 : result.data.length) === 0) {
                response.status(common_1.HttpStatus.NO_CONTENT).send();
            }
            const customData = {
                page: result.page,
                total: result.total,
            };
            response.send(result.data);
        }
        catch (e) {
            console.log(e);
            response.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).send(e);
        }
    }
    async getOcorrencia(user, query, response) {
        try {
            const result = await this.produtosService.getPeriodo(user, query);
            if ((result === null || result === void 0 ? void 0 : result.length) === 0) {
                response.status(common_1.HttpStatus.NO_CONTENT).send();
            }
            else {
                const customData = {
                    page: result.page,
                    total: result.total,
                };
                response.send(result);
            }
        }
        catch (e) {
            console.log(e);
            response.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).send(e);
        }
    }
    async getPagamentos(user, query, response) {
        try {
            const result = await this.produtosService.getPaymentMethodCounts(user, query);
            if ((result === null || result === void 0 ? void 0 : result.length) === 0) {
                response.status(common_1.HttpStatus.NO_CONTENT).send();
            }
            response.send(result);
        }
        catch (e) {
            console.log(e);
            response.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).send(e);
        }
    }
    async getTotals(user, query, response) {
        try {
            const result = await this.produtosService.getTotals(user, query);
            response.send(result);
        }
        catch (e) {
            console.log(e);
            response.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).send(e);
        }
    }
    async test() {
        return await this.produtosService.teste();
    }
    async singleProduct(user, query, response) {
        try {
            const result = await this.produtosService.getProduct(user, query);
            if (Object.keys(result).length === 0) {
                response.status(common_1.HttpStatus.NO_CONTENT).send();
            }
            response.send(result);
        }
        catch (e) {
            response.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async singlePedido(user, query, response) {
        console.clear();
        console.log(query);
        try {
            const result = await this.produtosService.getPedidosProduto(user, query);
            if (Object.keys(result).length === 0) {
            }
            const customData = {
                page: 0,
                total: 0,
            };
            response.setHeader('Custom-Header', JSON.stringify(customData));
            response.send(result);
        }
        catch (e) {
            response.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async deletePedidoEprodutosByIdProduto(user, query, response) {
        console.clear();
        console.log(query);
        try {
            if (!query.uuid) {
                response.status(common_1.HttpStatus.BAD_REQUEST).send({
                    message: "O parâmetro 'uuid' é obrigatório na consulta."
                });
                return;
            }
            const result = await this.produtosService.deletePedidoByUUID(query.uuid);
            response.send(result);
        }
        catch (error) {
            console.error("Erro ao excluir pedido:", error);
            response.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).send({
                message: "Erro ao excluir pedido. Por favor, tente novamente mais tarde."
            });
        }
    }
    async contarPedidos(user, query, response) {
        try {
            const result = await this.produtosService.contarPedido(user);
            response.send(result);
        }
        catch (error) {
            console.error("Erro ao contar pedidos:", error);
            response.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).send({
                message: "Erro ao contar pedidos. Por favor, tente novamente mais tarde."
            });
        }
    }
    async savePedido(user, body, response) {
        try {
            console.clear();
            console.log(body);
            const result = await this.produtosService.savePedido(user, body);
            if (Object.keys(result).length === 0) {
                response.status(common_1.HttpStatus.NO_CONTENT).send();
            }
            else {
                response.send(result);
            }
        }
        catch (error) {
            console.error("Erro no endpoint /pedido:", error);
            response.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).send({ message: "Erro interno no servidor" });
        }
    }
    async paginationPedido(user, query, response) {
        try {
            const result = await this.produtosService.getPedidos(user, query);
            if ((result === null || result === void 0 ? void 0 : result.data.length) === 0) {
                response.status(common_1.HttpStatus.NO_CONTENT).send();
                return;
            }
            const customData = {
                page: result.page,
                total: result.total,
            };
            response.setHeader('Custom-Header', JSON.stringify(customData));
            response.send(result.data);
        }
        catch (e) {
            console.log(e);
            response.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).send(e);
        }
    }
};
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)(),
    __param(0, (0, currentUser_1.CurrentUser)()),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], ProdutosController.prototype, "pagination", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)("periodo"),
    __param(0, (0, currentUser_1.CurrentUser)()),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], ProdutosController.prototype, "getOcorrencia", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)("pagamentos"),
    __param(0, (0, currentUser_1.CurrentUser)()),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], ProdutosController.prototype, "getPagamentos", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)("total-vendas"),
    __param(0, (0, currentUser_1.CurrentUser)()),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], ProdutosController.prototype, "getTotals", null);
__decorate([
    (0, common_1.Get)('test'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProdutosController.prototype, "test", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('produto'),
    __param(0, (0, currentUser_1.CurrentUser)()),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], ProdutosController.prototype, "singleProduct", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('produtos-pedido'),
    __param(0, (0, currentUser_1.CurrentUser)()),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], ProdutosController.prototype, "singlePedido", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Delete)('produtos-pedido'),
    __param(0, (0, currentUser_1.CurrentUser)()),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], ProdutosController.prototype, "deletePedidoEprodutosByIdProduto", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('contar-pedidossss'),
    __param(0, (0, currentUser_1.CurrentUser)()),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], ProdutosController.prototype, "contarPedidos", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('pedido'),
    __param(0, (0, currentUser_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], ProdutosController.prototype, "savePedido", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('pedidos'),
    __param(0, (0, currentUser_1.CurrentUser)()),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], ProdutosController.prototype, "paginationPedido", null);
ProdutosController = __decorate([
    (0, common_1.Controller)('produtos'),
    __metadata("design:paramtypes", [produtos_service_1.ProdutosService])
], ProdutosController);
exports.ProdutosController = ProdutosController;
//# sourceMappingURL=produtos.controller.js.map