/* 
  EXERCISE 3: Dynamic Links
  -------------------------
  This page displays a list of products. Each product should link 
  to its own detail page using dynamic route parameters.
  
  Steps:
  1. Import Link from "react-router"
  2. Create a Link for each product that goes to "/products/:productId"
*/

// TODO: Import Link from "react-router"
import { products } from "../data/products";

export const Products = () => {
  return (
    <div className="page products">
      <h1>Our Products</h1>
      <ul className="product-list">
        {products.map((product) => (
          <li key={product.id}>
            {/* 
              TODO: Wrap the product info in a Link component
              The link should go to `/products/${product.id}`
            */}
            <span className="product-name">{product.name}</span>
            <span className="product-price">${product.price}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
