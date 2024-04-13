import { Module, Global } from '@nestjs/common';
import Knex from 'knex';

const knexProvider = {
  provide: 'KnexConnection',
  useFactory: async () => {
    const connection = Knex({
      client: 'mysql2',
      connection: {
        host: '127.0.0.1',
        user: 'root',
        password: '14209826',
        database: 'pdv_test',
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
