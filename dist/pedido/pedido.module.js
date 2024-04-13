"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PedidoModule = void 0;
const database_service_1 = require("../database/database.service");
const pedido_controller_1 = require("./pedido.controller");
const pedido_service_1 = require("./pedido.service");
const common_1 = require("@nestjs/common");
const user_service_1 = require("../user/user.service");
let PedidoModule = class PedidoModule {
};
PedidoModule = __decorate([
    (0, common_1.Module)({
        imports: [],
        controllers: [
            pedido_controller_1.PedidoController,
        ],
        providers: [
            pedido_service_1.PedidoService, database_service_1.DatabaseService, user_service_1.UserService
        ],
    })
], PedidoModule);
exports.PedidoModule = PedidoModule;
//# sourceMappingURL=pedido.module.js.map