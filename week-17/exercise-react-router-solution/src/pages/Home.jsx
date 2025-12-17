import { Link } from "react-router";

export const Home = () => {
  return (
    <div className="page home">
      <h1>Welcome Home!</h1>
      <p>This is the home page of our React Router learning app.</p>

      {/*
        EXERCISE 1: Navigation with Link
        --------------------------------
        Below, create a Link component that navigates to the "/products" page.

        Hint: Import Link from "react-router" and use it like:
        <Link to="/path">Link Text</Link>
      */}
      <div className="exercise-area">
        <p>Check out our products:</p>
        <Link to="/products">here</Link>
        {/* TODO: Add a Link to "/products" here */}
      </div>
    </div>
  );
};
