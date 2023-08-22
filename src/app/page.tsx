import { getTodos } from "../../pages/api/todo";
import { AddTodo } from "./components/Todo";
import { TodoList } from "./components/Todo";

export default async function Home() {

  // jsonサーバーからデータの取得
  const todos = await getTodos();

  return (
    <main className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-200">
      <h1 className="text-4xl font-bold text-gray-700 -mt-32">
        NextJs13 Tutorial App with TypeScript
      </h1>
      <div className="w-full max-w-xl items-center justify-center mt-5">
        <div className="w-full px-8 py-6 bg-white shadow-md rounded-lg">
          <AddTodo />
          <TodoList todos={todos} />
        </div>
      </div>
    </main>
  )
}