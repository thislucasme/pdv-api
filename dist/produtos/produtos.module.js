"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProdutosModule = void 0;
const database_service_1 = require("../database/database.service");
const produtos_controller_1 = require("./produtos.controller");
const produtos_service_1 = require("./produtos.service");
const common_1 = require("@nestjs/common");
const user_service_1 = require("../user/user.service");
let ProdutosModule = class ProdutosModule {
};
ProdutosModule = __decorate([
    (0, common_1.Module)({
        imports: [],
        controllers: [
            produtos_controller_1.ProdutosController,
        ],
        providers: [
            produtos_service_1.ProdutosService, database_service_1.DatabaseService, user_service_1.UserService
        ],
    })
], ProdutosModule);
exports.ProdutosModule = ProdutosModule;
//# sourceMappingURL=produtos.module.js.map