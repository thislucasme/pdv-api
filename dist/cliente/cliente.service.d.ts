import { Knex } from 'knex';
import { UsuarioBody } from 'src/tdo/usuarioDTO';
import { UsuarioSistema } from 'src/types/types';
import { UserService } from 'src/user/user.service';
export declare class ClienteService {
    private readonly knexConnection;
    private userService;
    constructor(knexConnection: Knex, userService: UserService);
    criarClienteSistema(user: UsuarioBody, body: UsuarioSistema): Promise<UsuarioSistema>;
    atualizarClienteSistema(user: UsuarioBody, body: UsuarioSistema): Promise<UsuarioSistema>;
    deletarUsuarioSistema(user: UsuarioBody, id_hash: string): Promise<{
        success: boolean;
    }>;
    listarUsuariosSistema(user: UsuarioBody): Promise<UsuarioSistema[]>;
    getSingleUsuariosSistema(user: UsuarioBody, id_hash: string): Promise<UsuarioSistema>;
}
