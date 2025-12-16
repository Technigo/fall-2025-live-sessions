import { Link } from "react-router";

const Home = () => {
  return (
    <main>
      <h1>React router practise</h1>
      <Link to="/todos">Visit Todos</Link>
    </main>
  );
};

export default Home;
