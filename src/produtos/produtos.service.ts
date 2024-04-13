import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { Knex } from 'knex';
import { DatabaseService } from 'src/database/database.service';
import { UsuarioBody } from 'src/tdo/usuarioDTO';
import { Order, QueryPaginationPedido, QueryPaginationPeriodo, QueryPaginationProdutos } from 'src/types/types';
import { UserService } from 'src/user/user.service';
const { v4: uuidv4 } = require('uuid');

@Injectable()
export class ProdutosService {
  constructor(
    @Inject('KnexConnection')
    private readonly knexConnection: Knex, private testeKnex: DatabaseService, private userService: UserService) { }

  async teste() {
    return this.knexConnection
      .select().from('products')
  }
  async getProducts(user: UsuarioBody, query: QueryPaginationProdutos) {
    const queryProdutos = this.knexConnection
      .select().from('products')
      .where('users_id', '=', user?.userId)
    if (query?.queryText) {
      queryProdutos.andWhere('descricao', 'like', `%${query.queryText}%`)
    }
    if (query?.codigoBarras) {
      queryProdutos.andWhere('codigo_barras', '=', `${query.codigoBarras}`)
    }
    const clonedQuery = queryProdutos.clone();
    //console.log(query.toQuery())
    const totalQuery = this.knexConnection.count('* as total').from(clonedQuery.as('subquery')).as('count');


    queryProdutos.limit(query?.limit).offset((query?.page - 1) * query?.limit)

    const [result, total] = await Promise.all([
      queryProdutos,
      totalQuery
    ]);
    const totalCount = total[0].total;
    //await this.knexConnection.destroy();

    return {
      data: result,
      total: totalCount,
      page: Number(query?.page)
    };
  }

  async getPedidos(user: UsuarioBody, query: QueryPaginationProdutos) {
    const userDatabase = await this.userService.findByUser(user.username);
    console.clear()
    console.log(userDatabase)
    const queryPedidos = this.knexConnection
      .select().from('order')
      .where('userId', '=', userDatabase?.uuid)
    // if (query?.queryText) {
    //   queryPedidos.andWhere('descricao', 'like', `%${query.queryText}%`)
    // }
    // if (query?.codigoBarras) {
    //   queryPedidos.andWhere('codigo_barras', '=', `${query.codigoBarras}`)
    // }
    const clonedQuery = queryPedidos.clone();
    //console.log(query.toQuery())
    const totalQuery = this.knexConnection.count('* as total').from(clonedQuery.as('subquery')).as('count');


    queryPedidos.limit(query?.limit).offset((query?.page - 1) * query?.limit)

    const [result, total] = await Promise.all([
      queryPedidos,
      totalQuery
    ]);
    const totalCount = total[0].total;
    //await this.knexConnection.destroy();

    return {
      data: result,
      total: totalCount,
      page: Number(query?.page)
    };
  }
  async getProduct(user: UsuarioBody, query: QueryPaginationProdutos) {
    const queryProdutos = this.knexConnection
      .select().from('products')
      .where('users_id', '=', user?.userId).limit(1)
    queryProdutos.andWhere('codigo_barras', '=', `${query.codigoBarras}`)
    const result = await queryProdutos;

    return {
      ...result[0]
    };
  }
  async getPedidosProduto(user: UsuarioBody, query: QueryPaginationPedido) {
    // const userDatabase = await this.userService.findByUser(user.username);UsuarioBody


    const queryProdutos = this.knexConnection
      .select('A.*', 'A.quantidade as estoque', 'B.id as B_id', 'B.categorias_id', 'B.promocao_id', 'B.estoque as B_estoque', 'B.codigo_barras', 'B.controlar_estoque', 'B.venda_fracionada', 'B.valor_aberto', 'B.fornecedores_id', 'B.descricao', 'B.url_image', 'B.preco_custo', 'B.preco_venda', 'B.uuid as uuid', 'B.user_uuid as user_uuid')
      .from('produto_order as A')
      .join('products as B', 'A.uid', 'B.uuid')
      .where('A.orderId', query.uuid);

    const result = await queryProdutos;

    return result;
  }
  // async savePedido(user: UsuarioBody, query: Order) {
  //   const queryProdutos = this.knexConnection
  //     .select().from('products')
  //     .where('users_id', '=', user?.userId).limit(1)
  //   queryProdutos.andWhere('codigo_barras', '=', `${query.codigoBarras}`)
  //   const result = await queryProdutos;

  //   return {
  //     ...result[0]
  //   };
  // }

