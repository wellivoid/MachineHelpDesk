/* eslint-disable @typescript-eslint/no-unused-vars */
import { EtableNames } from '../../ETableNames';
import { Knex } from '../../knex';



export const getById = async (id: number): Promise<number | Error> => {
  try {
    const result = await Knex(EtableNames.called)
      .where('id', '=', id).del();
        
    if (result > 0) return result;

    return new Error('Erro ao apagar o chamado');
  } catch (error) {
    return new Error('Erro ao apagar o chamado'); 
  }
};