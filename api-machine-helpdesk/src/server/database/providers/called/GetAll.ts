/* eslint-disable @typescript-eslint/no-unused-vars */
import { EtableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { ICalled } from '../../models';



export const getAll = async (page: number,limit: number, filter: string, id = 0): Promise<ICalled[] | Error> => {
  try {
    const result: ICalled[] = await Knex(EtableNames.called)
      .select('*')
      .where('id', '=', Number(id))
      .orWhere('title', 'like' ,`%${filter}%`)
      .orWhere('description', 'like' ,`%${filter}%`)
      .offset((page - 1) * limit)
      .limit(limit);
        
    if (id > 0 && result.every(item => item.id !== id)){
      const resultById: ICalled | undefined = await Knex(EtableNames.called)
        .select('*')
        .where('id', '=', id)
        .first();
      if (resultById) return [...result, resultById];
    }

    return result;
    
  } catch (error) {
    return new Error('Erro ao consultar os registros'); 
  }
};