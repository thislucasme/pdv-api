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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const is_public_decorator_1 = require("./decorators/is-public.decorator");
const local_auth_guard_1 = require("./guards/local-auth.guard");
const knex_1 = require("knex");
const swagger_1 = require("@nestjs/swagger");
const usuarioDTO_1 = require("../tdo/usuarioDTO");
const jwt = require("jsonwebtoken");
let AuthController = class AuthController {
    constructor(authService, knexConnection) {
        this.authService = authService;
        this.knexConnection = knexConnection;
    }
    login(user) {
        return this.authService.login(user);
    }
    decryptToken(req) {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.decode(token);
        return decodedToken;
    }
};
__decorate([
    (0, common_1.Post)("login"),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.UseGuards)(local_auth_guard_1.LocalAuthGuard),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [usuarioDTO_1.UsuarioLogin]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Get)("decrypt-token"),
    (0, is_public_decorator_1.IsPublic)(),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "decryptToken", null);
AuthController = __decorate([
    (0, common_1.Controller)(),
    (0, swagger_1.ApiTags)('login'),
    __param(1, (0, common_1.Inject)('KnexConnection')),
    __metadata("design:paramtypes", [auth_service_1.AuthService, Function])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map