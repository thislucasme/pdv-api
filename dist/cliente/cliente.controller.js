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
exports.ClienteController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const currentUser_1 = require("../auth/utils/currentUser");
const cliente_service_1 = require("./cliente.service");
let ClienteController = class ClienteController {
    constructor(clienteService) {
        this.clienteService = clienteService;
    }
    async criarUsuarioSistema(user, response, body) {
        try {
            const result = await this.clienteService.criarClienteSistema(user, body);
            response.send(result);
        }
        catch (error) {
            console.error("Erro ao criar usuário no sistema:", error);
            response.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).send({
                message: "Erro ao criar usuário no sistema"
            });
        }
    }
    async atualizarUsuarioSistema(user, response, body) {
        try {
            const result = await this.clienteService.atualizarClienteSistema(user, body);
            response.send(result);
        }
        catch (error) {
            console.error("Erro ao atualizar usuário no sistema:", error);
            response.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).send({
                message: "Erro ao atualizar usuário no sistema"
            });
        }
    }
    async listarTodos(user, response) {
        try {
            const result = await this.clienteService.listarUsuariosSistema(user);
            response.send(result);
        }
        catch (error) {
            console.error("Erro ao buscar usuários no sistema:", error);
            response.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).send({
                message: "Erro ao buscar usuários no sistema"
            });
        }
    }
    async getSingleCliente(user, response, query) {
        console.log(query);
        try {
            const result = await this.clienteService.getSingleUsuariosSistema(user, query.id_hash);
            response.send(result);
        }
        catch (error) {
            console.error("Erro ao buscar usuario no sistema:", error);
            response.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).send({
                message: "Erro ao buscar usuario no sistema"
            });
        }
    }
    async deleteUsuarioSistema(user, response, query) {
        try {
            const result = await this.clienteService.deletarUsuarioSistema(user, query.id_hash);
            response.send(result);
        }
        catch (error) {
            console.error("Erro ao deletar usuários no sistema:", error);
            response.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).send({
                message: "Erro ao deletar usuários no sistema"
            });
        }
    }
};
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)(),
    __param(0, (0, currentUser_1.CurrentUser)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], ClienteController.prototype, "criarUsuarioSistema", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Put)(),
    __param(0, (0, currentUser_1.CurrentUser)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], ClienteController.prototype, "atualizarUsuarioSistema", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)(),
    __param(0, (0, currentUser_1.CurrentUser)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ClienteController.prototype, "listarTodos", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('cliente'),
    __param(0, (0, currentUser_1.CurrentUser)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], ClienteController.prototype, "getSingleCliente", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Delete)(),
    __param(0, (0, currentUser_1.CurrentUser)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], ClienteController.prototype, "deleteUsuarioSistema", null);
ClienteController = __decorate([
    (0, common_1.Controller)("clientes"),
    __metadata("design:paramtypes", [cliente_service_1.ClienteService])
], ClienteController);
exports.ClienteController = ClienteController;
//# sourceMappingURL=cliente.controller.js.map