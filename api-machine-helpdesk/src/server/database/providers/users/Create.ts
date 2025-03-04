/* eslint-disable @typescript-eslint/no-unused-vars */
import { PasswordCrypto } from '../../../shared/services';
import { EtableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { IUser } from '../../models';



export const create = async (user: Omit<IUser, 'id' | 'createdAt' | 'enable'>): Promise<number | Error> => {
  try {
    const hashedPassword = await PasswordCrypto.hashPassword(user.password);

    user.password = hashedPassword;

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