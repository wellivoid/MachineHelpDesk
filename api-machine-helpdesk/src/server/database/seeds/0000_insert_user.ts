import { Knex } from 'knex';
import { EtableNames } from '../ETableNames';
import { IUser } from '../models';
import { PasswordCrypto } from '../../shared/services';





export const seed = async (knex: Knex) => {

  const [{ count }] = await knex(EtableNames.user).count<[{count: number}]>('* as count');
  if  (!Number.isInteger(count) || Number(count) > 0) return;

  // Criptografando as senhas antes da inserção
  const userToInsert = await Promise.all(
    userTestSeed.map(async (user) => ({
      ...user,
      password: await PasswordCrypto.hashPassword(user.password),
    }))
  );


  await knex(EtableNames.user).insert(userToInsert);
};

const userTestSeed: Omit<IUser,'id' | 'createdAt' | 'enable'>[] = [
  {
    name: 'master',
    email:'master@master.com',
    password: '1234',
    level: 'master'
  },
  {
    name: 'Admin',
    email:'admin@admin.com',
    password: '123456',
    level: 'admin'
  }
];
