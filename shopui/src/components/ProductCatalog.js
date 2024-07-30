import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ShoppingCart from './ShoppingCart';

const API_URL = 'http://127.0.0.1:8000';

const ProductCatalog = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${API_URL}/products/`);
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.prod_ID === product.prod_ID);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.prod_ID === product.prod_ID ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (prod_ID) => {
    setCart((prevCart) => prevCart.filter((item) => item.prod_ID !== prod_ID));
  };

  const updateCartQuantity = (prod_ID, quantity) => {
    if (quantity < 1) {
      return; // Do not update if the new quantity is less than 1
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.prod_ID === prod_ID ? { ...item, quantity: quantity } : item
      )
    );
  };

  const handleCheckout = async () => {
    // Implement the checkout functionality to create an order and order items
    console.log('Proceed to checkout with cart items:', cart);
  };

  return (
    <div className="product-catalog">
      <h1>Product Catalog</h1>
      <h2><a href='/'>Home</a></h2>
      <div className="products">
        {products.map((product) => (
          <div key={product.prod_ID} className="product">
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>${product.price}</p>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>
      <ShoppingCart
        cart={cart}
        updateCartQuantity={updateCartQuantity}
        removeFromCart={removeFromCart}
        handleCheckout={handleCheckout}
      />
    </div>
  );
};

export default ProductCatalog;