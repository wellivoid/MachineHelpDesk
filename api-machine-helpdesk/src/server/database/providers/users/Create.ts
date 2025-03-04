/* eslint-disable @typescript-eslint/no-unused-vars */
import { EtableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { IUser } from '../../models';



export const create = async (user: Omit<IUser, 'id' | 'createdAt' | 'enable'>): Promise<number | Error> => {
  try {
    const [result] = await Knex(EtableNames.user).insert(user);
    //console.log(result);
    if (typeof result === 'number') {
      return result;
    }
    return new Error('Erro ao criar o usuário');
  } catch (error) {
    return new Error('Erro ao criar o usuário'); 
  }
};