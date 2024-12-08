"use server"

import { db } from "@/db/db"
import { InsertSubTodo, SelectSubTodo, subTodosTable } from "@/db/schema/subtodos-schema"
import { ActionState } from "@/types"
import { eq, and } from "drizzle-orm"

export async function createSubTodoAction(
  subTodo: InsertSubTodo
): Promise<ActionState<SelectSubTodo>> {
  try {
    const [newSubTodo] = await db.insert(subTodosTable).values(subTodo).returning()
    return {
      isSuccess: true,
      message: "Sub-todo created successfully",
      data: newSubTodo
    }
  } catch (error) {
    console.error("Error creating sub-todo:", error)
    return { isSuccess: false, message: "Failed to create sub-todo" }
  }
}

export async function getSubTodosAction(
  userId: string
): Promise<ActionState<SelectSubTodo[]>> {
  try {
    const subTodos = await db.query.sub_todos.findMany({
      where: eq(subTodosTable.userId, userId)
    })
    return {
      isSuccess: true,
      message: "Sub-todos retrieved successfully",
      data: subTodos
    }
  } catch (error) {
    console.error("Error getting sub-todos:", error)
    return { isSuccess: false, message: "Failed to get sub-todos" }
  }
}

export async function updateSubTodoAction(
  id: string,
  userId: string,
  data: Partial<InsertSubTodo>
): Promise<ActionState<SelectSubTodo>> {
  try {
    const [updatedSubTodo] = await db
      .update(subTodosTable)
      .set(data)
      .where(and(eq(subTodosTable.id, id), eq(subTodosTable.userId, userId)))
      .returning()

    if (!updatedSubTodo) {
      return { isSuccess: false, message: "Sub-todo not found or not authorized" }
    }

    return {
      isSuccess: true,
      message: "Sub-todo updated successfully",
      data: updatedSubTodo
    }
  } catch (error) {
    console.error("Error updating sub-todo:", error)
    return { isSuccess: false, message: "Failed to update sub-todo" }
  }
}

export async function deleteSubTodoAction(
  id: string,
  userId: string
): Promise<ActionState<void>> {
  try {
    const result = await db.delete(subTodosTable).where(and(eq(subTodosTable.id, id), eq(subTodosTable.userId, userId)))
    if (result.count === 0) {
      return { isSuccess: false, message: "Sub-todo not found or not authorized" }
    }
    return {
      isSuccess: true,
      message: "Sub-todo deleted successfully",
      data: undefined
    }
  } catch (error) {
    console.error("Error deleting sub-todo:", error)
    return { isSuccess: false, message: "Failed to delete sub-todo" }
  }
}