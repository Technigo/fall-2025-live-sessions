/* 
  ============================================================================
  EXERCISE: BrowserRouter Setup
  ============================================================================
  
  BrowserRouter provides the routing context to your entire application.
  It must wrap your App component for React Router to work.
  
  Steps:
  1. Import BrowserRouter from "react-router"
  2. Wrap <App /> with <BrowserRouter>
  
  ============================================================================
*/

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

// TODO: Import BrowserRouter from "react-router"

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* 
      TODO: Wrap App with BrowserRouter
    */}
    <App />
  </StrictMode>
);
