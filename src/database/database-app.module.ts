import { Module, Global } from '@nestjs/common';
import Knex from 'knex';

const knexProvider = {
  provide: 'KnexConnection',
  useFactory: async () => {
    const connection = Knex({
      client: 'mysql2',
      connection: {
        host: 'pdv-teste.mysql.uhserver.com',
        user: 'usuarioremoto',
        password: 'aEVV9ZvuzRb!MCy@',
        database: 'pdv_teste',
        port: 3306
    },
    });
    return connection;
  },
};
@Global()
@Module({
    imports: [],
    controllers: [],
    providers: [knexProvider],
    exports: [knexProvider]
})
export class DatabaseAppModule {}
