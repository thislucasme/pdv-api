import { Controller, Get, HttpStatus, Query, Res, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/auth/utils/currentUser';
import { UsuarioBody } from 'src/tdo/usuarioDTO';
import { QueryPaginationProdutos } from 'src/types/types';
import { ChartsService } from './charts.service';
import { Response } from 'express';
@Controller("charts")
export class ChartsController {
    constructor(private chartsServico: ChartsService) { }
    @UseGuards(JwtAuthGuard)
    @Get("pagamentos")
    async getPagamentos(@CurrentUser() user: UsuarioBody, @Query() query: QueryPaginationProdutos, @Res() response: Response) {
        // const result = await this.produtosService.getPeriodo(user, query);
        // console.log(result?.length)
        try {
            const result = await this.chartsServico.getPaymentMethodCounts(user, query);
            if (result?.length === 0) {
                response.status(HttpStatus.NO_CONTENT).send();
            }
            response.send(result)
        } catch (e) {
            console.log(e)
            response.status(HttpStatus.INTERNAL_SERVER_ERROR).send(e);
        }
    }
}
