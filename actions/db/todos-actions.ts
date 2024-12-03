"use server"

import {
  createTodo,
  deleteTodo,
  getTodos,
  updateTodo
} from "@/db/queries/todos-queries"
import { InsertTodo, SelectTodo } from "@/db/schema/todos-schema"
import { ActionState } from "@/types"

export async function createTodoAction(
  todo: InsertTodo
): Promise<ActionState<SelectTodo>> {
  try {
    const newTodo = await createTodo(todo)
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
    const todos = await getTodos(userId)
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
    const updatedTodo = await updateTodo(id, data)
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

export async function deleteTodoAction(
  id: string
): Promise<ActionState<void>> {
  try {
    await deleteTodo(id)
    return { isSuccess: true, message: "Todo deleted successfully", data: undefined }
  } catch (error) {
    console.error("Error deleting todo:", error)
    return { isSuccess: false, message: "Failed to delete todo" }
  }
}
