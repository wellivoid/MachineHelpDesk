import type { Knex } from 'knex';
import { EtableNames } from '../ETableNames';


export async function up (knex: Knex) {
  return knex
    .schema
    .createTable(EtableNames.user, table => {
      table.bigIncrements('id').primary().index();
      table.string('name').unique().index().notNullable().checkLength('>=', 3);
      table.string('email').unique().index().notNullable().checkLength('>=', 5);
      table.string('password').notNullable().checkLength('>', 3);
      table.boolean('enable').defaultTo(true).notNullable();
      table.timestamp('createdAt').defaultTo(knex.fn.now()).notNullable();

      table.comment('Tabela para armazenar os usuários do sistema');
     
    })
    .then(() => {
      console.log(`# Created table ${EtableNames.user}`);
    });
}


export async function down (knex: Knex) {
  return knex
    .schema
    .dropTable(EtableNames.user)
    .then(() => {
      console.log(`# Dropped table ${EtableNames.user}`);
    });
}