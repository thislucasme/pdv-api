import { Inject, Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { DatabaseService } from 'src/database/database.service';
import { UsuarioBody } from 'src/tdo/usuarioDTO';
import { QueryPaginationProdutos } from 'src/types/types';
import { UserService } from 'src/user/user.service';

@Injectable()
export class ChartsService {
    constructor(
        @Inject('KnexConnection')
        private readonly knexConnection: Knex, private testeKnex: DatabaseService, private userService: UserService) { }
    
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
}
