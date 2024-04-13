import { JwtService } from '@nestjs/jwt';
import { UserToken } from './models/UserToken';
import { UserService } from 'src/user/user.service';
export declare class AuthService {
    private readonly userService;
    private readonly jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    login(user: any): UserToken;
    validateUser(email: string, password: string): Promise<any>;
}
