import { DatabaseService } from 'src/database/database.service';
import { ProdutosController } from './produtos.controller';
import { ProdutosService } from './produtos.service';
import { Module } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Module({
    imports: [],
    controllers: [
        ProdutosController,],
    providers: [
        ProdutosService, DatabaseService, UserService],
})
export class ProdutosModule { }
