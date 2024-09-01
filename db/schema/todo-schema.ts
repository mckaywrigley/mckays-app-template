import { boolean, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const todos = pgTable("todos", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id").notNull(),
  content: text("content").notNull(),
  completed: boolean("completed").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date())
});

export type InsertTodo = typeof todos.$inferInsert;
export type SelectTodo = typeof todos.$inferSelect;
