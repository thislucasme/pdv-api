"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChartsModule = void 0;
const database_service_1 = require("../database/database.service");
const charts_controller_1 = require("./charts.controller");
const charts_service_1 = require("./charts.service");
const common_1 = require("@nestjs/common");
const user_service_1 = require("../user/user.service");
let ChartsModule = class ChartsModule {
};
ChartsModule = __decorate([
    (0, common_1.Module)({
        imports: [],
        controllers: [
            charts_controller_1.ChartsController,
        ],
        providers: [
            charts_service_1.ChartsService, database_service_1.DatabaseService, user_service_1.UserService
        ],
    })
], ChartsModule);
exports.ChartsModule = ChartsModule;
//# sourceMappingURL=charts.module.js.map