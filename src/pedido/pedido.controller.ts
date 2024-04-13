import { Controller, Get, HttpStatus, Query, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/auth/utils/currentUser';
import { UsuarioBody } from 'src/tdo/usuarioDTO';
import { QueryPaginationPeriodo, QueryPaginationProdutos } from 'src/types/types';
import { PedidoService } from './pedido.service';

@Controller("pedido")
export class PedidoController {
    constructor(private pedidoService:PedidoService){}
    @UseGuards(JwtAuthGuard)
    @Get("total-lucro")
    async getTotals(@CurrentUser() user: UsuarioBody, @Query() query: QueryPaginationPeriodo, @Res() response: Response) {
      // const result = await this.produtosService.getPeriodo(user, query);
      // console.log(result?.length)
      console.log(user)
      try {
        const result = await this.pedidoService.getLucroTotal(user, query);
        // if (result?.length === 0) {
        //   response.status(HttpStatus.NO_CONTENT).send();
        // }
        response.send(result)
      } catch (e) {
        console.log(e)
        response.status(HttpStatus.INTERNAL_SERVER_ERROR).send(e);
      }
    }
}
