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
exports.ClienteService = void 0;
const common_1 = require("@nestjs/common");
const knex_1 = require("knex");
const user_service_1 = require("../user/user.service");
const { v4: uuidv4 } = require('uuid');
let ClienteService = class ClienteService {
    constructor(knexConnection, userService) {
        this.knexConnection = knexConnection;
        this.userService = userService;
    }
    async criarClienteSistema(user, body) {
        try {
            const userDatabase = await this.userService.findByUser(user.username);
            body.usuario_uuid = userDatabase.uuid;
            body.id_hash = uuidv4();
            await this.knexConnection('usuarios_sistema')
                .insert(body);
            return { success: true };
        }
        catch (error) {
            console.error("Erro ao criar usuário pedido:", error);
            throw new common_1.InternalServerErrorException("Erro ao criar usuário pedido");
        }
    }
    async atualizarClienteSistema(user, body) {
        console.log(body);
        try {
            const userDatabase = await this.userService.findByUser(user.username);
            if (!userDatabase) {
                throw new common_1.NotFoundException("Usuário não encontrado");
            }
            await this.knexConnection('usuarios_sistema')
                .where({ id_hash: body.id_hash })
                .update(body);
            return { success: true };
        }
        catch (error) {
            console.error("Erro ao atualizar usuário no sistema:", error);
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            else {
                throw new common_1.InternalServerErrorException("Erro ao atualizar usuário no sistema");
            }
        }
    }
    async deletarUsuarioSistema(user, id_hash) {
        try {
            const userDatabase = await this.userService.findByUser(user.username);
            if (!userDatabase) {
                throw new common_1.NotFoundException("Usuário não encontrado");
            }
            await this.knexConnection('usuarios_sistema')
                .where({ id_hash: id_hash })
                .del();
            return { success: true };
        }
        catch (error) {
            console.error("Erro ao deletar usuário no sistema:", error);
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            else {
                throw new common_1.InternalServerErrorException("Erro ao deletar usuário no sistema");
            }
        }
    }
    async listarUsuariosSistema(user) {
        try {
            const userDatabase = await this.userService.findByUser(user.username);
            if (!userDatabase) {
                throw new common_1.NotFoundException("Usuário não encontrado");
            }
            const usuariosSistema = await this.knexConnection('usuarios_sistema')
                .select('*').where("usuario_uuid", "=", userDatabase.uuid);
            return usuariosSistema;
        }
        catch (error) {
            console.error("Erro ao listar usuários do sistema:", error);
            throw new common_1.InternalServerErrorException("Erro ao listar usuários do sistema");
        }
    }
    async getSingleUsuariosSistema(user, id_hash) {
        try {
            const userDatabase = await this.userService.findByUser(user.username);
            if (!userDatabase) {
                throw new common_1.NotFoundException("Usuário não encontrado");
            }
            const usuariosSistema = await this.knexConnection('usuarios_sistema')
                .select('*').where("usuario_uuid", "=", userDatabase.uuid).andWhere("id_hash", "=", id_hash);
            return usuariosSistema[0];
        }
        catch (error) {
            console.error("Erro ao listar usuários do sistema:", error);
            throw new common_1.InternalServerErrorException("Erro ao listar usuários do sistema");
        }
    }
};
ClienteService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('KnexConnection')),
    __metadata("design:paramtypes", [Function, user_service_1.UserService])
], ClienteService);
exports.ClienteService = ClienteService;
//# sourceMappingURL=cliente.service.js.map