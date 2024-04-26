import { Inject, Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { DatabaseService } from 'src/database/database.service';
import { UsuarioBody } from 'src/tdo/usuarioDTO';
import { FormaPagamentoTdo, LucroTotalTdo, LucrosEmVendasTDO, QueryPaginationPeriodo, QueryPaginationProdutos } from 'src/types/types';
import { UserService } from 'src/user/user.service';

@Injectable()
export class ChartsService {
  constructor(
    @Inject('KnexConnection')
    private readonly knexConnection: Knex, private testeKnex: DatabaseService, private userService: UserService) { }

  async getPaymentMethodCounts(user: UsuarioBody, query: FormaPagamentoTdo) {
    try {
      const userQuery = this.knexConnection('users').where('email', '=', user.username);
      const [usuario] = await userQuery;
      //console.log(usuario.uuid)
      const result = await this.knexConnection
        .select(
          this.knexConnection.raw(
            "CONCAT(forma_pagamento, ' - ', CASE forma_pagamento " +
            "WHEN 1 THEN 'dinheiro' " +
            "WHEN 2 THEN 'cartão de débito' " +
            "WHEN 3 THEN 'cartão de crédito' " +
            "ELSE 'Outro' END) AS forma_pagamento_label"
          )
        )
        .count('* as quantidade')
        .from('order')
        .whereNotNull('forma_pagamento')
        .andWhere("userId", usuario.uuid)// Adiciona esta cláusula para excluir valores nulos
        .whereRaw(`DATE(data_venda) >= '${query.startDate}' AND DATE(data_venda) <= '${query.endDate}'`)
        .groupBy('forma_pagamento')
        .orderBy('forma_pagamento');

      // Mapear o resultado para adicionar a propriedade fill com as cores especificadas
      const dados = result.map((item, index) => ({
        ...item,
        fill: ['#ABE16D', '#E16D84', '#926DE1'][index], // Use as cores especificadas
      }));

      return dados;
    } catch (error) {
      // Trate o erro conforme necessário
      console.error('Erro ao obter os métodos de pagamento:', error);
      throw error;
    }
  }

  async getTotals(user: UsuarioBody, query: LucrosEmVendasTDO) {
    try {
      const result = await this.knexConnection.transaction(async (trx) => {
        const userQuery = trx('users').where('email', '=', user.username);
        const [usuario] = await userQuery;
        const totalVendaQuery = trx('pdv_test.order as A')
          .join('produto_order as B', 'B.orderId', '=', 'A.uuid')
          .join('products as C', 'C.uuid', '=', 'B.uid')
          .select(trx.raw("ifnull(sum(C.quantidade * C.preco_venda), 0) as total_venda"))
          .whereRaw(`DATE(A.data_venda) >= '${query.startDate}' AND DATE(A.data_venda) <= '${query.endDate}'`)
          .where('A.userId', '=', usuario.uuid);
        const totalProdutosQuery = trx('products as po')
          .select(trx.raw('SUM(po.quantidade * po.preco_venda) AS total_produtos'))
          .where("po.user_uuid", "=", `${usuario.uuid}`);

        const quantidadeProdutosQuery = trx('products')
          .count('* as quantidade_produtos')
          .where("products.user_uuid", "=", `${usuario.uuid}`);;

        // console.log(totalVendaQuery.toQuery())

        const [totalVendaResult, totalProdutosResult, quantidadeProdutosResult] = await Promise.all([
          totalVendaQuery,
          totalProdutosQuery,
          quantidadeProdutosQuery
        ]);

        const totalVendas: any = totalVendaResult[0];
        const totalProdutos: any = totalProdutosResult[0];
        const quantidadeProduto: any = quantidadeProdutosResult[0];



        return {
          total_venda: totalVendas.total_venda,
          total_produtos: totalProdutos.total_produtos,
          quantidade_produtos: quantidadeProduto.quantidade_produtos
        };
      });

      return result;
    } catch (error) {
      console.log('Erro ao obter os dados:', error);
      throw error;
    }
  }
  async getLucroTotal(user: UsuarioBody, query: LucroTotalTdo) {
    try {
      const result = await this.knexConnection.transaction(async (trx) => {
        const userQuery = trx('users').where('email', '=', user.username);
        const [usuario] = await userQuery;


        const totalProdutosQuery = trx('pdv_test.order as A')
          .join('produto_order as B', 'B.orderId', '=', 'A.uuid')
          .join('products as C', 'C.uuid', '=', 'B.uid')
          .select(trx.raw("ifnull(sum(C.quantidade * C.preco_venda), 0) as total_produtos"))
          .whereRaw(`DATE(A.data_venda) >= '${query.startDate}' AND DATE(A.data_venda) <= '${query.endDate}'`)
          .where('A.userId', '=', `${usuario.uuid}`);

        const totalBrutoQuery = trx('pdv_test.order as A')
          .join('produto_order as B', 'B.orderId', '=', 'A.uuid')
          .join('products as C', 'C.uuid', '=', 'B.uid')
          .select(trx.raw("ifnull(sum(C.quantidade * C.preco_custo), 0) as total_bruto"))
          .whereRaw(`DATE(A.data_venda) >= '${query.startDate}' AND DATE(A.data_venda) <= '${query.endDate}'`)
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
  async getPeriodo(user: UsuarioBody, query: QueryPaginationPeriodo) {
    const { startDate, endDate } = query;
    const userQuery = this.knexConnection('users').where('email', '=', user.username);
    const [usuario] = await userQuery;
  
    const result = await this.knexConnection
      .select(
        this.knexConnection.raw('DATE(data_venda) AS data'),
        this.knexConnection.raw('COUNT(*) AS quantidade_pedidos')
      )
      .from('order')
      .andWhere('userId', usuario.uuid)
      .andWhereBetween('data_venda', [startDate, endDate])
      .groupByRaw('DATE(data_venda)')
      .orderByRaw('DATE(data_venda) ASC');
  
    return result;
  }
  
}
