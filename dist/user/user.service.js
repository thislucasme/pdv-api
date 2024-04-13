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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const knex_1 = require("knex");
let UserService = class UserService {
    constructor(knexConnection) {
        this.knexConnection = knexConnection;
    }
    async findUserByUser(usernName, senha) {
        var _a, _b, _c;
        const dadosUsuario = await this.knexConnection.select("*").from("users").where("email", "=", usernName).andWhere("senha", "=", senha).limit(1);
        const user = {
            name: (_a = dadosUsuario[0]) === null || _a === void 0 ? void 0 : _a.name,
            email: (_b = dadosUsuario[0]) === null || _b === void 0 ? void 0 : _b.email,
            id: (_c = dadosUsuario[0]) === null || _c === void 0 ? void 0 : _c.id,
            uuid: dadosUsuario[0].uuid,
            senha: ''
        };
        return user;
    }
    async findByUser(username) {
        console.log(username, "antes");
        const usuario = await this.knexConnection.select("*")
            .from("users").where("email", "=", username)
            .limit(1);
        return usuario[0];
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('KnexConnection')),
    __metadata("design:paramtypes", [Function])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map