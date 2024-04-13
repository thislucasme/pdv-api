import { Knex } from 'knex';
import { UsuarioBody } from 'src/tdo/usuarioDTO';
import { QueryPaginationPeriodo } from 'src/types/types';
export declare class PedidoService {
    private readonly knexConnection;
    constructor(knexConnection: Knex);
    getLucroTotal(user: UsuarioBody, query: QueryPaginationPeriodo): Promise<{
        total_produtos: any;
        total_bruto: any;
        lucro: number;
        porcentagem_lucro: number;
    }>;
}
