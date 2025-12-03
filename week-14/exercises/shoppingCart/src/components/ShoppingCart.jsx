import { useState } from "react";
import { Product } from "./Product";
import { PRODUCTS } from "../../productsData";

/*
 Bonus:
 1. Implement a feature to clear the cart
 2. POST cart to https://jsonplaceholder.typicode.com/posts
 3. Add loading state while POSTing
 4. Handle potential errors during POST request
*/

export const ShoppingCart = () => {
  // TODO: Create state for cart items
  // Hint: Could be an array of { id, name, price, quantity }
  // Or an object like { [id]: quantity }
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    // TODO: Add product to cart
    // If already in cart, increase quantity
    // If not, add with quantity 1
    setCart((prev) => {
      const existingItem = prev.find((item) => item.id === product.id);

      if (existingItem) {
        return prev.map((item) => {
          if (item.id === product.id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId) => {
    // TODO: Remove item completely from cart
  };

  const updateQuantity = (productId, newQuantity) => {
    // TODO: Update quantity for an item
    // If quantity becomes 0, remove the item
  };

  const calculateTotal = () => {
    // TODO: Calculate and return total price
    return 0;
  };

  return (
    <div className="shopping-cart">
      {/* Product List */}
      <div>
        <h2>Products</h2>

        {PRODUCTS.map((product) => (
          <Product key={product.id} product={product} addToCart={addToCart} />
        ))}
      </div>

      {/* Cart */}
      <div>
        <h2>Your Cart</h2>
        {/* TODO: If cart is empty, show "Your cart is empty" */}
        {/* TODO: Map through cart items and display: */}
        {/*   - Product name */}
        {/*   - Quantity with +/- buttons */}
        {/*   - Item subtotal (price × quantity) */}
        {/*   - Remove button */}

        {cart.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <>
            {cart.map((item) => (
              <div key={item.id} className="cart">
                <strong>{item.name}</strong>

                <div className="cart-content">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    -
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    +
                  </button>

                  <span className="cart-total">
                    ${item.price * item.quantity}
                  </span>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="cart-removeBtn"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </>
        )}

        <hr />
        <strong>Total: ${calculateTotal()}</strong>
      </div>
    </div>
  );
};
