import { ClienteService } from './cliente.service';
import { UsuarioBody } from 'src/tdo/usuarioDTO';
import { Response } from 'express';
import { UsuarioSistema, UsuarioSistemaQuery } from 'src/types/types';
export declare class ClienteController {
    private clienteService;
    constructor(clienteService: ClienteService);
    criarUsuarioSistema(user: UsuarioBody, response: Response, body: UsuarioSistema): Promise<void>;
    atualizarUsuarioSistema(user: UsuarioBody, response: Response, body: UsuarioSistema): Promise<void>;
    listarTodos(user: UsuarioBody, response: Response): Promise<void>;
    getSingleCliente(user: UsuarioBody, response: Response, query: UsuarioSistemaQuery): Promise<void>;
    deleteUsuarioSistema(user: UsuarioBody, response: Response, query: UsuarioSistemaQuery): Promise<void>;
}
