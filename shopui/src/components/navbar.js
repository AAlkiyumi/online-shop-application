import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={{ backgroundColor: '#333', padding: '10px', position: 'fixed', top: 0, width: '100%', zIndex: 1000 }}>
      <ul style={{ listStyleType: 'none', margin: 0, padding: 0, display: 'flex', justifyContent: 'space-around' }}>
        <li><Link style={{ color: 'white', textDecoration: 'none' }} to="/">Home</Link></li>
        <li><Link style={{ color: 'white', textDecoration: 'none' }} to="/product-management">Product Management</Link></li>
        <li><Link style={{ color: 'white', textDecoration: 'none' }} to="/warehouse-management">Warehouse Management</Link></li>
        <li><Link style={{ color: 'white', textDecoration: 'none' }} to="/stock-management">Stock Management</Link></li>
        <li><Link style={{ color: 'white', textDecoration: 'none' }} to="/order-management">Order Management</Link></li>
        <li><Link style={{ color: 'white', textDecoration: 'none' }} to="/delivery-plan-management">Delivery Plan Management</Link></li>
        <li><Link style={{ color: 'white', textDecoration: 'none' }} to="/create-account">Create Account</Link></li>
        <li><Link style={{ color: 'white', textDecoration: 'none' }} to="/products">Place Order</Link></li>
        <li><Link style={{ color: 'white', textDecoration: 'none' }} to="/orders">Order History</Link></li>
        <li><Link style={{ color: 'white', textDecoration: 'none' }} to="/credit-cards">Credit Card Management</Link></li>
        <li><Link style={{ color: 'white', textDecoration: 'none' }} to="/addresses">Address Management</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
