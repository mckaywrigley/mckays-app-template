"use client"

import {
  createTodoAction,
  deleteTodoAction,
  updateTodoAction
} from "@/actions/db/todos-actions"
import {
  createSubTodoAction,
  deleteSubTodoAction,
  updateSubTodoAction
} from "@/actions/db/subtodos-actions"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { SelectTodo } from "@/db/schema"
import { SelectSubTodo } from "@/db/schema/subtodos-schema"
import { Trash2 } from "lucide-react"
import { useState } from "react"

interface TodoListProps {
  userId: string
  initialTodos: SelectTodo[]
  initialSubTodos: SelectSubTodo[]
}

interface TodoWithSubTodos extends SelectTodo {
  subTodos: SelectSubTodo[]
}

export function TodoList({
  userId,
  initialTodos,
  initialSubTodos
}: TodoListProps) {
  const [newTodo, setNewTodo] = useState("")
  const [todos, setTodos] = useState<TodoWithSubTodos[]>(
    initialTodos.map(todo => ({
      ...todo,
      subTodos: initialSubTodos.filter(sub => sub.parentTodoId === todo.id)
    }))
  )

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
      setTodos(prevTodos => [...prevTodos, { ...newTodoData, subTodos: [] }])
      setNewTodo("")

      const result = await createTodoAction({
        userId: userId,
        content: newTodo,
        completed: false
      })
      if (result.isSuccess) {
        setTodos(prevTodos =>
          prevTodos.map(todo =>
            todo.id === newTodoData.id ? { ...result.data, subTodos: [] } : todo
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
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, completed: !completed } : todo
      )
    )

    await updateTodoAction(id, { completed: !completed })
  }

  const handleRemoveTodo = async (id: string) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id))
    await deleteTodoAction(id)
  }

  // Sub-todo Handlers
  const handleAddSubTodo = async (parentTodoId: string, content: string) => {
    if (content.trim() === "") return
    const newSubTodoData: SelectSubTodo = {
      id: Date.now().toString(),
      userId,
      parentTodoId,
      content,
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }

    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === parentTodoId
          ? { ...todo, subTodos: [...todo.subTodos, newSubTodoData] }
          : todo
      )
    )

    const result = await createSubTodoAction({
      userId,
      parentTodoId,
      content,
      completed: false
    })

    if (result.isSuccess) {
      setTodos(prevTodos =>
        prevTodos.map(todo =>
          todo.id === parentTodoId
            ? {
                ...todo,
                subTodos: todo.subTodos.map(st =>
                  st.id === newSubTodoData.id ? result.data : st
                )
              }
            : todo
        )
      )
    } else {
      console.error("Error creating sub-todo:", result.message)
      setTodos(prevTodos =>
        prevTodos.map(todo =>
          todo.id === parentTodoId
            ? {
                ...todo,
                subTodos: todo.subTodos.filter(
                  st => st.id !== newSubTodoData.id
                )
              }
            : todo
        )
      )
    }
  }

  const handleToggleSubTodo = async (
    parentTodoId: string,
    subTodoId: string,
    completed: boolean
  ) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === parentTodoId
          ? {
              ...todo,
              subTodos: todo.subTodos.map(st =>
                st.id === subTodoId ? { ...st, completed: !completed } : st
              )
            }
          : todo
      )
    )

    await updateSubTodoAction(subTodoId, userId, { completed: !completed })
  }

  const handleRemoveSubTodo = async (
    parentTodoId: string,
    subTodoId: string
  ) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === parentTodoId
          ? {
              ...todo,
              subTodos: todo.subTodos.filter(st => st.id !== subTodoId)
            }
          : todo
      )
    )

    await deleteSubTodoAction(subTodoId, userId)
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

      <ul className="space-y-4">
        {todos.map(todo => (
          <li key={todo.id} className="bg-muted rounded p-2">
            <div className="flex items-center justify-between">
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
                  className={
                    todo.completed ? "text-muted-foreground line-through" : ""
                  }
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
            </div>

            {/* Sub-todos section */}
            <div className="ml-8 mt-2">
              <SubTodoList
                parentTodoId={todo.id}
                userId={userId}
                initialSubTodos={todo.subTodos}
                onAddSubTodo={handleAddSubTodo}
                onToggleSubTodo={handleToggleSubTodo}
                onRemoveSubTodo={handleRemoveSubTodo}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

interface SubTodoListProps {
  parentTodoId: string
  userId: string
  initialSubTodos: SelectSubTodo[]
  onAddSubTodo: (parentTodoId: string, content: string) => void
  onToggleSubTodo: (
    parentTodoId: string,
    subTodoId: string,
    completed: boolean
  ) => void
  onRemoveSubTodo: (parentTodoId: string, subTodoId: string) => void
}

function SubTodoList({
  parentTodoId,
  userId,
  initialSubTodos,
  onAddSubTodo,
  onToggleSubTodo,
  onRemoveSubTodo
}: SubTodoListProps) {
  const [newSubTodo, setNewSubTodo] = useState("")

  const handleAdd = () => {
    onAddSubTodo(parentTodoId, newSubTodo)
    setNewSubTodo("")
  }

  return (
    <div className="mt-2 space-y-2">
      <div className="flex">
        <Input
          type="text"
          value={newSubTodo}
          onChange={e => setNewSubTodo(e.target.value)}
          placeholder="Add a new sub-todo"
          className="mr-2"
          onKeyPress={e => e.key === "Enter" && handleAdd()}
        />
        <Button onClick={handleAdd}>Add</Button>
      </div>

      <ul className="space-y-1">
        {initialSubTodos.map(st => (
          <li
            key={st.id}
            className="bg-card flex items-center justify-between rounded p-2 text-sm"
          >
            <div className="flex items-center">
              <Checkbox
                id={`subtodo-${st.id}`}
                checked={st.completed}
                onCheckedChange={() =>
                  onToggleSubTodo(parentTodoId, st.id, st.completed)
                }
                className="mr-2"
              />
              <label
                htmlFor={`subtodo-${st.id}`}
                className={
                  st.completed ? "text-muted-foreground line-through" : ""
                }
              >
                {st.content}
              </label>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onRemoveSubTodo(parentTodoId, st.id)}
            >
              <Trash2 className="size-4" />
              <span className="sr-only">Delete sub-todo</span>
            </Button>
          </li>
        ))}
      </ul>
    </div>
  )
}
