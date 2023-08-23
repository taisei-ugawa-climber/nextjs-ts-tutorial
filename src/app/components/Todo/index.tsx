"use client"
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { PencilAltIcon, SaveIcon, TrashIcon } from "@heroicons/react/solid";

import { TodoType } from "@/app/types/todo";
import { addTodo, updateTodo } from "../../../../pages/api/todo";

interface TodoListProps {
    todos: TodoType[];
};

export const TodoList = ({ todos }: TodoListProps): JSX.Element => {
    return (
        <ul className="space-y-3">
            {todos.map((todo) => (
                <TodoItem key={todo.id} todo={todo} />
            ))}
        </ul>
    )
};

interface TodoItemProps {
    todo: TodoType;
};

export const TodoItem = ({ todo }: TodoItemProps): JSX.Element => {

    const router = useRouter();

    const [isEditing, setIsEditing] = useState(false);
    const [editedTodo, setEditedTodo] = useState(todo.name);

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => { isEditing && inputRef.current?.focus(); }, [isEditing]);

    const handleSave = async () => {
        await updateTodo(todo.id, editedTodo);
        setIsEditing(false);
        router.refresh();
    };

    return (
        <li key={todo.id} className="flex justify-between p-4 bg-white border-l-4 border-blue-500 rounded shadow">
            {
                isEditing ? (
                    <input
                        ref={inputRef}
                        value={editedTodo}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setEditedTodo(e.target.value) }}
                        className="mr-2 py-1 px-2 rounded border-gray-400 border"
                    />
                ) : (
                    <span className="text-gray-700">{todo.name}</span>
                )
            }
            <div className="flex">
                {
                    isEditing ? (
                        <>
                            <SaveIcon
                                onClick={handleSave}
                                className="h-5 w-5 text-blue-500 hover:text-blue-700 cursor-pointer mr-3"
                            />
                        </>
                    ) : (
                        <PencilAltIcon
                            onClick={() => { setIsEditing(true) }}
                            className="h-5 w-5 text-green-400 hover:text-green-700 cursor-pointer mr-3"
                        />
                    )
                }
                <TrashIcon
                    onClick={() => { }}
                    className="h-5 w-5 text-red-500 hover:text-red-700 cursor-pointer"
                />
            </div>
        </li>
    )
}

export const AddTodo = (): JSX.Element => {

    const router = useRouter();
    const [newTodo, setNewTodo] = useState<string>("");

    const handleSubmit = async (e: FormEvent) => {

        e.preventDefault();

        const now = new Date().toISOString();

        await addTodo({
            'id': uuidv4(),
            'name': newTodo,
            'created_at': now,
            'updated_at': now,
            'deleted_at': null,
        });

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