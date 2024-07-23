import React from 'react';
import { Link } from 'react-router-dom';

function MainPage() {
  return (
    <div>
      <h1>Main Page</h1>
      <h2>For Staff:</h2>
      <ul>
        <li><Link to="/product-management">Product Management</Link></li>
        <li><Link to="/warehouse-management">Warehouse Management</Link></li>
        <li><Link to="/stock-management">Stock Management</Link></li>
        <li><Link to="/order-management">Order Management</Link></li>
        <li><Link to="/delivery-plan-management">Delivery Plan Management</Link></li>
      </ul>
      <h2>For Customers:</h2>
      <ul>
        <li><Link to="/products">Product Catalog</Link></li>
        <li><Link to="/cart">Shopping Cart</Link></li>
        <li><Link to="/orders">Order History</Link></li>
        <li><Link to="/credit-cards">Credit Card Management</Link></li>
        <li><Link to="/addresses">Address Management</Link></li>
      </ul>
    </div>
  );
}

export default MainPage;