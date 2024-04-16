import { UsuarioBody } from 'src/tdo/usuarioDTO';
import { FormaPagamentoTdo, LucroTotalTdo, LucrosEmVendasTDO, QueryPaginationPeriodo } from 'src/types/types';
import { ChartsService } from './charts.service';
import { Response } from 'express';
export declare class ChartsController {
    private chartsServico;
    constructor(chartsServico: ChartsService);
    getPagamentos(user: UsuarioBody, query: FormaPagamentoTdo, response: Response): Promise<void>;
    getTotals(user: UsuarioBody, query: LucrosEmVendasTDO, response: Response): Promise<void>;
    getLucroTotal(user: UsuarioBody, query: LucroTotalTdo, response: Response): Promise<void>;
    getOcorrencia(user: UsuarioBody, query: QueryPaginationPeriodo, response: Response): Promise<void>;
}
