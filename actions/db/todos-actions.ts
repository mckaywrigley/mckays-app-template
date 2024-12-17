/*
<ai_context>
Contains server actions related to todos in the DB.
</ai_context>
*/

"use server"

import { db } from "@/db/db"
import { InsertTodo, SelectTodo, todosTable } from "@/db/schema/todos-schema"
import { ActionState } from "@/types"
import { eq } from "drizzle-orm"

export async function createTodoAction(
  todo: InsertTodo
): Promise<ActionState<SelectTodo>> {
  try {
    const [newTodo] = await db.insert(todosTable).values(todo).returning()
    return {
      isSuccess: true,
      message: "Todo created successfully",
      data: newTodo
    }
  } catch (error) {
    console.error("Error creating todo:", error)
    return { isSuccess: false, message: "Failed to create todo" }
  }
}

export async function getTodosAction(
  userId: string
): Promise<ActionState<SelectTodo[]>> {
  try {
    const todos = await db.query.todos.findMany({
      where: eq(todosTable.userId, userId)
    })
    return {
      isSuccess: true,
      message: "Todos retrieved successfully",
      data: todos
    }
  } catch (error) {
    console.error("Error getting todos:", error)
    return { isSuccess: false, message: "Failed to get todos" }
  }
}

export async function updateTodoAction(
  id: string,
  data: Partial<InsertTodo>
): Promise<ActionState<SelectTodo>> {
  try {
    const [updatedTodo] = await db
      .update(todosTable)
      .set(data)
      .where(eq(todosTable.id, id))
      .returning()

    return {
      isSuccess: true,
      message: "Todo updated successfully",
      data: updatedTodo
    }
  } catch (error) {
    console.error("Error updating todo:", error)
    return { isSuccess: false, message: "Failed to update todo" }
  }
}

export async function deleteTodoAction(id: string): Promise<ActionState<void>> {
  try {
    await db.delete(todosTable).where(eq(todosTable.id, id))
    return {
      isSuccess: true,
      message: "Todo deleted successfully",
      data: undefined
    }
  } catch (error) {
    console.error("Error deleting todo:", error)
    return { isSuccess: false, message: "Failed to delete todo" }
  }
}
