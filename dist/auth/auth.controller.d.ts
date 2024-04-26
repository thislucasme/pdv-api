import { AuthService } from './auth.service';
import { Knex } from 'knex';
import { UsuarioLogin } from 'src/tdo/usuarioDTO';
import * as jwt from 'jsonwebtoken';
export declare class AuthController {
    private readonly authService;
    private readonly knexConnection;
    constructor(authService: AuthService, knexConnection: Knex);
    login(user: UsuarioLogin): import("./models/UserToken").UserToken;
    decryptToken(req: any): string | jwt.JwtPayload;
}
