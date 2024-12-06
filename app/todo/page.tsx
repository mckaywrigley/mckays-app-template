"use server"

import { getTodosAction } from "@/actions/db/todos-actions"
import { TodoList } from "@/app/todo/_components/todo-list"
import { getProfileByUserIdQuery } from "@/db/queries/profiles-queries"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

export default async function TodoPage() {
  const { userId } = await auth()

  if (!userId) {
    return redirect("/login")
  }

  const profile = await getProfileByUserIdQuery(userId)

  if (!profile) {
    return redirect("/signup")
  }

  if (profile.membership === "free") {
    return redirect("/pricing")
  }

  const todos = await getTodosAction(userId)

  return <TodoList userId={userId} initialTodos={todos.data ?? []} />
}
