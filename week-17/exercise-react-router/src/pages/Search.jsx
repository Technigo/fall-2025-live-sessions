/* 
  EXERCISE 8: useSearchParams + useState
  ---------------------------------------
  Learn to work with URL query parameters (e.g., /search?q=laptop&sort=price)
  
  useSearchParams is like useState, but for URL query strings!
  - Reading: searchParams.get("q") gets the value of ?q=...
  - Writing: setSearchParams({ q: "laptop" }) updates the URL
  
  Steps:
  1. Import useSearchParams from "react-router"
  2. Get the current search query from URL params
  3. Filter products based on the search query
  4. Update the URL when the user types in the search box
*/

// TODO: Import useSearchParams from "react-router"
import { useState } from "react";
import { products } from "../data/products";

export const Search = () => {
  // TODO: Replace useState with useSearchParams
  // const [searchParams, setSearchParams] = useSearchParams();
  // const query = searchParams.get("q") || "";

  // Temporary: using local state (replace with useSearchParams)
  const [query, setQuery] = useState("");

  // Filter products based on search query
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(query.toLowerCase())
  );

  const handleSearch = (e) => {
    const newQuery = e.target.value;

    // TODO: Update URL params instead of local state
    // setSearchParams(newQuery ? { q: newQuery } : {});

    // Temporary: using local state (replace with above)
    setQuery(newQuery);
  };

  return (
    <div className="page search">
      <h1>Search Products</h1>

      <div className="search-box">
        <input
          type="text"
          placeholder="Search products..."
          value={query}
          onChange={handleSearch}
        />
      </div>

      {/* 
        WHY useSearchParams instead of useState?
        ----------------------------------------
        1. URL is shareable - users can bookmark or share search results
        2. Browser back/forward works with search history
        3. Page refresh preserves the search query
        
        Try it: After implementing useSearchParams, search for something,
        then refresh the page - the search should persist!
      */}

      <div className="search-results">
        <p>
          {filteredProducts.length} product(s) found
          {query && ` for "${query}"`}
        </p>

        <ul className="product-list">
          {filteredProducts.map((product) => (
            <li key={product.id}>
              <span className="product-name">{product.name}</span>
              <span className="product-price">${product.price}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
