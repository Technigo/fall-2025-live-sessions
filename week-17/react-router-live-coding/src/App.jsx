import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./pages/Home";
import Todo from "./pages/Todo";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/todos" element={<Todo />} />
        <Route path="/todos/:slug" element={<Todo />} />
      </Routes>
    </BrowserRouter>
  );
};
