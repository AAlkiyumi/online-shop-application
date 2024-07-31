import React, { useState, useEffect } from 'react';
import {
  getOrders,
  createOrder,
  updateOrder,
  deleteOrder,
  getOrderItems,
  createOrderItem,
  updateOrderItem,
  deleteOrderItem
} from '../api/api';

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [orderItems, setOrderItems] = useState([]);
  const [newOrder, setNewOrder] = useState({ order_date: '', status: '', total_price: '', credit_card: '', customer: '' });
  const [editOrder, setEditOrder] = useState(null);
  const [newOrderItem, setNewOrderItem] = useState({ product: '', quantity: '', order: '' });
  const [editOrderItem, setEditOrderItem] = useState(null);

  useEffect(() => {
    fetchOrders();
    fetchOrderItems();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await getOrders();
      setOrders(response.data);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    }
  };

  const fetchOrderItems = async () => {
    try {
      const response = await getOrderItems();
      setOrderItems(response.data);
    } catch (error) {
      console.error('Failed to fetch order items:', error);
    }
  };

  const handleCreateOrder = async () => {
    try {
      await createOrder(newOrder);
      fetchOrders();
      setNewOrder({ order_date: '', status: '', total_price: '', credit_card: '', customer: '' });
    } catch (error) {
      console.error('Failed to create order:', error);
    }
  };

  const handleUpdateOrder = async () => {
    if (!editOrder || !editOrder.order_ID) {
      console.error('No order data to update');
      return;
    }
    try {
      await updateOrder(editOrder.order_ID, editOrder);
      fetchOrders();
      setEditOrder(null);
    } catch (error) {
      console.error('Failed to update order:', error);
    }
  };

  const handleDeleteOrder = async (id) => {
    try {
      await deleteOrder(id);
      fetchOrders();
    } catch (error) {
      console.error('Failed to delete order:', error);
    }
  };

  const handleCreateOrderItem = async () => {
    try {
      await createOrderItem(newOrderItem);
      fetchOrderItems();
      setNewOrderItem({ product: '', quantity: '', order: '' });
    } catch (error) {
      console.error('Failed to create order item:', error);
    }
  };

  const handleUpdateOrderItem = async () => {
    if (!editOrderItem || !editOrderItem.id) {
      console.error('No order item data to update');
      return;
    }
    try {
      await updateOrderItem(editOrderItem.id, editOrderItem);
      fetchOrderItems();
      setEditOrderItem(null);
    } catch (error) {
      console.error('Failed to update order item:', error);
    }
  };

  const handleDeleteOrderItem = async (id) => {
    try {
      await deleteOrderItem(id);
      fetchOrderItems();
    } catch (error) {
      console.error('Failed to delete order item:', error);
    }
  };

  return (
    <div className="order-management-container">
      <h1>Order Management</h1>
      <div className="order-form">
        <h2>Create New Order</h2>
        <input
          type="date"
          placeholder="Order Date"
          value={newOrder.order_date}
          onChange={(e) => setNewOrder({ ...newOrder, order_date: e.target.value })}
        />
        <input
          type="text"
          placeholder="Status"
          value={newOrder.status}
          onChange={(e) => setNewOrder({ ...newOrder, status: e.target.value })}
        />
        <input
          type="number"
          placeholder="Total Price"
          value={newOrder.total_price}
          onChange={(e) => setNewOrder({ ...newOrder, total_price: e.target.value })}
        />
        <input
          type="text"
          placeholder="Credit Card ID"
          value={newOrder.credit_card}
          onChange={(e) => setNewOrder({ ...newOrder, credit_card: e.target.value })}
        />
        <input
          type="text"
          placeholder="Customer ID"
          value={newOrder.customer}
          onChange={(e) => setNewOrder({ ...newOrder, customer: e.target.value })}
        />
        <button onClick={handleCreateOrder}>Create Order</button>
      </div>

      {editOrder && (
        <div className="order-form">
          <h2>Edit Order</h2>
          <input
            type="date"
            placeholder="Order Date"
            value={editOrder.order_date}
            onChange={(e) => setEditOrder({ ...editOrder, order_date: e.target.value })}
          />
          <input
            type="text"
            placeholder="Status"
            value={editOrder.status}
            onChange={(e) => setEditOrder({ ...editOrder, status: e.target.value })}
          />
          <input
            type="number"
            placeholder="Total Price"
            value={editOrder.total_price}
            onChange={(e) => setEditOrder({ ...editOrder, total_price: e.target.value })}
          />
          <input
            type="text"
            placeholder="Credit Card ID"
            value={editOrder.credit_card}
            onChange={(e) => setEditOrder({ ...editOrder, credit_card: e.target.value })}
          />
          <input
            type="text"
            placeholder="Customer ID"
            value={editOrder.customer}
            onChange={(e) => setEditOrder({ ...editOrder, customer: e.target.value })}
          />
          <button onClick={handleUpdateOrder}>Update Order</button>
        </div>
      )}

      <div className="order-list">
        <h2>Order List</h2>
        <ul>
          {orders.map(order => (
            <li key={order.order_ID}>
              {order.order_date} - {order.status} - ${order.total_price}
              <button onClick={() => setEditOrder(order)}>Edit</button>
              <button onClick={() => handleDeleteOrder(order.order_ID)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>

      <div className="order-item-form">
        <h2>Create New Order Item</h2>
        <input
          type="text"
          placeholder="Product ID"
          value={newOrderItem.product}
          onChange={(e) => setNewOrderItem({ ...newOrderItem, product: e.target.value })}
        />
        <input
          type="number"
          placeholder="Quantity"
          value={newOrderItem.quantity}
          onChange={(e) => setNewOrderItem({ ...newOrderItem, quantity: e.target.value })}
        />
        <input
          type="text"
          placeholder="Order ID"
          value={newOrderItem.order}
          onChange={(e) => setNewOrderItem({ ...newOrderItem, order: e.target.value })}
        />
        <button onClick={handleCreateOrderItem}>Create Order Item</button>
      </div>

      {editOrderItem && (
        <div className="order-item-form">
          <h2>Edit Order Item</h2>
          <input
            type="text"
            placeholder="Product ID"
            value={editOrderItem.product}
            onChange={(e) => setEditOrderItem({ ...editOrderItem, product: e.target.value })}
          />
          <input
            type="number"
            placeholder="Quantity"
            value={editOrderItem.quantity}
            onChange={(e) => setEditOrderItem({ ...editOrderItem, quantity: e.target.value })}
          />
          <input
            type="text"
            placeholder="Order ID"
            value={editOrderItem.order}
            onChange={(e) => setEditOrderItem({ ...editOrderItem, order: e.target.value })}
          />
          <button onClick={handleUpdateOrderItem}>Update Order Item</button>
        </div>
      )}

      <div className="order-item-list">
        <h2>Order Item List</h2>
        <ul>
          {orderItems.map(item => (
            <li key={item.id}>
              Product ID: {item.product}, Quantity: {item.quantity}, Order ID: {item.order}
              <button onClick={() => setEditOrderItem(item)}>Edit</button>
              <button onClick={() => handleDeleteOrderItem(item.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default OrderManagement;