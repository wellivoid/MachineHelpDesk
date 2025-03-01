/* eslint-disable @typescript-eslint/no-unused-vars */
import { EtableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { ICalled } from '../../models';



export const create = async (called: Omit<ICalled, 'id' | 'createdAt'>): Promise<number | Error> => {
  try {
    const [result] = await Knex(EtableNames.called).insert(called);
    //console.log(result);
    if (typeof result === 'number') {
      return result;
    }
    return new Error('Erro ao criar o chamado');
  } catch (error) {
    return new Error('Erro ao criar o chamado'); 
  }
};