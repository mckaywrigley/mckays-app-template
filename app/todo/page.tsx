/*
<ai_context>
This server page retrieves user todos from the database and renders them in a list.
</ai_context>
*/

"use server"

import { getTodosAction } from "@/actions/db/todos-actions"
import { TodoList } from "@/app/todo/_components/todo-list"

export default async function TodoPage() {
  const todos = await getTodosAction()

  return (
    <div className="flex-1 p-4 pt-0">
      <TodoList initialTodos={todos.data ?? []} />
    </div>
  )
}
