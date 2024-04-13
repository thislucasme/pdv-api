import { Response } from 'express';
import { UsuarioBody } from 'src/tdo/usuarioDTO';
import { QueryPaginationPeriodo } from 'src/types/types';
import { PedidoService } from './pedido.service';
export declare class PedidoController {
    private pedidoService;
    constructor(pedidoService: PedidoService);
    getTotals(user: UsuarioBody, query: QueryPaginationPeriodo, response: Response): Promise<void>;
}
