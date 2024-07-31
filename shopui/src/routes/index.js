import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from '../components/MainPage';
import ProductCatalog from '../components/ProductCatalog';
import ShoppingCart from '../components/ShoppingCart';
import OrderHistory from '../components/OrderHistory';
import CreditCardManagement from '../components/CreditCardManagement';
import AddressManagement from '../components/AddressManagement';
import ProductManagement from '../components/ProductManagement';
import WarehouseManagement from '../components/WarehouseManagement';
import StockManagement from '../components/StockManagement';
import OrderManagement from '../components/OrderManagement';
import DeliveryPlanManagement from '../components/DeliveryPlanManagement';
import CreateAccount from '../components/CreateAccount';
import Navbar from '../components/navbar';

function AppRoutes() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/products" element={<ProductCatalog />} />
        <Route path="/cart" element={<ShoppingCart />} />
        <Route path="/orders" element={<OrderHistory />} />
        <Route path="/credit-cards" element={<CreditCardManagement />} />
        <Route path="/addresses" element={<AddressManagement />} />
        <Route path="/product-management" element={<ProductManagement />} />
        <Route path="/warehouse-management" element={<WarehouseManagement />} />
        <Route path="/stock-management" element={<StockManagement />} />
        <Route path="/order-management" element={<OrderManagement />} />
        <Route path="/delivery-plan-management" element={<DeliveryPlanManagement />} />
        <Route path="/create-account" element={<CreateAccount />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;