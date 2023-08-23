"use client"
import { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

import { TodoType } from "@/app/types/todo";
import { addTodo } from "../../../../pages/api/todo";

interface TodoListProps {
    todos: TodoType[];
}

export const TodoList = ({ todos }: TodoListProps): JSX.Element => {
    return (
        <></>
    )
}

export const TodoItem = (): JSX.Element => {
    return (
        <></>
    )
}

export const AddTodo = (): JSX.Element => {

    const router = useRouter();
    const [newTodo, setNewTodo] = useState<string>("");

    const handleSubmit = async (e: FormEvent) => {

        e.preventDefault()

        const now = new Date().toISOString();

        await addTodo({
            'id': uuidv4(),
            'name': newTodo,
            'created_at': now,
            'updated_at': now,
            'deleted_at': null,
        })

        router.refresh();
    }

    return (
        <form className="mb-4 space-y-3" onSubmit={handleSubmit}>
            <input
                value={newTodo}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setNewTodo(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-400"
                type="text"
                placeholder="New task..."
            />
            <button className="w-full px-4 py-2 text-white bg-blue-500 rounded transform transition-transform duration-200 hover:bg-blue-400 hover:scale-95">
                Add task
            </button>
        </form>
    )
}