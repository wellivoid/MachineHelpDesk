/* eslint-disable @typescript-eslint/no-unused-vars */
import { EtableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { IUser } from '../../models';



export const updateByEmail = async (email: string, user: Omit<IUser, 'id' | 'createdAt'>): Promise<void | Error> => {
  try {
    const result = await Knex(EtableNames.user)
      .update(user)
      .where('email', '=', email);
        
    if (result > 0) return;

    return new Error('Erro ao atualizar o usuário');
  } catch (error) {
    return new Error('Erro ao atualizar o usuário'); 
  }
};