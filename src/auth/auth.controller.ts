import { Body, Controller, Get, HttpCode, HttpStatus, Inject, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { IsPublic } from './decorators/is-public.decorator';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthRequest } from './models/AuthRequest';
import { Knex } from 'knex';

@Controller()
export class AuthController {

	constructor(private readonly authService: AuthService,
		@Inject('KnexConnection')
		private readonly knexConnection: Knex) { }

	@Post("login")
	@HttpCode(HttpStatus.OK)
	@UseGuards(LocalAuthGuard)
	login(@Request() req: AuthRequest) {
		return this.authService.login(req.user);
		
	}
	@Get('teste')
	async get(){
		return {a: 3}
	}
}
