export const Product = (props) => {
  const { product, addToCart, ...rest } = props;

  const onClick = () => {
    // TODO: Implement onClick function
    addToCart(product);
  };

  return (
    <div className="product" {...rest}>
      <div>
        <h3>{product.name}</h3>
        <p>Price: ${product.price}</p>
      </div>

      <button onClick={onClick}>Add to Cart</button>
    </div>
  );
};
