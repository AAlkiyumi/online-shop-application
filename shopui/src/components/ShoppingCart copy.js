import React, { useState, useEffect } from 'react';
import { getCartItems, addToCart, updateCartItem, removeFromCart, placeOrder } from '../api/api';

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [quantity, setQuantity] = useState({});
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const response = await getCartItems();
      setCartItems(response.data);
      // Initialize quantity state
      const initialQuantity = response.data.reduce((acc, item) => {
        acc[item.id] = item.quantity;
        return acc;
      }, {});
      setQuantity(initialQuantity);
    } catch (error) {
      console.error('Failed to fetch cart items', error);
    }
  };

  const handleQuantityChange = (id, value) => {
    setQuantity(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleUpdate = async (id) => {
    try {
      await updateCartItem(id, { quantity: quantity[id] });
      fetchCartItems(); // Refresh the cart
    } catch (error) {
      console.error('Failed to update cart item', error);
    }
  };

  const handleRemove = async (id) => {
    try {
      await removeFromCart(id);
      fetchCartItems(); // Refresh the cart
    } catch (error) {
      console.error('Failed to remove cart item', error);
    }
  };

  const handlePlaceOrder = async () => {
    setIsPlacingOrder(true);
    try {
      await placeOrder();
      setCartItems([]);
      setQuantity({});
    } catch (error) {
      console.error('Failed to place order', error);
    } finally {
      setIsPlacingOrder(false);
    }
  };

  return (
    <div>
      <h1>Shopping Cart</h1>
      {cartItems.length > 0 ? (
        <div>
          <ul>
            {cartItems.map(item => (
              <li key={item.id}>
                <p>Product: {item.productName}</p>
                <p>Price: ${item.price}</p>
                <label>
                  Quantity:
                  <input
                    type="number"
                    value={quantity[item.id]}
                    onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                    min="1"
                  />
                </label>
                <button onClick={() => handleUpdate(item.id)}>Update</button>
                <button onClick={() => handleRemove(item.id)}>Remove</button>
              </li>
            ))}
          </ul>
          <button onClick={handlePlaceOrder} disabled={isPlacingOrder}>
            {isPlacingOrder ? 'Placing Order...' : 'Place Order'}
          </button>
        </div>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
    <a href="/"><button>Home</button></a>
  );
};

export default ShoppingCart;