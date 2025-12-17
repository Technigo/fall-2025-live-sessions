# React Router Learning Project

## Overview

### Routing Basics (Exercises 1-7)

| Exercise | File                        | Concept                                                |
| -------- | --------------------------- | ------------------------------------------------------ |
| 1        | `pages/Home.jsx`            | `Link` - Basic navigation                              |
| 2        | `components/Navigation.jsx` | `NavLink` - Navigation with active states              |
| 3        | `pages/Products.jsx`        | Dynamic `Link` - Links with parameters                 |
| 4        | `pages/ProductDetail.jsx`   | `useParams` + `useEffect` + `useState` - Data fetching |
| 5        | `pages/Contact.jsx`         | `useNavigate` - Programmatic navigation                |
| 6        | `components/Layout.jsx`     | `Outlet` - Nested routes                               |
| 7        | `App.jsx` + `main.jsx`      | `Routes`, `Route`, `BrowserRouter` - Setup             |

### Bonus: React Router + Hooks (Exercises 8-9)

| Exercise | File                  | Concept                                           |
| -------- | --------------------- | ------------------------------------------------- |
| 8        | `pages/Search.jsx`    | `useSearchParams` + `useState` - URL query params |
| 9        | `pages/Dashboard.jsx` | `useLocation` + `useEffect` - Track navigation    |

---

## Key Concepts

### React Router Imports

```javascript
import {
  BrowserRouter, // Wraps your app to enable routing
  Routes, // Container for Route components
  Route, // Defines a route path and component
  Link, // Navigation without page reload
  NavLink, // Link with active state styling
  Outlet, // Renders child routes
  useParams, // Access URL parameters (/products/:id)
  useNavigate, // Programmatic navigation
  useSearchParams, // Read/write URL query params (?q=search)
  useLocation, // Get current location info
} from "react-router";
```

### Common Patterns

#### Pattern 1: Data Fetching with useParams + useEffect

```javascript
const { productId } = useParams();
const [product, setProduct] = useState(null);
const [loading, setLoading] = useState(true);

useEffect(() => {
  fetchProduct(productId)
    .then(setProduct)
    .finally(() => setLoading(false));
}, [productId]); // Re-run when ID changes!
```

#### Pattern 2: URL Search Params

```javascript
const [searchParams, setSearchParams] = useSearchParams();
const query = searchParams.get("q") || "";

// Update URL: /search?q=laptop
setSearchParams({ q: "laptop" });
```

#### Pattern 3: React to Navigation

```javascript
const location = useLocation();

useEffect(() => {
  console.log("Page changed to:", location.pathname);
  // Analytics, scroll to top, etc.
}, [location.pathname]);
```

---

## Project Structure

```
src/
├── components/
│   ├── Layout.jsx        # Exercise 6: Outlet
│   ├── Navigation.jsx    # Exercise 2: NavLink
│   └── index.js
├── pages/
│   ├── Home.jsx          # Exercise 1: Link
│   ├── About.jsx
│   ├── Contact.jsx       # Exercise 5: useNavigate
│   ├── Products.jsx      # Exercise 3: Dynamic Links
│   ├── ProductDetail.jsx # Exercise 4: useParams + useEffect
│   ├── Search.jsx        # Exercise 8: useSearchParams
│   ├── Dashboard.jsx     # Exercise 9: useLocation + useEffect
│   ├── NotFound.jsx
│   └── index.js
├── data/
│   └── products.js
├── App.jsx               # Exercise 7: Routes setup
└── main.jsx              # Exercise 7: BrowserRouter
```

---

React Router Documentation: [https://reactrouter.com/](https://reactrouter.com/)
