import { Knex } from 'knex';
export declare const getKnex: (contrato: string) => Knex<any, unknown[]>;
export declare const saveKnexInstance: (contrato: string, instance: Knex) => void;
