import { Knex } from 'knex';
import { EtableNames } from '../ETableNames';
import { ICalled } from '../models';



export const seed = async (knex: Knex) => {

  const [{ count }] = await knex(EtableNames.called).count<[{count: number}]>('* as count');
  if  (!Number.isInteger(count) || Number(count) > 0) return;

  const calledToInsert = calledTestSeed;


  await knex(EtableNames.called).insert(calledToInsert);
};

const calledTestSeed: Omit<ICalled,'id' | 'createdAt'>[] = [
  {
    title: 'Title test 1',
    description:'Desc Test 1',
    priority: 'low',
    status: 'open',
    userId: 1
  },
  {
    title: 'Title test 2',
    description:'Desc Test 2',
    priority: 'low',
    status: 'medium',
    userId: 2
  },
  {
    title: 'Title test 3',
    description:'Desc Test 1',
    priority: 'high',
    status: 'open',
    userId: 5
  }
];
