// src/components/ProductCard.jsx
import React from 'react';
import '../css/products-card.css';

const ProductCard = ({ product }) => {
  console.log(product)

  const formatEcoScore = (score) => {
    if (score == null || score == undefined || isNaN(Number(score)))
      return 'N/A';
    return Number(score).toFixed(1)
  }

  const getEcoScoreColor = (score) => {
    if (!score || score < 0) return '#9ca3af'; // Gray for invalid scores
    if (score >= 9) return '#22c55e'; // Green
    if (score >= 7) return '#84cc16'; // Light green
    if (score >= 5) return '#eab308'; // Yellow
    return '#ef4444'; // Red
  };

 
  // Fallback image URL for when product images fail to load
  const fallbackImageUrl = "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop";

  return (
    <div className="product-card">
      <div className="product-image-container">
        <img 
          src={product.image_url || fallbackImageUrl} 
          alt={product.name || 'Product image'} 
          className="product-image"
          onError={(e) => {e.target.src = fallbackImageUrl}}
        />
        <div className="eco-score-badge" style={{ backgroundColor: getEcoScoreColor(product.ecoscore) }}>
          {formatEcoScore(product.ecoscore)}/10
        </div>
      </div>

      <div className="product-info">
        <div className="product-brand">{product.brand || 'Unknown Brand'}</div>
        <h3 className="product-name">{product.name || 'Product Name Not Available'}</h3>
        <p className="product-description">
          {product.description || 'No description available for this product.'}
        </p>

        <div className="product-footer">
          <div className="product-category">{product.category || 'Uncategorized'}</div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
