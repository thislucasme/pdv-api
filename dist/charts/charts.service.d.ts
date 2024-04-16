import { Knex } from 'knex';
import { DatabaseService } from 'src/database/database.service';
import { UsuarioBody } from 'src/tdo/usuarioDTO';
import { QueryPaginationProdutos } from 'src/types/types';
import { UserService } from 'src/user/user.service';
export declare class ChartsService {
    private readonly knexConnection;
    private testeKnex;
    private userService;
    constructor(knexConnection: Knex, testeKnex: DatabaseService, userService: UserService);
    getPaymentMethodCounts(user: UsuarioBody, query: QueryPaginationProdutos): Promise<{
        fill: string;
        timeout: any;
        wrap: any;
        toSQL: any;
        queryContext: any;
        addListener: any;
        on: any;
        once: any;
        removeListener: any;
        off: any;
        removeAllListeners: any;
        setMaxListeners: any;
        getMaxListeners: any;
        listeners: any;
        rawListeners: any;
        emit: any;
        listenerCount: any;
        prependListener: any;
        prependOnceListener: any;
        eventNames: any;
        generateDdlCommands: any;
        toQuery: any;
        options: any;
        connection: any;
        debug: any;
        transacting: any;
        stream: any;
        pipe: any;
        asCallback: any;
        then: any;
        catch: any;
        finally: any;
        [Symbol.toStringTag]: any;
    }[]>;
}
