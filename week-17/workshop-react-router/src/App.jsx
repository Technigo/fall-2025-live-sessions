// TODO: Import necessary modules and data
import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./pages/Home";
import SongInfo from "./pages/SongInfo";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/song/:slug" element={<SongInfo />} />
      </Routes>
    </BrowserRouter>
  );
};
