import { ApiProperty } from "@nestjs/swagger"

export class UsuarioTDO {
	name: string;
	@ApiProperty(
		{
		  description: 'Email'
		}
	  )
	email: string;
	id: number;
	@ApiProperty(
		{
		  description: 'senha'
		}
	  )
	senha: string;
	uuid: string;
}
export class UsuarioLogin {
	name: string;
	@ApiProperty({ description: 'Email do usuário' })
	email: string;
	@ApiProperty({ description: 'Email do usuário' })
	senha: string;
}
export type UsuarioCredenciais = {
	nome: string,
	user: string,
	id: number,
	senha: string
}

export type UsuarioBody = {
	userId: string,
	username: string,
	name: number,
	uuid: string
}