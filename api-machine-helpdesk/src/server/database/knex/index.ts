
import knex from 'knex';
import configKnex from './Environment';
import 'dotenv/config';

export const Knex = knex(configKnex);

export default Knex;
