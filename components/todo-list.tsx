"use client";

import { createTodoAction, deleteTodoAction, updateTodoAction } from "@/actions/todo-actions";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { SelectTodo } from "@/db/schema";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface TodoListProps {
  userId: string;
  initialTodos: SelectTodo[];
}

export function TodoList({ userId, initialTodos }: TodoListProps) {
  const router = useRouter();

  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState(initialTodos);

  const handleAddTodo = async () => {
    if (newTodo.trim() !== "") {
      const optimisticTodo = {
        id: Date.now().toString(),
        userId,
        content: newTodo,
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      setTodos((prevTodos) => [...prevTodos, optimisticTodo]);
      setNewTodo("");

      await createTodoAction({ userId: userId, content: newTodo, completed: false });
      router.refresh();
    }
  };

  const handleToggleTodo = async (id: string, completed: boolean) => {
    setTodos((prevTodos) => prevTodos.map((todo) => (todo.id === id ? { ...todo, completed: !completed } : todo)));

    await updateTodoAction(id, { completed: !completed });
    router.refresh();
  };

  const handleRemoveTodo = async (id: string) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));

    await deleteTodoAction(id);
    router.refresh();
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-card rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-4 text-center">Todo App</h1>
      <div className="flex mb-4">
        <Input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo"
          className="mr-2"
          onKeyPress={(e) => e.key === "Enter" && handleAddTodo()}
        />
        <Button onClick={handleAddTodo}>Add</Button>
      </div>
      <ul className="space-y-2">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="flex items-center justify-between bg-muted p-2 rounded"
          >
            <div className="flex items-center">
              <Checkbox
                id={`todo-${todo.id}`}
                checked={todo.completed}
                onCheckedChange={() => handleToggleTodo(todo.id, todo.completed)}
                className="mr-2"
              />
              <label
                htmlFor={`todo-${todo.id}`}
                className={`${todo.completed ? "line-through text-muted-foreground" : ""}`}
              >
                {todo.content}
              </label>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleRemoveTodo(todo.id)}
            >
              <Trash2 className="h-4 w-4" />
              <span className="sr-only">Delete todo</span>
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
