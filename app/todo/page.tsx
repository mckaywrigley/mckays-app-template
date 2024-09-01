import { TodoList } from "@/components/todo-list";
import { getProfileByUserId } from "@/db/queries/profile-queries";
import { getTodos } from "@/db/queries/todo-queries";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function TodoPage() {
  const { userId } = auth();

  if (!userId) {
    return redirect("/login");
  }

  const profile = await getProfileByUserId(userId);

  if (!profile) {
    return redirect("/signup");
  }

  if (profile.membership === "free") {
    return redirect("/pricing");
  }

  const todos = await getTodos(userId);

  return (
    <TodoList
      userId={userId}
      initialTodos={todos}
    />
  );
}
