import type { Knex } from 'knex';
import { EtableNames } from '../ETableNames';


export async function up (knex: Knex) {
  return knex
    .schema
    .createTable(EtableNames.called, table => {
      table.bigIncrements('id').primary().index();
      table.string('title').index().notNullable();
      table.text('description').index().notNullable();
      table.string('priority', 12).index().notNullable();
      table.integer('userId').index().notNullable();
      table.string('status', 12).index().notNullable();

      table.comment('Tabela para armazenar os chamados');
     
    })
    .then(() => {
      console.log(`# Created table ${EtableNames.called}`);
    });
}


export async function down (knex: Knex) {
  return knex
    .schema
    .dropTable(EtableNames.called)
    .then(() => {
      console.log(`# Dropped table ${EtableNames.called}`);
    });
}