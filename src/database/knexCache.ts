import knexFn, { Knex } from 'knex'
import { attachPaginate } from 'knex-paginate'



const knexCache = new Map<string, Knex>()

export const getKnex = (contrato: string) => {
  // console.log(knexCache.keys())
  return knexCache.get(contrato)
}

export const saveKnexInstance = (contrato: string, instance: Knex) => {
  // console.log(`set Knex ${contrato}`)
  knexCache.set(contrato, instance)
}


