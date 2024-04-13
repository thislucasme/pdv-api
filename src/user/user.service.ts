

import { Inject, Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { UsuarioTDO } from 'src/auth/tdo/usuarioDTO';
import { SiteSuccessDatabaseService } from 'src/database/site-success-database.service';


@Injectable()
export class UserService {
	constructor(
		@Inject('KnexConnection')
		private readonly knexConnection: Knex) { }

	async findUserByUser(usernName: string, senha: string): Promise<UsuarioTDO> {

		const dadosUsuario = await this.knexConnection.select("*").from("users").where("email", "=", usernName).andWhere("senha", "=", senha).limit(1);

		const user: UsuarioTDO = {
			name: dadosUsuario[0]?.name,
			email: dadosUsuario[0]?.email,
			id: dadosUsuario[0]?.id,
			uuid: dadosUsuario[0].uuid,
			senha: ''
		}
		return user;
	}

	async findByUser(username: string) {
		console.log(username, "antes")
		const usuario = await this.knexConnection.select("*")
			.from("users").where("email", "=", username)
			.limit(1);
		return usuario[0];

	}

}


