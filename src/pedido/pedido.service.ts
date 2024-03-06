
import { Inject, Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { UsuarioBody } from 'src/tdo/usuarioDTO';
import { QueryPaginationProdutos } from 'src/types/types';

@Injectable()
export class PedidoService {
    constructor(@Inject('KnexConnection')
    private readonly knexConnection: Knex){

    }
    async getLucroTotal(user: UsuarioBody, query: QueryPaginationProdutos) {
        try {
            const result = await this.knexConnection.transaction(async (trx) => {
                const totalProdutosQuery = trx('products as po')
                    .select(trx.raw('SUM(po.quantidade * po.preco_venda) AS total_produtos'));
    
                const totalBrutoQuery = trx('products as po')
                    .select(trx.raw('SUM(po.quantidade * po.preco_custo) AS total_bruto'));
    
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
