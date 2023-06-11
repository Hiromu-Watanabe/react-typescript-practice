import axios from "axios";
import { useState } from "react";
import "./styles.css";
import { Todo } from "./Todo";
import { TodoType } from "./types/todo";
import { Text } from "./Text";
import { UserProfile } from "./UserProfile";
import { UserCard } from "./components/UserCard";
import { User } from "./types/api/user";
import { userProfile } from "./types/userProfile";

// const user = {
//   name: "てんてん",
//   hobbies: ["アニメ", "映画"]
// };

// const user = {
//   id: 1,
//   name: "てんてん",
//   email: "test@test.jp",
//   address: "address",
// };

export default function App() {
  const [userProfiles, setUserProfiles] = useState<userProfile[]>([]);
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    setError(false);

    try {
      const { data } = await axios.get<User[]>(
        "https://jsonplaceholder.typicode.com/users"
      );

      const formatData = data.map((user) => ({
        id: user.id,
        name: `${user.name} （${user.username}）`,
        email: user.email,
        address: `${user.address.city}${user.address.suite}${user.address.street}`,
      }));
      setUserProfiles(formatData);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const fetchTodos = async () => {
    const { data } = await axios.get(
      "https://jsonplaceholder.typicode.com/todos"
    );
    setTodos(data);
  };

  return (
    <div className="App">
      <button onClick={fetchUsers}>userデータ取得</button>
      <br />
      {error ? (
        <p style={{ color: "red" }}>データの取得に失敗しました</p>
      ) : loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {userProfiles.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </>
      )}
      <br />
      <br />
      <br />
      {/* <UserProfile user={user} /> */}
      <Text color={"red"} fontSize={"18px"} />
      <button onClick={fetchTodos}>todoデータ取得</button>
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
