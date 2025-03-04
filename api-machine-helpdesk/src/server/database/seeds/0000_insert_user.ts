import { Knex } from 'knex';
import { EtableNames } from '../ETableNames';
import { IUser } from '../models';



export const seed = async (knex: Knex) => {

  const [{ count }] = await knex(EtableNames.user).count<[{count: number}]>('* as count');
  if  (!Number.isInteger(count) || Number(count) > 0) return;

  const userToInsert = userTestSeed;


  await knex(EtableNames.user).insert(userToInsert);
};

const userTestSeed: Omit<IUser,'id' | 'createdAt' | 'enable'>[] = [
  {
    name: 'master',
    email:'master@master.com',
    password: 'low',
  }
];
