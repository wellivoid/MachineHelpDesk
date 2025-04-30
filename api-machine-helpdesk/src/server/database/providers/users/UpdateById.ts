/* eslint-disable @typescript-eslint/no-unused-vars */
import { EtableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { IUserPublic } from '../../models';



export const updateById = async (id: number, dataUser: Omit<IUserPublic, 'id' | 'createdAt'>): Promise<void | Error> => {
  try {
    const result = await Knex(EtableNames.user)
      .update(dataUser)
      .where('id', '=', id);
        
    if (result > 0) return;

    return new Error('Erro ao atualizar o usuário1');
  } catch (error) {
    return new Error('Erro ao atualizar o usuário2'); 
  }
};