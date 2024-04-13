
import { Inject, Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { UsuarioBody } from 'src/tdo/usuarioDTO';
import { QueryPaginationPeriodo, QueryPaginationProdutos } from 'src/types/types';

@Injectable()
export class PedidoService {
    constructor(@Inject('KnexConnection')
    private readonly knexConnection: Knex) {

    }
    async getLucroTotal(user: UsuarioBody, query: QueryPaginationPeriodo) {
        console.clear()
        console.log(query, user)
        try {
            const result = await this.knexConnection.transaction(async (trx) => {

                const userQuery = trx('users').where('email', '=', user.username);
                const [usuario] = await userQuery;
                console.log(query)

                const totalProdutosQuery = trx('pdv_test.order as A')
                    .join('produto_order as B', 'B.orderId', '=', 'A.uuid')
                    .join('products as C', 'C.uuid', '=', 'B.uid')
                    .select(trx.raw("ifnull(sum(C.quantidade * C.preco_venda), 0) as total_produtos"))
                    .whereRaw(`DATE(A.data_venda) >= '${query.startDate}' AND DATE(A.data_venda) <= ''${query.endDate}''`)
                    .where('A.userId', '=', `${usuario.uuid}`);

                const totalBrutoQuery = trx('pdv_test.order as A')
                    .join('produto_order as B', 'B.orderId', '=', 'A.uuid')
                    .join('products as C', 'C.uuid', '=', 'B.uid')
                    .select(trx.raw("ifnull(sum(C.quantidade * C.preco_custo), 0) as total_bruto"))
                    .whereRaw(`DATE(A.data_venda) >= '${query.startDate}' AND DATE(A.data_venda) <= ''${query.endDate}''`)
                    .where('A.userId', '=', `${usuario.uuid}`);


                const [totalProdutosResult, totalBrutoResult] = await Promise.all([
                    totalProdutosQuery,
                    totalBrutoQuery
                ]);

                const totalProdutos: any = totalProdutosResult[0];
                const totalBruto: any = totalBrutoResult[0];

                const lucro: number = Number(totalProdutos) - Number(totalBruto);

                return {
                    total_produtos: totalProdutos.total_produtos,
                    total_bruto: totalBruto.total_bruto,
                    lucro: Number(totalProdutos.total_produtos) - Number(totalBruto.total_bruto),
                    porcentagem_lucro: ((Number(totalProdutos.total_produtos) - Number(totalBruto.total_bruto)) / Number(totalBruto.total_bruto)) * 100
                };
            });

            return result;
        } catch (error) {
            console.log('Erro ao obter os dados:', error);
            throw error;
        }
    }

}
