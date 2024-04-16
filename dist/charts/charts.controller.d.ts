import { UsuarioBody } from 'src/tdo/usuarioDTO';
import { QueryPaginationProdutos } from 'src/types/types';
import { ChartsService } from './charts.service';
import { Response } from 'express';
export declare class ChartsController {
    private chartsServico;
    constructor(chartsServico: ChartsService);
    getPagamentos(user: UsuarioBody, query: QueryPaginationProdutos, response: Response): Promise<void>;
}
