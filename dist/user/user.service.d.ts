import { Knex } from 'knex';
import { UsuarioTDO } from 'src/auth/tdo/usuarioDTO';
export declare class UserService {
    private readonly knexConnection;
    constructor(knexConnection: Knex);
    findUserByUser(usernName: string, senha: string): Promise<UsuarioTDO>;
    findByUser(username: string): Promise<any>;
}
