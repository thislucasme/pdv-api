import { Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Knex } from 'knex';
import { DatabaseService } from 'src/database/database.service';
import { UsuarioBody } from 'src/tdo/usuarioDTO';
import { UsuarioSistema } from 'src/types/types';
import { UserService } from 'src/user/user.service';
const { v4: uuidv4 } = require('uuid');
@Injectable()
export class ClienteService {
  constructor(
    @Inject('KnexConnection')
    private readonly knexConnection: Knex, private userService: UserService) { }

  async criarClienteSistema(user: UsuarioBody, body: UsuarioSistema) {
    try {
      const userDatabase = await this.userService.findByUser(user.username);
      body.usuario_uuid = userDatabase.uuid;
      body.id_hash = uuidv4();

      await this.knexConnection('usuarios_sistema')
        .insert(body)

      return body;
    } catch (error) {
      console.error("Erro ao criar usuário pedido:", error);
      throw new InternalServerErrorException("Erro ao criar usuário pedido");
    }
  }
  async atualizarClienteSistema(user: UsuarioBody, body: UsuarioSistema) {
    try {
      const userDatabase = await this.userService.findByUser(user.username);
  
      if (!userDatabase) {
        throw new NotFoundException("Usuário não encontrado");
      }
  
      const numUpdated = await this.knexConnection('usuarios_sistema')
        .where({ id_hash: body.id_hash })
        .update(body);
  
      if (numUpdated === 0) {
        throw new NotFoundException("Cliente com o id_hash especificado não encontrado");
      }
  
      return body;
    } catch (error) {
      console.error("Erro ao atualizar usuário no sistema:", error);
      throw error; // Lança a exceção para ser tratada por um manipulador global de exceções
    }
  }
  
  async deletarUsuarioSistema(user: UsuarioBody, id_hash: string) {
    try {
      const userDatabase = await this.userService.findByUser(user.username);

      if (!userDatabase) {
        throw new NotFoundException("Usuário não encontrado");
      }

      const numUpdated = await this.knexConnection('usuarios_sistema')
        .where({ id_hash: id_hash })
        .del();
      
        if (numUpdated === 0) {
          throw new NotFoundException("Cliente com o id_hash especificado não encontrado");
        }

      return { success: true };
    } catch (error) {
      console.error("Erro ao deletar usuário no sistema:", error);
      if (error instanceof NotFoundException) {
        throw error;
      } else {
        throw new InternalServerErrorException("Erro ao deletar usuário no sistema");
      }
    }
  }
  async listarUsuariosSistema(user: UsuarioBody): Promise<UsuarioSistema[]> {
    try {
      const userDatabase = await this.userService.findByUser(user.username);

      if (!userDatabase) {
        throw new NotFoundException("Usuário não encontrado");
      }

      const usuariosSistema = await this.knexConnection('usuarios_sistema')
        .select('*').where("usuario_uuid", "=", userDatabase.uuid);

      return usuariosSistema;
    } catch (error) {
      console.error("Erro ao listar usuários do sistema:", error);
      throw new InternalServerErrorException("Erro ao listar usuários do sistema");
    }
  }
  async getSingleUsuariosSistema(user: UsuarioBody, id_hash: string): Promise<UsuarioSistema> {
    try {
      const userDatabase = await this.userService.findByUser(user.username);

      if (!userDatabase) {
        throw new NotFoundException("Usuário não encontrado");
      }

      const usuariosSistema = await this.knexConnection('usuarios_sistema')
        .select('*').where("usuario_uuid", "=", userDatabase.uuid).andWhere("id_hash", "=", id_hash);

      return usuariosSistema[0];
    } catch (error) {
      console.error("Erro ao listar usuários do sistema:", error);
      throw new InternalServerErrorException("Erro ao listar usuários do sistema");
    }
  }
}
