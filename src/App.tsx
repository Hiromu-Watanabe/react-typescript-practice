import axios from "axios";
import { useState } from "react";
import "./styles.css";
import { Todo } from "./Todo";
import { TodoType } from "./types/todo";
import { Text } from "./Text";
import { UserProfile } from "./UserProfile";

const user = {
  name: "てんてん",
  hobbies: ["アニメ", "映画"]
};

export default function App() {
  const [todos, setTodos] = useState<TodoType[]>([]);

  const fetchTodos = async () => {
    const { data } = await axios.get(
      "https://jsonplaceholder.typicode.com/todos"
    );
    setTodos(data);
  };

  return (
    <div className="App">
      <UserProfile user={user} />
      <Text color={"red"} fontSize={"18px"} />
      <button onClick={fetchTodos}>データ取得</button>
      {todos.map((todo) => (
        // <UserProfile  />
        <Todo
          key={todo.id}
          completed={todo.completed}
          userId={todo.userId}
          title={todo.title}
        />
      ))}
    </div>
  );
}
