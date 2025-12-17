/*
  ============================================================================
  REACT ROUTER v7 EXERCISES
  ============================================================================

  EXERCISE OVERVIEW:
  ------------------
  ROUTING BASICS:
  1. Exercise 1 (Home.jsx): Use Link for navigation
  2. Exercise 2 (Navigation.jsx): Use NavLink for nav with active states
  3. Exercise 3 (Products.jsx): Create dynamic links to product pages
  4. Exercise 4 (ProductDetail.jsx): useParams + useEffect + useState (data fetching)
  5. Exercise 5 (Contact.jsx): Programmatic navigation with useNavigate
  6. Exercise 6 (Layout.jsx): Use Outlet for nested routes
  7. Exercise 7 (Below): Set up Routes and Route components

  REACT ROUTER + HOOKS:
  8. Exercise 8 (Search.jsx): useSearchParams + useState (URL query params)
  9. Exercise 9 (Dashboard.jsx): useLocation + useEffect (tracking navigation)

  ============================================================================
*/

import { BrowserRouter, Routes, Route } from "react-router";
import "./App.css";
import { Layout } from "./components";
import {
  Home,
  About,
  Contact,
  Products,
  ProductDetail,
  Search,
  Dashboard,
  NotFound,
} from "./pages";

/*
  EXERCISE 7: Setting Up Routes
  -----------------------------
  Below you need to set up the routing structure using Routes and Route.

  Steps:
  1. Import BrowserRouter, Routes, and Route from "react-router"
     (BrowserRouter is typically imported in main.jsx - see that file)
  2. Wrap your routes with <Routes>
  3. Create a parent <Route> with element={<Layout />} for the layout wrapper
  4. Nest child routes inside for each page

  Route structure should be:
  - "/" -> Home
  - "/about" -> About
  - "/contact" -> Contact
  - "/products" -> Products
  - "/products/:productId" -> ProductDetail (note the :productId parameter!)
  - "/search" -> Search
  - "/dashboard" -> Dashboard
  - "*" -> NotFound (catch-all for 404 pages)
*/

// TODO: Import Routes and Route from "react-router"

function App() {
  return (
    <>
      {/*
        TODO: Set up the routing structure

        Example structure:
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            ... more routes
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>

        Note: The parent Route without a path wraps all children with the Layout.
        The Layout component uses <Outlet /> to render the matched child route.
      */}

      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:productId" element={<ProductDetail />} />
          <Route path="/search" element={<Search />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>

      {/* Temporary: Remove this once you add the Routes */}
      {/* <Layout />*/}
    </>
  );
}

export default App;
