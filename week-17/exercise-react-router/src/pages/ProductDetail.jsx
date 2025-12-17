/* 
  EXERCISE 4: useParams + useEffect + useState
  ---------------------------------------------
  This page demonstrates a common pattern: fetching data based on URL params.
  
  In real apps, you often need to:
  1. Get the ID from the URL (useParams)
  2. Fetch data when the component mounts or ID changes (useEffect)
  3. Store the data in state (useState)
  
  Steps:
  1. Import useParams from "react-router"
  2. Import useState and useEffect from "react"
  3. Create state for: product, loading, error
  4. Use useEffect to "fetch" data when productId changes
  5. Handle loading and error states in the UI
*/

// TODO: Import useParams from "react-router"
// TODO: Import useState and useEffect from "react"
import { fetchProductById } from "../utilities/fetchProductById";

export const ProductDetail = () => {
  // TODO: Get the URL parameters using useParams()
  // const { productId } = useParams();

  // TODO: Create state for product, loading, and error
  // const [product, setProduct] = useState(null);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

  // TODO: Use useEffect to fetch the product when productId changes
  /*
  useEffect(() => {
    // Reset states when starting a new fetch
    setLoading(true);
    setError(null);

    fetchProductById(productId)
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [productId]); // IMPORTANT: Re-run when productId changes!
  */

  // Temporary placeholder - remove when you implement the above
  const product = null;
  const loading = false;
  const error = null;

  // TODO: Handle loading state
  if (loading) {
    return (
      <div className="page product-detail">
        <p>Loading product...</p>
      </div>
    );
  }

  // TODO: Handle error state
  if (error) {
    return (
      <div className="page product-detail">
        <h1>Error</h1>
        <p className="error-message">{error}</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="page product-detail">
        <h1>Product Not Found</h1>
        <p>Sorry, we couldn't find that product.</p>
      </div>
    );
  }

  return (
    <div className="page product-detail">
      <h1>{product.name}</h1>
      <p className="price">Price: ${product.price}</p>
      <p className="description">
        This is a great {product.name.toLowerCase()}! Lorem ipsum dolor sit
        amet, consectetur adipiscing elit.
      </p>

      {/* 
        BONUS EXERCISE: Add a "Go Back" button using useNavigate
        navigate(-1) goes back one step in history
      */}
    </div>
  );
};
