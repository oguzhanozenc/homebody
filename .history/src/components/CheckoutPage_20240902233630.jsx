import React from "react";
import { useSelector } from "react-redux";
import { useShopifyCart } from "../hooks/useShopifyCart";
import { useNavigate } from "react-router-dom";
import "../styles/CheckoutPage.css";

const CheckoutPage = () => {
  const cartItems = useSelector((state) => state.cart.items);
  useEffect(() => {
    console.log("Cart items in ReviewCart component:", cartItems); // Ensure correct data flow
  }, [cartItems]);

  const { handleCheckout, handleRemoveFromCart, loading } = useShopifyCart();
  const [processing, setProcessing] = useState(false);
  const navigate = useNavigate();

  const handleProceedToCheckout = async () => {
    setProcessing(true);
    try {
      await handleCheckout();
    } catch (error) {
      console.error("Checkout failed:", error);
      setProcessing(false);
    }
  };

  const handleBackToCart = () => {
    navigate("/review-cart");
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      <ul className="checkout-items">
        {cartItems.map((item, index) => (
          <li key={index} className="checkout-item">
            <div className="checkout-item-image">
              <img src={item.product.images[0]} alt={item.product.title} />
            </div>
            <div className="checkout-item-details">
              <h3>{item.product.title}</h3>
              <p>{item.product.description}</p>
              <p>Price: ${item.variant.priceV2.amount}</p>
              <p>Quantity: {item.quantity}</p>
              <button onClick={() => handleRemoveFromCart(item.variant.id)}>
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="checkout-actions">
        <button onClick={handleBackToCart} className="checkout-button">
          Back to Cart
        </button>
        <button
          onClick={handleProceedToCheckout}
          disabled={loading || processing || cartItems.length === 0}
          className="checkout-button"
        >
          {processing
            ? "Processing..."
            : loading
            ? "Syncing..."
            : "Proceed to Payment"}
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;
