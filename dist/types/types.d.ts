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
    produtoList?: Product[];
    totalGeral?: number;
    userId?: string | null;
    data_venda?: string | null;
    orderStatus?: number | null;
    forma_pagamento?: number | null;
}
export declare type ConfiguracaoTDO = {
    host: string;
    port: string;
    senha: string;
};
export declare type ConfiguracaoTDOBanco = {
    id: number;
    host: string;
    port: string;
    senha: string;
    usuario: string;
    banco: string;
};
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
export declare class QueryPaginationProdutos {
    page: number;
    limit: number;
    queryText: string;
    codigoBarras: string;
}
export declare class FormaPagamentoTdo {
    startDate: string;
    endDate: string;
}
export interface QueryPaginationPeriodo {
    dias: number;
    startDate: string;
    endDate: string;
}
export declare class LucroTotalTdo {
    startDate: string;
    endDate: string;
}
export declare class LucrosEmVendasTDO {
    startDate: string;
    endDate: string;
}
export interface QueryPaginationPedido {
    page: number;
    limit: number;
    queryText: string;
    codigoBarras: string;
    uuid?: string;
}
export interface UsuarioSistema {
    usuario_uuid: string;
    id_hash?: string | null;
    nome?: string | null;
    cpf?: string | null;
    email?: string | null;
    telefone?: string | null;
    data_nascimento?: string | null;
    rg_ie?: string | null;
    observacao?: string | null;
}
export interface UsuarioSistemaQuery {
    id_hash: string;
}
