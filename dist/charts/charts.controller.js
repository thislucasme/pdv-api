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
exports.ChartsController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const currentUser_1 = require("../auth/utils/currentUser");
const types_1 = require("../types/types");
const charts_service_1 = require("./charts.service");
const swagger_1 = require("@nestjs/swagger");
let ChartsController = class ChartsController {
    constructor(chartsServico) {
        this.chartsServico = chartsServico;
    }
    async getPagamentos(user, query, response) {
        try {
            const result = await this.chartsServico.getPaymentMethodCounts(user, query);
            response.send(result);
        }
        catch (e) {
            console.log(e);
            response.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).send(e);
        }
    }
    async getTotals(user, query, response) {
        try {
            const result = await this.chartsServico.getTotals(user, query);
            response.send(result);
        }
        catch (e) {
            console.log(e);
            response.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).send(e);
        }
    }
    async getLucroTotal(user, query, response) {
        try {
            const result = await this.chartsServico.getLucroTotal(user, query);
            response.send(result);
        }
        catch (e) {
            console.log(e);
            response.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).send(e);
        }
    }
    async getOcorrencia(user, query, response) {
        try {
            const result = await this.chartsServico.getPeriodo(user, query);
            response.send(result);
        }
        catch (e) {
            console.log(e);
            response.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).send(e);
        }
    }
};
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)("pagamentos"),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, currentUser_1.CurrentUser)()),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, types_1.FormaPagamentoTdo, Object]),
    __metadata("design:returntype", Promise)
], ChartsController.prototype, "getPagamentos", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Get)("total-vendas"),
    __param(0, (0, currentUser_1.CurrentUser)()),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, types_1.LucrosEmVendasTDO, Object]),
    __metadata("design:returntype", Promise)
], ChartsController.prototype, "getTotals", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Get)("total-lucro"),
    __param(0, (0, currentUser_1.CurrentUser)()),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, types_1.LucroTotalTdo, Object]),
    __metadata("design:returntype", Promise)
], ChartsController.prototype, "getLucroTotal", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Get)("vendas"),
    __param(0, (0, currentUser_1.CurrentUser)()),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], ChartsController.prototype, "getOcorrencia", null);
ChartsController = __decorate([
    (0, common_1.Controller)("charts"),
    (0, swagger_1.ApiTags)('Charts'),
    __metadata("design:paramtypes", [charts_service_1.ChartsService])
], ChartsController);
exports.ChartsController = ChartsController;
//# sourceMappingURL=charts.controller.js.map