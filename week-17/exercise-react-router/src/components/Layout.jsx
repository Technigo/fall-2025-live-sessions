/* 
  EXERCISE 6: Nested Routes with Outlet
  --------------------------------------
  The Layout component wraps all pages and provides a consistent structure.
  The <Outlet /> component renders the child route's element.
  
  Steps:
  1. Import Outlet from "react-router"
  2. Add the <Outlet /> component where you want child routes to render
  
  This component is used in App.jsx like this:
  <Route element={<Layout />}>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
    ... other routes
  </Route>
*/

// TODO: Import Outlet from "react-router"
import { Navigation } from "./Navigation";

export const Layout = () => {
  return (
    <div className="app-layout">
      <header>
        <div className="logo">🚀 React Router Learning</div>
        <Navigation />
      </header>

      <main>
        {/* 
          TODO: Add the <Outlet /> component here
          This is where the child route components will be rendered
        */}
        <p>Child routes will appear here when you add Outlet</p>
      </main>

      <footer>
        <p>React Router v7 Learning Project</p>
      </footer>
    </div>
  );
};
