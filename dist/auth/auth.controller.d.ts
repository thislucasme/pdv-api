import { AuthService } from './auth.service';
import { AuthRequest } from './models/AuthRequest';
import { Knex } from 'knex';
export declare class AuthController {
    private readonly authService;
    private readonly knexConnection;
    constructor(authService: AuthService, knexConnection: Knex);
    login(req: AuthRequest): import("./models/UserToken").UserToken;
    get(): Promise<{
        a: number;
    }>;
}
