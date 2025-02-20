// import { Knex } from 'knex';
// import path from 'path';
// import dotenv from 'dotenv';

// dotenv.config();

// export const development: Knex.Config = {
//   client: 'sqlite3',
//   useNullAsDefault: true,
//   connection: {
//     filename:path.resolve(__dirname, '..','..','..','..','database.sqlite')
//   },
//   migrations: {
//     directory: path.resolve(__dirname, '..','migrations')
//   },
//   seeds:{
//     directory: path.resolve(__dirname, '..','seeds')
//   },
//   pool:{
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-function-type
//     afterCreate:(connection: any, done: Function)=>{
//       connection.run('PRAGMA foreign_keys = ON');
//       done();
//     }
//   }
// };

// export const test: Knex.Config = {
//   ...development,
//   connection: ':memory:'
// };

// export const production: Knex.Config = {
//   client: 'mysql2',
//   connection: {
//     host: process.env.DB_HOST,
//     port: Number(process.env.DB_PORT),
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_DATABASE,
//   },
//   migrations: {
//     directory: './../migrations',
//   },
//   seeds:{
//     directory: './../seeds',
//   }
// };
import * as dotenv from 'dotenv';
import { Knex } from 'knex';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../../../.env') });
//dotenv.config();

console.log('Variáveis de ambiente carregadas:');
// console.log('DB_HOST:', process.env.DB_HOST);

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

console.log('Teste log');
console.log(process.env.DB_HOST);
console.log(process.env.DB_PORT);
console.log(process.env.DB_USER);
console.log(process.env.DB_PASSWORD);
console.log(process.env.DB_DATABASE);


// host: process.env.DB_HOST || '127.0.0.2',
//     port: Number(process.env.DB_PORT) || 3306,
//     user: process.env.DB_USER || 'root',
//     password: process.env.DB_PASSWORD || 'Opus$$10',
//     database: process.env.DB_DATABASE || 'db_helpdesk',