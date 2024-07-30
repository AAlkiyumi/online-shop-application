import React, { useState, useEffect } from 'react';
import { getProducts, createProduct, updateProduct, deleteProduct } from '../api/api';

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    brand: '',
    size: '',
    size_unit: '',
    description: '',
    price: ''
  });
  const [currentProductID, setCurrentProductID] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await getProducts();
      setProducts(response.data);
    } catch (error) {
      console.error('Failed to fetch products', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        // Update the address
        await updateProduct(currentProductID, formData);
      } else {
        // Create a new address
        await createProduct(formData);
      }
      // Reset form and state
      setFormData({
        name: '',
        category: '',
        brand: '',
        size: '',
        size_unit: '',
        description: '',
        price: ''
      });
      setIsEditing(false);
      setCurrentProductID(null);
      fetchProducts(); // Refresh the list
    } catch (error) {
      console.error('Failed to create product', error);
    }
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleEdit = (product) => {
    setFormData({
      name: product.name,
      category: product.category,
      brand: product.brand,
      size: product.size,
      size_unit: product.size_unit,
      description: product.description,
      price: product.price
    });
    setIsEditing(true);
    setCurrentProductID(product.prod_ID);
  };

  const handleDelete = async (productId) => {
    try {
      await deleteProduct(productId);
      fetchProducts(); // Refresh the list
    } catch (error) {
      console.error('Failed to delete product', error);
    }
  };

  return (
    <div>
      <h1>Product Management</h1>
      <h2><a href='/'>Home</a></h2>
      <div>
        <h2>{isEditing ? 'Edit Product' : 'Create New Product'}</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input 
              type="text" 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              required 
            />
          </label>
          <br />
          <label>
            Category:
            <select 
              type="text" 
              name="category" 
              value={formData.category} 
              onChange={handleChange} 
              required 
            >
              <option value=''>Select a category</option>
              <option value='Food'>Food</option>
              <option value='Clothing'>Clothing</option>
              <option value='Furniture'>Furniture</option>
              <option value='Electronics'>Electronics</option>
              <option value='Home Essentials'>Home Essentials</option>
              <option value='Sports & Outdoors'>Sports & Outdoors</option>
            </select>
          </label>
          <br />
          <label>
            Brand:
            <input 
              type="text" 
              name="brand" 
              value={formData.brand} 
              onChange={handleChange} 
              required 
            />
          </label>
          <br />
          <label>
            Size:
            <input 
              type="number" 
              name="size" 
              step="any" 
              value={formData.size}
              onChange={handleChange} 
              required 
            />
          </label>
          <br />
          <label>
            Size Unit:
            <input 
              type="text" 
              name="size_unit" 
              value={formData.size_unit} 
              onChange={handleChange} 
              required 
              />
          </label>
          <br />
          <label>
            Description:
            <textarea 
              name="description" 
              value={formData.description}
              onChange={handleChange} 
              required
            />
          </label>
          <br />
          <label>
            Price:
            <input 
              type="number" 
              name="price" 
              step="any" 
              value={formData.price}
              onChange={handleChange} 
              required 
            />
          </label>
          <br />
          <div style={{ display: 'flex', gap: '10px' }}>
            <button type="submit">{isEditing ? 'Update' : 'Create'}</button>
            <button type="button" onClick={() => { setIsEditing(false); setCurrentProductID(null); setFormData({ name: '', category: '', brand: '', size: '', size_unit: '', description: '', price: '' }); }}>Cancel</button>
          </div>
        </form>
      </div>
      <div>
        <h2>Existing Products</h2>
        <ul>
          {products.map(product => (
            <li key={product.prod_ID}>
              <p>Name: {product.name}</p>
              <p>Category: {product.category}</p>
              <p>Brand: {product.brand}</p>
              <p>Size: {product.size} {product.size_unit}</p>
              <p>Description: {product.description}</p>
              <p>Price: ${product.price}</p>
              <button onClick={() => handleEdit(product)}>Edit</button>
              <button onClick={() => handleDelete(product.prod_ID)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProductManagement;