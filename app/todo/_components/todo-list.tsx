/*
<ai_context>
This client component renders a Todo list with add, toggle, and delete functionality.
</ai_context>
*/

"use client"

import {
  createTodoAction,
  deleteTodoAction,
  updateTodoAction
} from "@/actions/db/todos-actions"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { SelectTodo } from "@/db/schema"
import { Trash2 } from "lucide-react"
import { useState } from "react"

interface TodoListProps {
  userId: string
  initialTodos: SelectTodo[]
}

export function TodoList({ userId, initialTodos }: TodoListProps) {
  const [newTodo, setNewTodo] = useState("")
  const [todos, setTodos] = useState(initialTodos)

  const handleAddTodo = async () => {
    if (newTodo.trim() !== "") {
      const newTodoData = {
        id: Date.now().toString(),
        userId,
        content: newTodo,
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
      setTodos(prevTodos => [...prevTodos, newTodoData])
      setNewTodo("")

      const result = await createTodoAction({
        userId: userId,
        content: newTodo,
        completed: false
      })
      if (result.isSuccess) {
        setTodos(prevTodos =>
          prevTodos.map(todo =>
            todo.id === newTodoData.id ? result.data : todo
          )
        )
      } else {
        console.error("Error creating todo:", result.message)
        setTodos(prevTodos =>
          prevTodos.filter(todo => todo.id !== newTodoData.id)
        )
      }
    }
  }

  const handleToggleTodo = async (id: string, completed: boolean) => {
    console.log("handleToggleTodo", id, completed)
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, completed: !completed } : todo
      )
    )

    await updateTodoAction(id, { completed: !completed })
  }

  const handleRemoveTodo = async (id: string) => {
    console.log("handleRemoveTodo", id)
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id))

    await deleteTodoAction(id)
  }

  return (
    <div className="bg-card mx-auto mt-8 max-w-md rounded-lg p-6 shadow">
      <h1 className="mb-4 text-center text-2xl font-bold">Todo App</h1>

      <div className="mb-4 flex">
        <Input
          type="text"
          value={newTodo}
          onChange={e => setNewTodo(e.target.value)}
          placeholder="Add a new todo"
          className="mr-2"
          onKeyPress={e => e.key === "Enter" && handleAddTodo()}
        />
        <Button onClick={handleAddTodo}>Add</Button>
      </div>
      <ul className="space-y-2">
        {todos.map(todo => (
          <li
            key={todo.id}
            className="bg-muted flex items-center justify-between rounded p-2"
          >
            <div className="flex items-center">
              <Checkbox
                id={`todo-${todo.id}`}
                checked={todo.completed}
                onCheckedChange={() =>
                  handleToggleTodo(todo.id, todo.completed)
                }
                className="mr-2"
              />
              <label
                htmlFor={`todo-${todo.id}`}
                className={`${todo.completed ? "text-muted-foreground line-through" : ""}`}
              >
                {todo.content}
              </label>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleRemoveTodo(todo.id)}
            >
              <Trash2 className="size-4" />
              <span className="sr-only">Delete todo</span>
            </Button>
          </li>
        ))}
      </ul>
    </div>
  )
}
