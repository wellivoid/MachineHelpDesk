/* eslint-disable @typescript-eslint/no-unused-vars */
import { EtableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { ICalled } from '../../models';



export const getById = async (id: number): Promise<ICalled | Error> => {
  try {
    const result:ICalled | undefined = await Knex(EtableNames.called)
      .select('*')
      .where('id', '=', id)
      .first();
        
    if (result) return result;

    return new Error('Registro não encontrado');
  } catch (error) {
    return new Error('Erro ao consutar o registo'); 
  }
};