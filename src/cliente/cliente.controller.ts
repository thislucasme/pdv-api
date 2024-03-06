import { Controller, Get, HttpStatus, Post, Query, Res, UseGuards, Body, Put, Delete } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/auth/utils/currentUser';
import { ClienteService } from './cliente.service';
import { UsuarioBody } from 'src/tdo/usuarioDTO';
import { Response, query } from 'express';
import { UsuarioSistema, UsuarioSistemaQuery } from 'src/types/types';

@Controller("clientes")
export class ClienteController {
    constructor(private clienteService: ClienteService) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    async criarUsuarioSistema(
      @CurrentUser() user: UsuarioBody,
      @Res() response: Response, @Body() body: UsuarioSistema
    ) {
      try {
        const result = await this.clienteService.criarClienteSistema(user, body);
        response.send(result);
      } catch (error) {
        console.error("Erro ao criar usuário no sistema:", error);
        response.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
          message: "Erro ao criar usuário no sistema"
        });
      }
    }
    
    @UseGuards(JwtAuthGuard)
    @Put()
    async atualizarUsuarioSistema(
      @CurrentUser() user: UsuarioBody,
      @Res() response: Response, @Body() body: UsuarioSistema
    ) {
      try {
        const result = await this.clienteService.atualizarClienteSistema(user, body);
        response.send(result);
      } catch (error) {
        console.error("Erro ao atualizar usuário no sistema:", error);
        response.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
          message: "Erro ao atualizar usuário no sistema"
        });
      }
    }
    @UseGuards(JwtAuthGuard)
    @Get()
    async listarTodos(
      @CurrentUser() user: UsuarioBody,
      @Res() response: Response
    ) {
      try {
        const result = await this.clienteService.listarUsuariosSistema(user);
        response.send(result);
      } catch (error) {
        console.error("Erro ao buscar usuários no sistema:", error);
        response.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
          message: "Erro ao buscar usuários no sistema"
        });
      }
    }
    @UseGuards(JwtAuthGuard)
    @Get('cliente')
    async getSingleCliente(
      @CurrentUser() user: UsuarioBody,
      @Res() response: Response, @Query() query: UsuarioSistemaQuery
    ) {
      console.log(query)
      try {
        const result = await this.clienteService.getSingleUsuariosSistema(user, query.id_hash);
        response.send(result);
      } catch (error) {
        console.error("Erro ao buscar usuario no sistema:", error);
        response.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
          message: "Erro ao buscar usuario no sistema"
        });
      }
    }
    @UseGuards(JwtAuthGuard)
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
