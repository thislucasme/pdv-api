import { DatabaseService } from 'src/database/database.service';
import { PedidoController } from './pedido.controller';
import { PedidoService } from './pedido.service';


import { Module } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Module({
    imports: [],
    controllers: [
        PedidoController,],
    providers: [
        PedidoService, DatabaseService, UserService],
})
export class PedidoModule { }
