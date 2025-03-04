/* eslint-disable @typescript-eslint/no-unused-vars */
import { EtableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { IUser } from '../../models';



export const getById = async (id: number): Promise<IUser | Error> => {
  try {
    const result = await Knex(EtableNames.user)
      .select('*')
      .where('id', '=', id)
      .first();
        
    if (result) return result;

    return new Error('Registro de usuário não encontrado');
  } catch (error) {
    return new Error('Erro ao consutar o registo de usuário'); 
  }
};