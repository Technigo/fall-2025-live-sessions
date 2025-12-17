/* 
  EXERCISE 2: Navigation with NavLink
  ------------------------------------
  NavLink is similar to Link but provides additional styling capabilities
  for the "active" state (when the link matches the current URL).
  
  Steps:
  1. Import NavLink from "react-router"
  2. Replace the <a> tags with <NavLink> components
  3. Use the "to" prop instead of "href"
  4. Notice how NavLink automatically adds an "active" class when the route matches!
  
  Optional: You can also use a function for className to customize the active style:
  className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
*/

// TODO: Import NavLink from "react-router"

export const Navigation = () => {
  return (
    <nav className="main-nav">
      <ul>
        {/* 
          TODO: Replace these <a> tags with <NavLink> components
          Remember to change "href" to "to"
        */}
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/products">Products</a>
        </li>
        <li>
          <a href="/about">About</a>
        </li>
        <li>
          <a href="/contact">Contact</a>
        </li>
        <li>
          <a href="/search">Search</a>
        </li>
        <li>
          <a href="/dashboard">Dashboard</a>
        </li>
      </ul>
    </nav>
  );
};
