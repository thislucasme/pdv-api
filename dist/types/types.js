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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioSistemaQuery = exports.UsuarioSistema = exports.LucrosEmVendasTDO = exports.LucroTotalTdo = exports.FormaPagamentoTdo = exports.QueryPaginationProdutos = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class QueryPaginationProdutos {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], QueryPaginationProdutos.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], QueryPaginationProdutos.prototype, "limit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], QueryPaginationProdutos.prototype, "queryText", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], QueryPaginationProdutos.prototype, "codigoBarras", void 0);
exports.QueryPaginationProdutos = QueryPaginationProdutos;
class FormaPagamentoTdo {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Data inicial',
        default: "2023-01-13",
    }),
    __metadata("design:type", String)
], FormaPagamentoTdo.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Data final',
        default: "2023-01-13",
    }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], FormaPagamentoTdo.prototype, "endDate", void 0);
exports.FormaPagamentoTdo = FormaPagamentoTdo;
class LucroTotalTdo {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Data inicial',
        default: "2023-01-13",
    }),
    __metadata("design:type", String)
], LucroTotalTdo.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Data final',
        default: "2024-01-13",
    }),
    __metadata("design:type", String)
], LucroTotalTdo.prototype, "endDate", void 0);
exports.LucroTotalTdo = LucroTotalTdo;
class LucrosEmVendasTDO {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Data inicial',
        default: "2023-09-13",
    }),
    __metadata("design:type", String)
], LucrosEmVendasTDO.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Data final',
        default: "2024-12-01",
    }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], LucrosEmVendasTDO.prototype, "endDate", void 0);
exports.LucrosEmVendasTDO = LucrosEmVendasTDO;
class UsuarioSistema {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Nome',
        default: "Marcelo",
    }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UsuarioSistema.prototype, "nome", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'CPF',
        default: "00000000000",
    }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UsuarioSistema.prototype, "cpf", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Email',
        default: "email@gmail.com",
    }),
    __metadata("design:type", String)
], UsuarioSistema.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Telefone',
        default: "0000000000",
    }),
    __metadata("design:type", String)
], UsuarioSistema.prototype, "telefone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Nascimento',
        default: "1999-09-13",
    }),
    __metadata("design:type", String)
], UsuarioSistema.prototype, "data_nascimento", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'RG',
        default: "GD000000",
    }),
    __metadata("design:type", String)
], UsuarioSistema.prototype, "rg_ie", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Nascimento',
        default: "",
    }),
    __metadata("design:type", String)
], UsuarioSistema.prototype, "observacao", void 0);
exports.UsuarioSistema = UsuarioSistema;
class UsuarioSistemaQuery {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Id do Cliente',
        default: "ebe10e4d-5df7-4071-b90e-aeaf401ccdd7",
    }),
    __metadata("design:type", String)
], UsuarioSistemaQuery.prototype, "id_hash", void 0);
exports.UsuarioSistemaQuery = UsuarioSistemaQuery;
//# sourceMappingURL=types.js.map