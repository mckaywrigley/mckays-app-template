"use server";

import { createTodo, deleteTodo, getTodo, getTodos, updateTodo } from "@/db/queries/todo-queries";
import { InsertTodo } from "@/db/schema/todo-schema";
import { ActionState } from "@/types";
import { revalidatePath } from "next/cache";

export async function createTodoAction(todo: InsertTodo): Promise<ActionState> {
  try {
    const newTodo = await createTodo(todo);
    revalidatePath("/todo");
    return { status: "success", message: "Todo created successfully", data: newTodo };
  } catch (error) {
    console.error("Error creating todo:", error);
    return { status: "error", message: "Failed to create todo" };
  }
}

export async function getTodosAction(userId: string): Promise<ActionState> {
  try {
    const todos = await getTodos(userId);
    return { status: "success", message: "Todos retrieved successfully", data: todos };
  } catch (error) {
    console.error("Error getting todos:", error);
    return { status: "error", message: "Failed to get todos" };
  }
}

export async function getTodoAction(id: string): Promise<ActionState> {
  try {
    const todo = await getTodo(id);
    return { status: "success", message: "Todo retrieved successfully", data: todo };
  } catch (error) {
    console.error("Error getting todo by ID:", error);
    return { status: "error", message: "Failed to get todo" };
  }
}

export async function updateTodoAction(id: string, data: Partial<InsertTodo>): Promise<ActionState> {
  try {
    const updatedTodo = await updateTodo(id, data);
    revalidatePath("/todo");
    return { status: "success", message: "Todo updated successfully", data: updatedTodo };
  } catch (error) {
    console.error("Error updating todo:", error);
    return { status: "error", message: "Failed to update todo" };
  }
}

export async function deleteTodoAction(id: string): Promise<ActionState> {
  try {
    await deleteTodo(id);
    revalidatePath("/todo");
    return { status: "success", message: "Todo deleted successfully" };
  } catch (error) {
    console.error("Error deleting todo:", error);
    return { status: "error", message: "Failed to delete todo" };
  }
}
