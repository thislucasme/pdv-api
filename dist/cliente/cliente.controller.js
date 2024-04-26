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
const types_1 = require("../types/types");
const swagger_1 = require("@nestjs/swagger");
const exception_filter_1 = require("../exception-filter/exception-filter");
let ClienteController = class ClienteController {
    constructor(clienteService) {
        this.clienteService = clienteService;
    }
    async criarUsuarioSistema(user, body) {
        return await this.clienteService.criarClienteSistema(user, body);
    }
    async atualizarUsuarioSistema(user, body) {
        return await this.clienteService.atualizarClienteSistema(user, body);
    }
    async listarTodos(user) {
        return await this.clienteService.listarUsuariosSistema(user);
    }
    async getSingleCliente(user, response, query) {
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
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseFilters)(new exception_filter_1.HttpExceptionFilter()),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, common_1.Post)(),
    __param(0, (0, currentUser_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, types_1.UsuarioSistema]),
    __metadata("design:returntype", Promise)
], ClienteController.prototype, "criarUsuarioSistema", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UseFilters)(new exception_filter_1.HttpExceptionFilter()),
    (0, common_1.Put)(),
    __param(0, (0, currentUser_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, types_1.UsuarioSistema]),
    __metadata("design:returntype", Promise)
], ClienteController.prototype, "atualizarUsuarioSistema", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseFilters)(new exception_filter_1.HttpExceptionFilter()),
    (0, common_1.Get)(),
    __param(0, (0, currentUser_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ClienteController.prototype, "listarTodos", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('cliente'),
    __param(0, (0, currentUser_1.CurrentUser)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, types_1.UsuarioSistemaQuery]),
    __metadata("design:returntype", Promise)
], ClienteController.prototype, "getSingleCliente", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseFilters)(new exception_filter_1.HttpExceptionFilter()),
    (0, common_1.Delete)(),
    __param(0, (0, currentUser_1.CurrentUser)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, types_1.UsuarioSistemaQuery]),
    __metadata("design:returntype", Promise)
], ClienteController.prototype, "deleteUsuarioSistema", null);
ClienteController = __decorate([
    (0, common_1.Controller)("clientes"),
    (0, swagger_1.ApiTags)('Clientes'),
    __metadata("design:paramtypes", [cliente_service_1.ClienteService])
], ClienteController);
exports.ClienteController = ClienteController;
//# sourceMappingURL=cliente.controller.js.map