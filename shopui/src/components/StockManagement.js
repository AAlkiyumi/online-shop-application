import React, { useState, useEffect } from 'react';
import { getStock, createStock, updateStock, deleteStock, getProducts, getWarehouses } from '../api/api';

const StockManagement = () => {
  const [stocks, setStocks] = useState([]);
  const [newStock, setNewStock] = useState({ product: '', warehouse: '', quantity: '' });
  const [editStock, setEditStock] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [products, setProducts] = useState([]);
  const [warehouses, setWarehouses] = useState([]);

  useEffect(() => {
    fetchStocks();
    fetchProducts();
    fetchWarehouses();
  }, []);

  const fetchStocks = async () => {
    try {
      const response = await getStock();
      setStocks(response.data);
    } catch (error) {
      console.error('Failed to fetch stocks:', error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await getProducts();
      setProducts(response.data);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    }
  };

  const fetchWarehouses = async () => {
    try {
      const response = await getWarehouses();
      setWarehouses(response.data);
    } catch (error) {
      console.error('Failed to fetch warehouses:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (isEditing) {
      setEditStock((prev) => ({ ...prev, [name]: value }));
    } else {
      setNewStock((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleCreate = async () => {
    try {
      await createStock(newStock);
      fetchStocks(); // Refresh the list
      setNewStock({ product: '', warehouse: '', quantity: '' });
    } catch (error) {
      console.error('Failed to create stock:', error);
    }
  };

  const handleEdit = (stock) => {
    setEditStock({ ...stock }); // Create a copy of the stock object
    setIsEditing(true);
  };

  const handleUpdate = async () => {
    if (!editStock || !editStock.id) {
      console.error('No stock data to update');
      return;
    }
    try {
      console.log('Updating stock with data:', editStock);
      await updateStock(editStock.id, editStock);
      fetchStocks(); // Refresh the list
      setIsEditing(false);
      setEditStock(null);
    } catch (error) {
      console.error('Failed to update stock:', error);
    }
  };

  const handleDelete = async (stockId) => {
    try {
      await deleteStock(stockId);
      fetchStocks(); // Refresh the list
    } catch (error) {
      console.error('Failed to delete stock:', error);
    }
  };

  return (
    <div>
      <h1>Stock Management</h1>
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            isEditing ? handleUpdate() : handleCreate();
          }}
        >
          <h2>{isEditing ? 'Edit Stock' : 'Create New Stock'}</h2>
          <br/>
          <label>
            Product:
            <select
              name="product"
              value={isEditing ? editStock.product : newStock.product}
              onChange={handleChange}
              required
            >
              <option value="">Select Product</option>
              {products.map((product) => (
                <option key={product.prod_ID} value={product.prod_ID}>
                  {product.name}
                </option>
              ))}
            </select>
          </label>
          <br />
          <label>
            Warehouse:
            <select
              name="warehouse"
              value={isEditing ? editStock.warehouse : newStock.warehouse}
              onChange={handleChange}
              required
            >
              <option value="">Select Warehouse</option>
              {warehouses.map((warehouse) => (
                <option key={warehouse.warehouse_ID} value={warehouse.warehouse_ID}>
                  {warehouse.address}
                </option>
              ))}
            </select>
          </label>
          <br />
          <label>
            Quantity:
            <input
              type="number"
              name="quantity"
              value={isEditing ? editStock.quantity : newStock.quantity}
              onChange={handleChange}
              required
            />
          </label>
          <br />
          <div style={{ display: 'flex', gap: '10px' }}>
            <button type="submit">{isEditing ? 'Update' : 'Create'}</button>
            <button type="button" onClick={() => { setIsEditing(false); setEditStock(null); setNewStock( {product: '', warehouse: '', quantity: ''} ); }} >Cancel</button>
          </div>
        </form>
      </div>
      <div>
        <h2>Existing Stocks</h2>
        <ul>
          {stocks.map((stock) => (
            <li key={stock.id}>
              <p>Product: {products.find((p) => p.prod_ID === stock.product)?.name || 'Unknown'}</p>
              <p>Warehouse: {warehouses.find((w) => w.warehouse_ID === stock.warehouse)?.address || 'Unknown'}</p>
              <p>Quantity: {stock.quantity}</p>
              <button onClick={() => handleEdit(stock)}>Edit</button>
              <button onClick={() => handleDelete(stock.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default StockManagement;