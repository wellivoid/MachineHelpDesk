/* eslint-disable @typescript-eslint/no-unused-vars */
import { EtableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { IUserPublic } from '../../models';



export const getByid = async (id: number): Promise<IUserPublic | Error> => {
  try {
    const result = await Knex(EtableNames.user)
      .select('*')
      .where('id', '=', id)
      .first();
        
    if (result) {
      const { id, name, enable, createdAt } = result;

      const res:IUserPublic = {
        id: id,
        name: name,
        enable: enable,
        createdAt: createdAt
      };

      return res;
    } ;

    return new Error('Registro de usuário não encontrado');
  } catch (error) {
    return new Error('Erro ao consutar o registo de usuário'); 
  }
};