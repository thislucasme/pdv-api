import { BadRequestException, Body, Controller, Delete, Get, HttpException, HttpStatus, Post, Query, Res, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/auth/utils/currentUser';
import { UsuarioBody } from 'src/tdo/usuarioDTO';
import { ProdutosService } from './produtos.service';
import { Order, QueryPaginationPedido, QueryPaginationPeriodo, QueryPaginationProdutos } from 'src/types/types';
import { Response } from 'express';
@Controller('produtos')
export class ProdutosController {
  constructor(private produtosService: ProdutosService) { }

  @UseGuards(JwtAuthGuard)
  @Get()
  async pagination(@CurrentUser() user: UsuarioBody, @Query() query: QueryPaginationProdutos, @Res() response: Response) {
    console.log(user)
    console.log("===========")
    const result = await this.produtosService.getProducts(user, query);

    try {
      const result = await this.produtosService.getProducts(user, query);
      if (result?.data.length === 0) {
        response.status(HttpStatus.NO_CONTENT).send();
      }
      const customData = {
        page: result.page,
        total: result.total,
      };
     response.setHeader('Custom-Header', JSON.stringify(customData));
      response.send(result.data)
    } catch (e) {
      console.log(e)
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).send(e);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get("periodo")
  async getOcorrencia(@CurrentUser() user: UsuarioBody, @Query() query: QueryPaginationPeriodo, @Res() response: Response) {
    // const result = await this.produtosService.getPeriodo(user, query);
    // console.log(result?.length)

    try {
      const result = await this.produtosService.getPeriodo(user, query);
      if (result?.length === 0) {
        response.status(HttpStatus.NO_CONTENT).send();
      }else{
        const customData = {
          page: result.page,
          total: result.total,
        };
       // response.setHeader('Custom-Header', JSON.stringify(customData));
        response.send(result)
      }
 
    } catch (e) {
      console.log(e)
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).send(e);
    }
  }
  @UseGuards(JwtAuthGuard)
  @Get("pagamentos")
  async getPagamentos(@CurrentUser() user: UsuarioBody, @Query() query: QueryPaginationProdutos, @Res() response: Response) {
    // const result = await this.produtosService.getPeriodo(user, query);
    // console.log(result?.length)
    try {
      const result = await this.produtosService.getPaymentMethodCounts(user, query);
      if (result?.length === 0) {
        response.status(HttpStatus.NO_CONTENT).send();
      }
      response.send(result)
    } catch (e) {
      console.log(e)
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).send(e);
    }
  }
  @UseGuards(JwtAuthGuard)
  @Get("total-vendas")
  async getTotals(@CurrentUser() user: UsuarioBody, @Query() query: QueryPaginationPeriodo, @Res() response: Response) {
    // const result = await this.produtosService.getPeriodo(user, query);
    // console.log(result?.length)
    try {
      const result = await this.produtosService.getTotals(user, query);
      // if (result?.length === 0) {
      //   response.status(HttpStatus.NO_CONTENT).send();
      // }
      response.send(result)
    } catch (e) {
      console.log(e)
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).send(e);
    }
  }

  @Get('test')
  async test(){
    return await this.produtosService.teste();
  }
  @UseGuards(JwtAuthGuard)
  @Get('produto')
  async singleProduct(@CurrentUser() user: UsuarioBody, @Query() query: QueryPaginationProdutos, @Res() response: Response) {
    try {
      const result = await this.produtosService.getProduct(user, query)
      if (Object.keys(result).length === 0) {
        response.status(HttpStatus.NO_CONTENT).send();
      }
      response.send(result)
    } catch (e) {
      response.status(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  @UseGuards(JwtAuthGuard)
  @Get('produtos-pedido')
  async singlePedido(@CurrentUser() user: UsuarioBody, @Query() query: QueryPaginationProdutos, @Res() response: Response) {
    console.clear();
    console.log(query)
    try {
      const result = await this.produtosService.getPedidosProduto(user, query)
      if (Object.keys(result).length === 0) {
        //response.status(HttpStatus.NO_CONTENT).send();
      }
      //ALTERAR AQUI
      const customData = {
        page: 0,
        total: 0,
      };
      response.setHeader('Custom-Header', JSON.stringify(customData));
      response.send(result)
    } catch (e) {
      response.status(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  @UseGuards(JwtAuthGuard)
  @Delete('produtos-pedido')
  async deletePedidoEprodutosByIdProduto(
    @CurrentUser() user: UsuarioBody,
    @Query() query: QueryPaginationPedido,
    @Res() response: Response
  ) {
    console.clear();
    console.log(query);
    try {
      if (!query.uuid) {
        response.status(HttpStatus.BAD_REQUEST).send({
          message: "O parâmetro 'uuid' é obrigatório na consulta."
        });
        return;
      }
      const result = await this.produtosService.deletePedidoByUUID(query.uuid);
      response.send(result);
    } catch (error) {
      console.error("Erro ao excluir pedido:", error);
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        message: "Erro ao excluir pedido. Por favor, tente novamente mais tarde."
      });
    }
  }
  @UseGuards(JwtAuthGuard)
  @Get('contar-pedidossss')
  async contarPedidos(
    @CurrentUser() user: UsuarioBody,
    @Query() query: QueryPaginationPedido,
    @Res() response: Response
  ) {
    try {
      const result = await this.produtosService.contarPedido(user);
      response.send(result);
    } catch (error) {
      console.error("Erro ao contar pedidos:", error);
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        message: "Erro ao contar pedidos. Por favor, tente novamente mais tarde."
      });
    }
  }
  
  @UseGuards(JwtAuthGuard)
  @Post('pedido')
  async savePedido(@CurrentUser() user: UsuarioBody, @Body() body: Order, @Res() response: Response) {
    try {
      console.clear();
      console.log(body)
      const result = await this.produtosService.savePedido(user, body);
   
      if (Object.keys(result).length === 0) {
        response.status(HttpStatus.NO_CONTENT).send();
      } else {
        response.send(result);
      }
    } catch (error) {
      console.error("Erro no endpoint /pedido:", error);
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ message: "Erro interno no servidor" });
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('pedidos')
  async paginationPedido(@CurrentUser() user: UsuarioBody, @Query() query: QueryPaginationProdutos, @Res() response: Response) {
    
    try {
      const result = await this.produtosService.getPedidos(user, query);
      if (result?.data.length === 0) {
        response.status(HttpStatus.NO_CONTENT).send();
        return;
      }
      const customData = {
        page: result.page,
        total: result.total,
      };
      response.setHeader('Custom-Header', JSON.stringify(customData));
      response.send(result.data)
    } catch (e) {
      console.log(e)
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).send(e);
    }
    
  }
  
}
