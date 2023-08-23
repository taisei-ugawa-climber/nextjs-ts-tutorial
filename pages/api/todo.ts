import { TodoType } from "@/app/types/todo"

// TODO: FireBase or DynamoDB運用に変更してみる。現在はjsonサーバーなので下記を定義
const baseUrl = "http://localhost:4000"

export const getTodos = async (): Promise<TodoType[]> => {
    const res = await fetch(`${baseUrl}/todos`, { cache: "no-store" })
    const todos = await res.json()

    return todos
};

export const addTodo = async (todo: TodoType): Promise<TodoType> => {
    const res = await fetch(`${baseUrl}/todos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(todo)
    })
    const newTodo = await res.json()

    return newTodo;
}

export const updateTodo = async (
    id: string,
    newName: string,
    newContent: string
): Promise<TodoType> => {
    const res = await fetch(`${baseUrl}/todos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            name: newName,
            content: newContent
        })
    })
    const updatedTodo = await res.json();

    return updatedTodo;
};

export const deleteTodo = async (id: string): Promise<TodoType> => {
    const res = await fetch(`${baseUrl}/todos/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
    });
    const deleteTodo = await res.json();

    return deleteTodo;
};