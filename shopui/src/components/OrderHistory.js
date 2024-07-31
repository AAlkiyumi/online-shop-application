import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.css';
import { getOrders } from '../api/api';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await getOrders();
        setOrders(response.data);
      } catch (err) {
        setError('Failed to fetch order history.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Order History</h1>
      {orders.length === 0 ? (
        <p>No orders found. Check back later!</p>
      ) : (
        <ul>
          {orders.map(order => (
            <li key={order.order_ID}>
              <p>Order ID: {order.order_ID}</p>
              <p>Order Date: {new Date(order.order_date).toLocaleDateString()}</p>
              <p>Status: {order.status}</p>
              <p>Total Price: ${order.total_price}</p>
              {/* Add more details if needed */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrderHistory;