import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000';

const ShoppingCart = ({ cart = [], updateCartQuantity, removeFromCart, handleCheckout }) => {
  const [deliveryPlan, setDeliveryPlan] = useState('Standard');
  const [creditCards, setCreditCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);
  const [currentCustomer, setCurrentCustomer] = useState(null);

  // Fetch available credit cards
  useEffect(() => {
    const fetchCreditCards = async () => {
      try {
        const response = await axios.get(`${API_URL}/creditcards/`);
        setCreditCards(response.data || []);
      } catch (error) {
        console.error('Error fetching credit cards:', error);
      }
    };

    fetchCreditCards();
  }, []);

  // Fetch current customer data
  useEffect(() => {
    const fetchCurrentCustomer = async () => {
      try {
        const response = await axios.get(`${API_URL}/customers/1/`); // Replace with actual customer ID
        setCurrentCustomer(response.data || null);
      } catch (error) {
        console.error('Error fetching current customer:', error);
      }
    };

    fetchCurrentCustomer();
  }, []);

  // Calculate total price
  useEffect(() => {
    if (Array.isArray(cart)) {
      const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      setTotalPrice(total);
    }
  }, [cart]);

  const handleCheckoutClick = async () => {
    if (!selectedCard) {
      alert('Please select a payment method.');
      return;
    }

    if (!currentCustomer) {
      alert('Error fetching customer data.');
      return;
    }

    try {
      // Create order
      const orderResponse = await axios.post(`${API_URL}/custorders/`, {
        order_date: new Date().toISOString().split('T')[0],
        status: 'Pending',
        total_price: totalPrice,
        credit_card: selectedCard,
        customer: currentCustomer.cust_ID,
      });

      const orderId = orderResponse.data.order_ID;

      // Create order items
      for (const item of cart) {
        await axios.post(`${API_URL}/orderitems/`, {
          product: item.prod_ID,
          quantity: item.quantity,
          order: orderId,
        });
      }

      // Update customer balance
      await axios.patch(`${API_URL}/customers/${currentCustomer.cust_ID}/`, {
        balance: currentCustomer.balance - totalPrice
      });

      // Update stock quantities
      // for (const item of cart) {
      //   await axios.patch(`${API_URL}/stock/${item.prod_ID}/`, {
      //     quantity: item.quantity // Reduce quantity in the warehouse
      //   });
      // }

      alert('Order placed successfully!');
      handleCheckout(); // Clear cart after successful order
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order.');
    }
  };

  return (
    <div className="shopping-cart">
      <h2>Shopping Cart</h2>
      {Array.isArray(cart) && cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul>
            {Array.isArray(cart) && cart.map(item => (
              <li key={item.prod_ID}>
                {item.name} - {item.quantity} x ${item.price}
                <button onClick={() => removeFromCart(item.prod_ID)}>Remove</button>
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => updateCartQuantity(item.prod_ID, parseInt(e.target.value, 10))}
                />
              </li>
            ))}
          </ul>
          <p>Total Price: ${totalPrice.toFixed(2)}</p>
          <div>
            <label htmlFor="deliveryPlan">Delivery Plan:</label>
            <select
              id="deliveryPlan"
              value={deliveryPlan}
              onChange={(e) => setDeliveryPlan(e.target.value)}
            >
              <option value="Standard">Standard</option>
              <option value="Express">Express</option>
            </select>
          </div>
          <div>
            <label htmlFor="creditCard">Select Payment Method:</label>
            <select
              id="creditCard"
              value={selectedCard}
              onChange={(e) => setSelectedCard(e.target.value)}
            >
              <option value="">Select a card</option>
              {Array.isArray(creditCards) && creditCards.map(card => (
                <option key={card.card_no} value={card.card_no}>
                  {card.card_type} ending in {String(card.card_no).slice(-4)}
                </option>
              ))}
            </select>
          </div>
          <button onClick={handleCheckoutClick}>Checkout</button>
        </>
      )}
      <a href="/"><button>Home</button></a>
    </div>
  );
};

export default ShoppingCart;