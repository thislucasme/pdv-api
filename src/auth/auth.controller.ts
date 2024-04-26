import { Body, Controller, Get, HttpCode, HttpStatus, Inject, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { IsPublic } from './decorators/is-public.decorator';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthRequest } from './models/AuthRequest';
import { Knex } from 'knex';
import { ApiTags } from '@nestjs/swagger';
import { UsuarioLogin, UsuarioTDO } from 'src/tdo/usuarioDTO';
import * as jwt from 'jsonwebtoken'; 
@Controller()
@ApiTags('login')
export class AuthController {

	constructor(private readonly authService: AuthService,
		@Inject('KnexConnection')
		private readonly knexConnection: Knex) { }

	@Post("login")
	@HttpCode(HttpStatus.OK)
	@UseGuards(LocalAuthGuard)
	login(@Request() user: UsuarioLogin) {
		return this.authService.login(user);

	}
	// Rota para descriptografar e mostrar o conteúdo do token JWT
	@Get("decrypt-token")
	@IsPublic()
	decryptToken(@Request() req) {
		const token = req.headers.authorization.split(' ')[1]; // Extrair o token do cabeçalho 'Authorization'
		const decodedToken = jwt.decode(token); // Decodificar o token JWT
		return decodedToken;
	}
}
