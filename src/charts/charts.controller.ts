import { Controller, Get, HttpStatus, Query, Res, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/auth/utils/currentUser';
import { UsuarioBody } from 'src/tdo/usuarioDTO';
import { FormaPagamentoTdo, LucroTotalTdo, LucrosEmVendasTDO, QueryPaginationPeriodo, QueryPaginationProdutos } from 'src/types/types';
import { ChartsService } from './charts.service';
import { Response } from 'express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
@Controller("charts")
@ApiTags('Charts')
export class ChartsController {
    constructor(private chartsServico: ChartsService) { }


    @UseGuards(JwtAuthGuard)
    @Get("pagamentos")
    @ApiBearerAuth()
    async getPagamentos(@CurrentUser() user: UsuarioBody, @Query() query: FormaPagamentoTdo, @Res() response: Response) {
        try {
            const result = await this.chartsServico.getPaymentMethodCounts(user, query);
            response.send(result)
            
        } catch (e) {
            console.log(e)
            response.status(HttpStatus.INTERNAL_SERVER_ERROR).send(e);
        }
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Get("total-vendas")
    async getTotals(@CurrentUser() user: UsuarioBody, @Query() query: LucrosEmVendasTDO, @Res() response: Response) {
        try {
            const result = await this.chartsServico.getTotals(user, query);
            response.send(result)
        } catch (e) {
            console.log(e)
            response.status(HttpStatus.INTERNAL_SERVER_ERROR).send(e);
        }
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Get("total-lucro")
    async getLucroTotal(@CurrentUser() user: UsuarioBody, @Query() query: LucroTotalTdo, @Res() response: Response) {
        try {
            const result = await this.chartsServico.getLucroTotal(user, query);
            response.send(result)
        } catch (e) {
            console.log(e)
            response.status(HttpStatus.INTERNAL_SERVER_ERROR).send(e);
        }
        
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Get("vendas")
    async getOcorrencia(@CurrentUser() user: UsuarioBody, @Query() query: QueryPaginationPeriodo, @Res() response: Response) {
      try {
        const result = await this.chartsServico.getPeriodo(user, query);
        response.send(result)
   
      } catch (e) {
        console.log(e)
        response.status(HttpStatus.INTERNAL_SERVER_ERROR).send(e);
      }
    }

}
