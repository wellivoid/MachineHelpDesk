import { Knex } from 'knex';
import path from 'path';

export const development: Knex.Config = {
  client: 'sqlite3',
  useNullAsDefault: true,
  connection: {
    filename:path.resolve(__dirname, '..','..','..','..','database.sqlite')
  },
  migrations: {
    directory: path.resolve(__dirname, '..','migrations')
  },
  seeds:{
    directory: path.resolve(__dirname, '..','seeds')
  },
  pool:{
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-function-type
    afterCreate:(connection: any, done: Function)=>{
      connection.run('PRAGMA foreign_keys = ON');
      done();
    }
  }
};

export const test: Knex.Config = {
  ...development,
  connection: ':memory:'
};

export const production: Knex.Config = {
  client: 'mysql2',
  useNullAsDefault: true,
  connection:{
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
  migrations: {
    directory: './../migrations',
  },
  seeds:{
    directory: './../seeds',
  }
};
