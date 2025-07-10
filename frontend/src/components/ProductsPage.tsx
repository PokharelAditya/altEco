// src/pages/ProductsPage.jsx
import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { useAuthContext } from '../context/AuthContext';
import '../css/products-page.css'

const ProductsPage = () => {
  const { user } = useAuthContext();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      if (!user) return; // Wait for user to be available
      
      setIsLoading(true);
      try {
        const response = await fetch('/api/get-products', {
          headers: {
            'Content-Type': 'application/json',
          }
        });
        const data = await response.json();
        console.log(data);
        setProducts(data);
        
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProducts();
  }, [user?.isLoggedin]);

  return (
    <div className="products-page">
      <div className="products-header">
        <h1>Sustainable Products</h1>
        <p>Discover eco-friendly alternatives that make a positive impact</p>
      </div>

      <div className="products-main">
        <div className="products-info">
          <span className="results-count">
            {products.length} sustainable products available
          </span>
        </div>

        {isLoading ? (
          <div className="loading">
            <div className="spinner"></div>
            <p>Loading sustainable products...</p>
          </div>
        ) : (
          <div className="products-grid">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {!isLoading && products.length === 0 && (
          <div className="no-results">
            <h3>No products available</h3>
            <p>Check back soon for new sustainable products!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
