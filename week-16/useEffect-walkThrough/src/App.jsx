// https://jsonplaceholder.typicode.com/todos

import { useEffect } from "react";
import { useState } from "react";

export const App = () => {
  const [todos, setTodos] = useState([]);
  const [page, setPage] = useState(1);

  // can use React.useCallback here to not recreate the function on every render
  const fetchTodos = async () => {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/todos?page=${page}`,
    );
    const todosRes = await res.json();
    return todosRes;
  };

  useEffect(() => {
    const init = async () => {
      const res = await fetchTodos();

      const todoTitles = res.map((todo) => todo.title);
      console.log("titles", todoTitles);

      setTodos(todoTitles);
    };

    init();
  }, []);

  return (
    <div>
      <h1>Todos:</h1>
      {/* <button onClick={fetchTodos}>fetch</button>*/}

      {todos.map((todo, index) => (
        <p key={index}>{todo}</p>
      ))}
    </div>
  );
};
