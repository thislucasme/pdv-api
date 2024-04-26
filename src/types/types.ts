import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEmpty, IsNotEmpty, isNotEmpty } from "class-validator";

export interface Product {
  id: number;
  categorias_id?: number | null;
  promocao_id?: number | null;
  estoque?: number | null;
  codigo_barras?: string | null;
  observacao?: string | null;
  controlar_estoque?: number | null;
  venda_fracionada?: number | null;
  valor_aberto?: number | null;
  fornecedores_id?: number | null;
  users_id?: number | null;
  descricao?: string | null;
  url_image?: string | null;
  preco_custo?: number | null;
  preco_venda?: number | null;
  quantidade?: number | null;
  uuid?: string | null;

}
export interface Order {
  identificador?: number | null;
  observacao?: string | null;
  acrescimo?: number;
  desconto?: number;
  quantidadeProdutosPedido?: number;
  ultimoValorProduto?: number;
  ultimoNomeProduto?: string | null;
  produtoList?: Product[]; // Certifique-se de criar o tipo 'Produto' se ainda não existir
  totalGeral?: number;
  userId?: string | null;
  data_venda?: string | null;
  orderStatus?: number | null;
  forma_pagamento?: number | null;
}

export type ConfiguracaoTDO = {
  host: string,
  port: string,
  senha: string
}
export type ConfiguracaoTDOBanco = {
  id: number,
  host: string,
  port: string,
  senha: string,
  usuario: string,
  banco: string
}
export interface Modcon {
  contrato: number;
  nomecli: string;
  cidacli: string;
}
export interface ControleProcessos {
  id: number;
  baixar: number;
  enviar_erro_log: number;
  enviar_conciliacao: number;
  enviar_rejeicao_fiscal: number;
  receber_msgs: number;
  enviar_boletos: number;
  status: number;
  cobraca: number;
  tipo_atualizacao: number;
}
export interface OptionData {
  label: string;
  value: string;
}

export class QueryPaginationProdutos {

  @ApiProperty()
  page: number;
  @ApiProperty()
  limit: number;
  @ApiProperty()
  queryText: string;
  @ApiProperty()
  codigoBarras: string;
}
export class FormaPagamentoTdo {
  @ApiProperty(
    {
      description: 'Data inicial',
      default: "2023-01-13",
    }
  )
  startDate: string;
  @ApiProperty(
    {
      description: 'Data final',
      default: "2023-01-13",
    }
  )
  @ApiProperty()
  endDate: string;
}
export interface QueryPaginationPeriodo {

  dias: number;
  startDate: string;
  endDate: string
}
export class LucroTotalTdo {
  @ApiProperty(
    {
      description: 'Data inicial',
      default: "2023-01-13",
    }
  )
  startDate: string;
  @ApiProperty(
    {
      description: 'Data final',
      default: "2024-01-13",
    }
  )
  endDate: string;
}
export class LucrosEmVendasTDO {
  @ApiProperty(
    {
      description: 'Data inicial',
      default: "2023-09-13",
    }
  )
  startDate: string;
  @ApiProperty(
    {
      description: 'Data final',
      default: "2024-12-01",
    }
  )
  @ApiProperty()
  endDate: string;
}


export interface QueryPaginationPedido {
  page: number;
  limit: number;
  queryText: string;
  codigoBarras: string;
  uuid?: string;
}
export class UsuarioSistema {
 
  usuario_uuid: string | null;
  id_hash: string | null;
  @ApiProperty(
    {
      description: 'Nome',
      default: "Marcelo",
    }
  )
  @IsNotEmpty()
  nome: string | null;
  @ApiProperty(
    {
      description: 'CPF',
      default: "00000000000",
    }
  )
  @IsNotEmpty()
  cpf: string | null;
  @ApiProperty(
    {
      description: 'Email',
      default: "email@gmail.com",

    }
  )
  
  email: string | null;
  @ApiProperty(
    {
      description: 'Telefone',
      default: "0000000000",
    }
  )
  telefone: string | null;
  @ApiProperty(
    {
      description: 'Nascimento',
      default: "1999-09-13",
    }
  )
  data_nascimento: string | null;
  @ApiProperty(
    {
      description: 'RG',
      default: "GD000000",
    }
  )
  rg_ie: string | null;
  @ApiProperty(
    {
      description: 'Nascimento',
      default: "",
    }
  )
  observacao: string | null;
}
export class UsuarioSistemaQuery {
  @ApiProperty(
    {
      description: 'Id do Cliente',
      default: "ebe10e4d-5df7-4071-b90e-aeaf401ccdd7",
    }
  )
  id_hash: string;
}
