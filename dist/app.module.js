"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const charts_module_1 = require("./charts/charts.module");
const pedido_module_1 = require("./pedido/pedido.module");
const cliente_module_1 = require("./cliente/cliente.module");
const produtos_module_1 = require("./produtos/produtos.module");
const database_app_module_1 = require("./database/database-app.module");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const auth_module_1 = require("./auth/auth.module");
const configuracao_1 = require("./config/configuracao");
const user_module_1 = require("./user/user.module");
const platform_express_1 = require("@nestjs/platform-express");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            charts_module_1.ChartsModule,
            pedido_module_1.PedidoModule,
            cliente_module_1.ClienteModule,
            produtos_module_1.ProdutosModule,
            database_app_module_1.DatabaseAppModule,
            platform_express_1.MulterModule.register({
                dest: './uploads',
            }),
            auth_module_1.AuthModule,
            user_module_1.UserModule,
            config_1.ConfigModule.forRoot({
                load: [configuracao_1.default],
                isGlobal: true,
            }),
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map