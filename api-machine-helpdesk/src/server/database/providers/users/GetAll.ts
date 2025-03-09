/* eslint-disable @typescript-eslint/no-unused-vars */
import { EtableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { IUser, IUserPublic } from '../../models';

export const getAll = async (page: number, limit: number, filter: string, id = 0): Promise<IUserPublic[] | Error> => {
  try {
    const result = await Knex(EtableNames.user)
      .select('*')
      .where('id', '=', Number(id))
      .orWhere('name', 'like', `%${filter}%`)
      .offset((page - 1) * limit)
      .limit(limit);

    // Mapeia os resultados de IUser para IUserPublic, omitindo campos sensíveis
    const usersWithoutSensitiveData = result.map(({ email, password, level, ...user }: IUser): IUserPublic => user);

    if (id > 0 && result.every(item => item.id !== id)) {
      const resultById: IUser | undefined = await Knex(EtableNames.user)
        .select('*')
        .where('id', '=', id)
        .first();
        
      if (resultById) {
        // Mapeia o resultado específico do usuário de IUser para IUserPublic
        const userWithoutSensitiveData = (({ email, password, level, ...user }: IUser): IUserPublic => user)(resultById);
        
        return [...usersWithoutSensitiveData, userWithoutSensitiveData];
      }
    }

    return usersWithoutSensitiveData;

  } catch (error) {
    return new Error('Erro ao consultar os registros de usuários'); 
  }
};
