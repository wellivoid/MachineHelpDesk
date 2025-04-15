/* eslint-disable @typescript-eslint/no-unused-vars */
import { EtableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { ICalled } from '../../models';



export const getAll = async (page: number,limit: number, filter: string, status:string, userId:number): Promise<ICalled[] | Error> => {
  try {
    // console.log(userId);
    const query = Knex(EtableNames.called)
      .select('*');

    if (userId) {
      query.where('userId', '=', userId)
        .andWhere(builder => {
          builder
            .where('status', '=', status)
            .orWhere('title', 'like', `%${filter}%`)
            .orWhere('description', 'like', `%${filter}%`)
            .offset((page - 1) * limit)
            .limit(limit);
        });
    } else {
      query.where(builder => {
        builder
          .where('status', '=', status)
          .orWhere('title', 'like', `%${filter}%`)
          .orWhere('description', 'like', `%${filter}%`)
          .offset((page - 1) * limit)
          .limit(limit);
      });
    }

    const result = await query;

    return result;
    
  } catch (error) {
    return new Error('Erro ao consultar os registros'); 
  }
};