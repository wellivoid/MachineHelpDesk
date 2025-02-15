/* eslint-disable @typescript-eslint/no-unused-vars */
import { EtableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { ICalled } from '../../models';



export const updateById = async (id: number, called: Omit<ICalled, 'id'>): Promise<void | Error> => {
  try {
    const result = await Knex(EtableNames.called)
      .update(called)
      .where('id', '=', id);
        
    if (result > 0) return;

    return new Error('Erro ao atualizar o chamado');
  } catch (error) {
    return new Error('Erro ao atualizar o chamado'); 
  }
};