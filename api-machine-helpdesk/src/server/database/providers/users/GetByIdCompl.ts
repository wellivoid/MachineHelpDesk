/* eslint-disable @typescript-eslint/no-unused-vars */
import { EtableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { IUser } from '../../models';



export const getByIdCompl = async (id: number): Promise< Omit<IUser, 'password'> | Error> => {
  try {
    const result = await Knex(EtableNames.user)
      .select('*')
      .where('id', '=', id)
      .first();
        
    if (result) {
      const { id, name, enable, createdAt, email, level } = result;

      const res: Omit<IUser, 'password' > = {
        id: id,
        name: name,
        enable: enable,
        createdAt: createdAt,
        email: email,
        // password: password,
        level: level
      };

      return res;
    } ;

    return new Error('Registro de usuário não encontrado');
  } catch (error) {
    return new Error('Erro ao consutar o registo de usuário'); 
  }
};