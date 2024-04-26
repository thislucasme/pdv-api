import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';


import { UserPayload } from './models/UserPayload';
import { UserToken } from './models/UserToken';
import { UserService } from 'src/user/user.service';
import { UsuarioTDO } from './tdo/usuarioDTO';
import { use } from 'passport';

@Injectable()
export class AuthService {

	constructor(
		private readonly userService: UserService,
		private readonly jwtService: JwtService
	) { }

	login(user: any): UserToken {
		console.log(user.user)
		//transforma o user em um JWT
		const payload: UserPayload = {
			sub: user.user.id,
			email: user.user.email,
			name: user.user.name,
			uuid: user.user.uuid
		};
	
		const jwtToken = this.jwtService.sign(payload);
		return {
			acess_token: jwtToken,
			isAdm: false
		}
	}

	async validateUser(email: string, password: string) {

		const user = await this.userService.findByUser(email);
		if (user) {
			//checar se a senha irformada corresponde a hash que está no banco
			const isPasswordValid = password === user.senha;
			if (isPasswordValid) {
				return {
					...user,
					senha: undefined
				}
			}
		}
		// Se chegar aqui, significa que não encontrou um user e/ou senha não corresponde
		throw new Error('Usuário ou senhas não correspondem');
	}
}
