import { Controller, Get, HttpStatus, Post, Query, Res, UseGuards, Body, Put, Delete, UseFilters, UsePipes, ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/auth/utils/currentUser';
import { ClienteService } from './cliente.service';
import { UsuarioBody } from 'src/tdo/usuarioDTO';
import { Response, query } from 'express';
import { UsuarioSistema, UsuarioSistemaQuery } from 'src/types/types';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { HttpExceptionFilter } from 'src/exception-filter/exception-filter';

@Controller("clientes")
@ApiTags('Clientes')
export class ClienteController {
  constructor(private clienteService: ClienteService) { }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @UseFilters(new HttpExceptionFilter())
  @UsePipes(new ValidationPipe())
  @Post()
  async criarUsuarioSistema(
    @CurrentUser() user: UsuarioBody,
    @Body() body: UsuarioSistema
  ) {
    return await this.clienteService.criarClienteSistema(user, body);
  }

  @UseGuards(JwtAuthGuard)
  @UseFilters(new HttpExceptionFilter())
  @Put()
  async atualizarUsuarioSistema(
    @CurrentUser() user: UsuarioBody,
    @Body() body: UsuarioSistema
  ) {
    return await this.clienteService.atualizarClienteSistema(user, body);
  }
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @UseFilters(new HttpExceptionFilter())
  @Get()
  async listarTodos(
    @CurrentUser() user: UsuarioBody
  ) {
    return await this.clienteService.listarUsuariosSistema(user);
  }
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @UseFilters(new HttpExceptionFilter())
  @Get('cliente')
  async getSingleCliente(
    @CurrentUser() user: UsuarioBody,
    @Query() query: UsuarioSistemaQuery
  ) {
    return await this.clienteService.getSingleUsuariosSistema(user, query.id_hash);
  }
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @UseFilters(new HttpExceptionFilter())
  @Delete()
  async deleteUsuarioSistema(
    @CurrentUser() user: UsuarioBody,
    @Res() response: Response, @Query() query: UsuarioSistemaQuery
  ) {
    try {
      const result = await this.clienteService.deletarUsuarioSistema(user, query.id_hash);
      response.send(result);
    } catch (error) {
      console.error("Erro ao deletar usuários no sistema:", error);
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        message: "Erro ao deletar usuários no sistema"
      });
    }
  }
}
