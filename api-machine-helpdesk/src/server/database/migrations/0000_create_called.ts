import type { Knex } from 'knex';
import { EtableNames } from '../ETableNames';


export async function up (knex: Knex) {
  return knex
    .schema
    .createTable(EtableNames.called, table => {
      table.bigIncrements('id').primary().index();
      table.string('title').checkLength('<=', 200).index().notNullable();
      table.text('description').checkLength('<=', 5000).notNullable();
      table.string('priority', 12).checkLength('<=', 12).index().notNullable();
      table.integer('userId').index().notNullable();
      table.string('status', 12).checkLength('<=', 12).index().notNullable();
      table.timestamp('createdAt').defaultTo(knex.fn.now()).notNullable();

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