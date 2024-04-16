import { AuthService } from './auth.service';
import { Knex } from 'knex';
import { UsuarioLogin } from 'src/tdo/usuarioDTO';
export declare class AuthController {
    private readonly authService;
    private readonly knexConnection;
    constructor(authService: AuthService, knexConnection: Knex);
    login(user: UsuarioLogin): import("./models/UserToken").UserToken;
}
