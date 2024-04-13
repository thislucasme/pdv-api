import { Knex } from 'knex';
import { DatabaseService } from 'src/database/database.service';
import { UsuarioBody } from 'src/tdo/usuarioDTO';
import { Order, QueryPaginationPedido, QueryPaginationPeriodo, QueryPaginationProdutos } from 'src/types/types';
import { UserService } from 'src/user/user.service';
export declare class ProdutosService {
    private readonly knexConnection;
    private testeKnex;
    private userService;
    constructor(knexConnection: Knex, testeKnex: DatabaseService, userService: UserService);
    teste(): Promise<any[]>;
    getProducts(user: UsuarioBody, query: QueryPaginationProdutos): Promise<{
        data: any[];
        total: string | number;
        page: number;
    }>;
    getPedidos(user: UsuarioBody, query: QueryPaginationProdutos): Promise<{
        data: any[];
        total: string | number;
        page: number;
    }>;
    getProduct(user: UsuarioBody, query: QueryPaginationProdutos): Promise<any>;
    getPedidosProduto(user: UsuarioBody, query: QueryPaginationPedido): Promise<any[]>;
    savePedido(user: UsuarioBody, query: Order): Promise<{
        identificador: number;
        observacao: string;
        acrescimo: number;
        desconto: number;
        quantidadeProdutosPedido: number;
        ultimoValorProduto: number;
        ultimoNomeProduto: string;
        userId: string;
        uuid: any;
        totalGeral: number;
        data_venda: string;
        order_status: number;
        forma_pagamento: number;
    }>;
    deletePedidoByUUID(uuid: string): Promise<{
        success: boolean;
        message: string;
    }>;
    getPeriodo(user: UsuarioBody, query: QueryPaginationPeriodo): Promise<any>;
    getTotals(user: UsuarioBody, query: QueryPaginationPeriodo): Promise<{
        total_venda: any;
        total_produtos: any;
        quantidade_produtos: any;
    }>;
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
    contarPedido(user: UsuarioBody): Promise<{
        success: boolean;
        quantidade: string | number;
    }>;
}
