import { Body, Controller, Get, HttpCode, HttpStatus, Inject, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { IsPublic } from './decorators/is-public.decorator';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthRequest } from './models/AuthRequest';
import { Knex } from 'knex';
import { ApiTags } from '@nestjs/swagger';
import { UsuarioLogin, UsuarioTDO } from 'src/tdo/usuarioDTO';

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
}
