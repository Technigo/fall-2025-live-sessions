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
import { NavLink, Outlet, useLocation } from "react-router";
import { useState, useEffect } from "react";

// Added component for the navigation items to make it more DRY
const NavigationItem = (props) => {
  const { to, children, ...rest } = props;

  return (
    <li {...rest}>
      <NavLink
        to={to}
        className={({ isActive }) =>
          isActive ? "nav-link active" : "nav-link"
        }
        from={location.pathname === "/" ? "home" : location.pathname.at(-1)}
      >
        {children}
      </NavLink>
    </li>
  );
};

/*
const navigationRoutes = [
  { to: '/', title: 'Home' },
  { to: '/products', title: 'Product' },
  { to: '/about', title: 'About' },
  { to: '/contact', title: 'Contact' },
  { to: '/search', title: 'Search' },
  { to: '/dashboard', title: 'Dashboard' },
]

{navigationRoutes.map((item, index) => (
    <NavigationItem
      to={item}
      className={({ isActive }) =>
        isActive ? "nav-link active" : "nav-link"
      }
    >
  ))}
*/

export const Navigation = () => {
  const location = useLocation();

  // TODO: Create state to track navigation history
  const [navigationHistory, setNavigationHistory] = useState([]);

  // TODO: Use useEffect to track page views
  useEffect(() => {
    // This runs every time the URL changes
    console.log("📍 Page viewed:", location.pathname);

    // Add to navigation history
    setNavigationHistory((prev) => [
      ...prev,
      {
        path: location.pathname,
        timestamp: new Date().toLocaleTimeString(),
      },
    ]);

    // In a real app, you might:
    // - Send analytics data
    // - Scroll to top of page
    // - Reset some component state
  }, [location.pathname]); // 👈 Re-run when pathname changes

  return (
    <nav className="main-nav">
      <ul>
        {/*
          TODO: Replace these <a> tags with <NavLink> components
          Remember to change "href" to "to"
        */}
        <NavigationItem to="/">Home</NavigationItem>
        <NavigationItem to="/products">Products</NavigationItem>
        <NavigationItem to="/about">About</NavigationItem>
        <NavigationItem to="/contact">Contact</NavigationItem>
        <NavigationItem to="/search">Search</NavigationItem>
        <NavigationItem to="/dashboard">Dashboard</NavigationItem>
      </ul>

      <ul className="nav-history">
        {navigationHistory.map((entry, index) => (
          <li key={index}>
            <span className="history-time">{entry.timestamp}</span>
            <span className="history-path">{entry.path}</span>
          </li>
        ))}
      </ul>
    </nav>
  );
};
