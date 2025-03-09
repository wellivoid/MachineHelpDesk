/* eslint-disable @typescript-eslint/no-unused-vars */
import { EtableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { ICalled } from '../../models';



export const getAll = async (page: number,limit: number, filter: string, status:string, userId = 0): Promise<ICalled[] | Error> => {
  try {
    const result = await Knex(EtableNames.called)
      .select('*')
      .where('userId', '=', Number(userId))
      .orWhere('status', '=', status)
      .orWhere('title', 'like' ,`%${filter}%`)
      .orWhere('description', 'like' ,`%${filter}%`)
      .offset((page - 1) * limit)
      .limit(limit);
        
    if (userId > 0 && result.every(item => item.id !== userId)){
      const resultById: ICalled | undefined = await Knex(EtableNames.called)
        .select('*')
        .where('userId', '=', userId)
        .first();
      if (resultById) return [...result, resultById];
    }

    return result;
    
  } catch (error) {
    return new Error('Erro ao consultar os registros'); 
  }
};