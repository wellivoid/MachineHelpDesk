/* eslint-disable @typescript-eslint/no-unused-vars */
import { EtableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { IUser } from '../../models';



export const getAll = async (page: number,limit: number, filter: string, id = 0): Promise<IUser[] | Error> => {
  try {
    const result = await Knex(EtableNames.user)
      .select('*')
      .where('id', '=', Number(id))
      .orWhere('name', 'like' ,`%${filter}%`)
      .orWhere('email', 'like' ,`%${filter}%`)
      .orWhere('enable', 'like' ,`%${filter}%`)
      .offset((page - 1) * limit)
      .limit(limit);
        
    if (id > 0 && result.every(item => item.id !== id)){
      const resultById: IUser | undefined = await Knex(EtableNames.user)
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