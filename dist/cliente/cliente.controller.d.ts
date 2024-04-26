import { ClienteService } from './cliente.service';
import { UsuarioBody } from 'src/tdo/usuarioDTO';
import { Response } from 'express';
import { UsuarioSistema, UsuarioSistemaQuery } from 'src/types/types';
export declare class ClienteController {
    private clienteService;
    constructor(clienteService: ClienteService);
    criarUsuarioSistema(user: UsuarioBody, body: UsuarioSistema): Promise<UsuarioSistema>;
    atualizarUsuarioSistema(user: UsuarioBody, body: UsuarioSistema): Promise<UsuarioSistema>;
    listarTodos(user: UsuarioBody): Promise<UsuarioSistema[]>;
    getSingleCliente(user: UsuarioBody, response: Response, query: UsuarioSistemaQuery): Promise<void>;
    deleteUsuarioSistema(user: UsuarioBody, response: Response, query: UsuarioSistemaQuery): Promise<void>;
}
