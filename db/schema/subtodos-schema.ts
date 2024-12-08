import { todosTable } from "@/db/schema/todos-schema"
import { boolean, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core"

export const subTodosTable = pgTable("sub_todos", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id").notNull(),
  parentTodoId: uuid("parent_todo_id")
    .notNull()
    .references(() => todosTable.id, { onDelete: "cascade" }),
  content: text("content").notNull(),
  completed: boolean("completed").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date())
})

export type InsertSubTodo = typeof subTodosTable.$inferInsert
export type SelectSubTodo = typeof subTodosTable.$inferSelect
