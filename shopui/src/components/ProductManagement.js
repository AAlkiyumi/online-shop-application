import React, { useState, useEffect } from 'react';
import { getProducts, createProduct, updateProduct, deleteProduct } from '../api/api';

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: '',
    brand: '',
    size: '',
    size_unit: '',
    description: '',
    price: ''
  });
  const [editProduct, setEditProduct] = useState(null);
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (isEditing) {
      setEditProduct(prev => ({ ...prev, [name]: value }));
    } else {
      setNewProduct(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleCreate = async () => {
    try {
      await createProduct(newProduct);
      fetchProducts(); // Refresh the list
      setNewProduct({
        name: '',
        category: '',
        brand: '',
        size: '',
        size_unit: '',
        description: '',
        price: ''
      });
    } catch (error) {
      console.error('Failed to create product', error);
    }
  };

  const handleEdit = (product) => {
    setEditProduct(product);
    setIsEditing(true);
  };

  const handleUpdate = async () => {
    try {
      await updateProduct(editProduct.prod_ID, editProduct);
      fetchProducts(); // Refresh the list
      setIsEditing(false);
      setEditProduct(null);
    } catch (error) {
      console.error('Failed to update product', error);
    }
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
        <form onSubmit={(e) => {
          e.preventDefault();
          isEditing ? handleUpdate() : handleCreate();
        }}>
          <label>
            Name:
            <input type="text" name="name" value={isEditing ? editProduct.name : newProduct.name} onChange={handleChange} required />
          </label>
          <br />
          <label>
            Category:
            <input type="text" name="category" value={isEditing ? editProduct.category : newProduct.category} onChange={handleChange} required />
          </label>
          <br />
          <label>
            Brand:
            <input type="text" name="brand" value={isEditing ? editProduct.brand : newProduct.brand} onChange={handleChange} required />
          </label>
          <br />
          <label>
            Size:
            <input type="number" name="size" step="any" value={isEditing ? editProduct.size : newProduct.size} onChange={handleChange} required />
          </label>
          <br />
          <label>
            Size Unit:
            <input type="text" name="size_unit" value={isEditing ? editProduct.size_unit : newProduct.size_unit} onChange={handleChange} required />
          </label>
          <br />
          <label>
            Description:
            <textarea name="description" value={isEditing ? editProduct.description : newProduct.description} onChange={handleChange} required />
          </label>
          <br />
          <label>
            Price:
            <input type="number" name="price" step="any" value={isEditing ? editProduct.price : newProduct.price} onChange={handleChange} required />
          </label>
          <br />
          <button type="submit">{isEditing ? 'Update Product' : 'Create Product'}</button>
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