
import { serial, integer, pgTable, timestamp } from 'drizzle-orm/pg-core';

// Since the counter doesn't persist across sessions, we don't need a database table
// But we'll create a simple in-memory counter structure
// This file is kept minimal as per the non-persistent requirement

export const countersTable = pgTable('counters', {
  id: serial('id').primaryKey(),
  value: integer('value').notNull().default(0),
  created_at: timestamp('created_at').defaultNow().notNull(),
});

// TypeScript type for the table schema
export type Counter = typeof countersTable.$inferSelect;
export type NewCounter = typeof countersTable.$inferInsert;

// Export all tables for proper query building
export const tables = { counters: countersTable };
