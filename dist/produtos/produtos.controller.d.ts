import { UsuarioBody } from 'src/tdo/usuarioDTO';
import { ProdutosService } from './produtos.service';
import { Order, QueryPaginationPedido, QueryPaginationPeriodo, QueryPaginationProdutos } from 'src/types/types';
import { Response } from 'express';
export declare class ProdutosController {
    private produtosService;
    constructor(produtosService: ProdutosService);
    pagination(user: UsuarioBody, query: QueryPaginationProdutos, response: Response): Promise<void>;
    getOcorrencia(user: UsuarioBody, query: QueryPaginationPeriodo, response: Response): Promise<void>;
    getPagamentos(user: UsuarioBody, query: QueryPaginationProdutos, response: Response): Promise<void>;
    getTotals(user: UsuarioBody, query: QueryPaginationPeriodo, response: Response): Promise<void>;
    test(): Promise<any[]>;
    singleProduct(user: UsuarioBody, query: QueryPaginationProdutos, response: Response): Promise<void>;
    singlePedido(user: UsuarioBody, query: QueryPaginationProdutos, response: Response): Promise<void>;
    deletePedidoEprodutosByIdProduto(user: UsuarioBody, query: QueryPaginationPedido, response: Response): Promise<void>;
    contarPedidos(user: UsuarioBody, query: QueryPaginationPedido, response: Response): Promise<void>;
    savePedido(user: UsuarioBody, body: Order, response: Response): Promise<void>;
    paginationPedido(user: UsuarioBody, query: QueryPaginationProdutos, response: Response): Promise<void>;
}
