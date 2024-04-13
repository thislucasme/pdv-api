import { Strategy } from 'passport-jwt';
import { UserPayload } from 'src/auth/models/UserPayload';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    constructor();
    validate(payload: UserPayload): Promise<{
        userId: number;
        username: string;
        name: string;
    }>;
}
export {};
