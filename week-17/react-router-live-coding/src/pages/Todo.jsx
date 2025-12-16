import { Link, useParams } from "react-router";

const Todo = () => {
  const { slug } = useParams();

  return (
    <main>
      {slug ? (
        <div>Our todo with slug: {slug}</div>
      ) : (
        <>
          <Link to="/todos/my-first-todo">Todo 1</Link>
          <br />
          <Link to="/todos/my-second-todo">Todo 2</Link>
          <br />
          <Link to="/todos/my-third-todo">Todo 3</Link>
          <br />
        </>
      )}

      <br />

      <Link to="/">Back to home</Link>
    </main>
  );
};

export default Todo;
