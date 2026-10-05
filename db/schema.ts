import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
export const scores = sqliteTable('scores', {id:text('id').primaryKey(),name:text('name').notNull(),score:integer('score').notNull(),correct:integer('correct').notNull(),total:integer('total').notNull(),created:integer('created').notNull(),room:text('room')});

export const rooms = sqliteTable('rooms', {code:text('code').primaryKey(),config:text('config').notNull(),items:text('items').notNull(),total:integer('total').notNull(),created:integer('created').notNull()});
