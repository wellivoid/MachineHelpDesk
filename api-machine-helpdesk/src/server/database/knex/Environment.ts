import * as dotenv from 'dotenv';
import { Knex } from 'knex';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../../../.env') });

console.log('Variáveis de ambiente carregadas:');

const configKnex: Knex.Config = {
  client: 'mysql2',
  connection: {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  },
  migrations: {
    directory: path.resolve(__dirname, '..','migrations')
  },
  seeds: {
    directory: path.resolve(__dirname, '..','seeds')
  },
};

export default configKnex;