  async savePedido(user: UsuarioBody, query: Order) {


    try {
      // Passo 1: Inserir o Pedido na Tabela 'order'
      const orderData = {
        identificador: query.identificador,
        observacao: query.observacao,
        acrescimo: query.acrescimo,
        desconto: query.desconto,
        quantidadeProdutosPedido: query.quantidadeProdutosPedido,
        ultimoValorProduto: query.ultimoValorProduto,
        ultimoNomeProduto: query.ultimoNomeProduto,
        userId: query.userId, // Use o userId do usuário passado
        uuid: uuidv4(), // Gere um novo UUID para o pedido
        totalGeral: query.totalGeral,
        data_venda: query.data_venda,
        order_status: query.orderStatus,
        forma_pagamento: query.forma_pagamento
      };

      await this.knexConnection('order').insert(orderData);

      // Passo 2: Inserir os Produtos na Tabela 'produto_order'
      const orderId = orderData.uuid; // Use o UUID gerado para o pedido

      for (const produto of query.produtoList || []) {
        const produtoData = {
          uid: produto.uuid,
          orderId: orderId,
          observacao: produto.observacao,
          users_id: produto.users_id,
          quantidade: produto.estoque
        };

        await this.knexConnection('produto_order').insert(produtoData);
      }

      // Retorne os dados do pedido (opcional)
      return orderData;
    } catch (error) {
      console.error("Erro ao salvar pedido:", error);
      throw new InternalServerErrorException("Erro ao salvar pedido");
    }
  }

  async deletePedidoByUUID(uuid: string) {
    const trx = await this.knexConnection.transaction();

    try {
      // Passo 1: Excluir os produtos associados ao pedido da tabela 'produto_order'
      await trx('produto_order').where('orderId', uuid).del();

      // Passo 2: Excluir o pedido da tabela 'order'
      await trx('order').where('uuid', uuid).del();

      // Commit da transação se tudo ocorrer sem erros
      await trx.commit();

      return { success: true, message: "Pedido excluído com sucesso." };
    } catch (error) {
      // Em caso de erro, desfaz a transação
      await trx.rollback();
      console.error("Erro ao excluir pedido:", error);
      throw new InternalServerErrorException("Erro ao excluir pedido. Por favor, tente novamente mais tarde.");
    }
  }
  async getPeriodo(user: UsuarioBody, query: QueryPaginationPeriodo) {
    const result = await this.knexConnection
      .select()
      .from('order')
      .select(this.knexConnection.raw('DATE_FORMAT(data_venda, "%d-%m-%Y") AS data'))
      .count('* as quantidade_pedidos')
      .where('data_venda', '>=', this.knexConnection.raw(`DATE_SUB(CURDATE(), INTERVAL ${query.dias} DAY)`))
      .groupBy(this.knexConnection.raw('DATE(data_venda), data_venda'))
      .orderBy('data_venda', 'asc'); // Ordenar da menor data para a maior

    return result;
  }
  async getTotals(user: UsuarioBody, query: QueryPaginationPeriodo) {
    try {
      const result = await this.knexConnection.transaction(async (trx) => {        
        const userQuery = trx('users').where('email', '=', user.username);
        const [usuario] = await userQuery;
        console.log(query)
        const totalVendaQuery = trx('pdv_test.order as A')
        .join('produto_order as B', 'B.orderId', '=', 'A.uuid')
        .join('products as C', 'C.uuid', '=', 'B.uid')
        .select(trx.raw("ifnull(sum(C.quantidade * C.preco_venda), 0) as total_venda"))
        .whereRaw(`DATE(A.data_venda) >= '${query.startDate}' AND DATE(A.data_venda) <= '${query.endDate}'`)
        .where('A.userId', '=', usuario.uuid);

          console.log(totalVendaQuery.toQuery())

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


  async getPaymentMethodCounts(user: UsuarioBody, query: QueryPaginationProdutos) {
    try {
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
        .whereNotNull('forma_pagamento') // Adiciona esta cláusula para excluir valores nulos
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




  async contarPedido(user: UsuarioBody) {
    try {
      const userDatabase = await this.userService.findByUser(user.username);

      // Consulta SQL para contar o número de pedidos associados ao usuário
      const quantidadePedidos = await this.knexConnection('order')
        .where('userId', userDatabase.uuid) // Filtra pelo userId
        .count(); // Conta o número de registros


      return { success: true, quantidade: quantidadePedidos[0]['count(*)'] };
    } catch (error) {
      console.error("Erro ao contar pedidos:", error);
      throw new InternalServerErrorException("Erro ao contar pedidos. Por favor, tente novamente mais tarde.");
    }
  }


}
