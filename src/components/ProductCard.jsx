import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Heart, Star, ShoppingCart } from 'lucide-react';
import './ProductCard.css';

export default function ProductCard({ product }) {
  const { toggleWishlist, wishlist, addToCart, setDetailProduct } = useShop();
  const [hoveredImageIdx, setHoveredImageIdx] = useState(0);
  const [showQuickSizes, setShowQuickSizes] = useState(false);

  const isFavorited = wishlist.some((item) => item.id === product.id);

  // Calculate discount percentage
  const discountPercent = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  const handleQuickAdd = (size) => {
    // Quick Add will pick the first color from product's color options
    addToCart(product, size, product.colors[0]);
    setShowQuickSizes(false);
  };

  return (
    <div 
      className="product-card-container"
      onMouseEnter={() => {
        setHoveredImageIdx(1);
        setShowQuickSizes(true);
      }}
      onMouseLeave={() => {
        setHoveredImageIdx(0);
        setShowQuickSizes(false);
      }}
    >
      {/* 1. Image Box with badge overlays */}
      <div className="card-img-box" onClick={() => setDetailProduct(product)}>
        {/* Hover image cross-fade wrapper */}
        <img 
          src={product.images[0]} 
          alt={product.name} 
          className={`card-img main-img ${hoveredImageIdx === 0 ? "active" : ""}`} 
        />
        <img 
          src={product.images[1]} 
          alt={product.name} 
          className={`card-img hover-img ${hoveredImageIdx === 1 ? "active" : ""}`} 
        />

        {/* Discount Badge */}
        {discountPercent > 0 && (
          <div className="card-badge discount-tag">
            -{discountPercent}%
          </div>
        )}

        {/* Tag Badges (e.g. Best Seller) */}
        {product.tags.includes("best-seller") && (
          <div className="card-badge bestseller-tag">
            BEST SELLER
          </div>
        )}

        {/* Wishlist Hearts button */}
        <button 
          className={`wishlist-toggle-btn ${isFavorited ? "active" : ""}`}
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product);
          }}
        >
          <Heart size={18} fill={isFavorited ? "var(--color-sale)" : "none"} />
        </button>

        {/* Quick Size Select Panel */}
        <div className={`quick-size-panel ${showQuickSizes ? "slide-up" : ""}`} onClick={(e) => e.stopPropagation()}>
          <span className="quick-title">QUICK ADD SIZE</span>
          <div className="sizes-button-grid">
            {product.sizes.map((size) => (
              <button 
                key={size} 
                className="quick-size-btn"
                onClick={() => handleQuickAdd(size)}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Content Details Section */}
      <div className="card-details-box" onClick={() => setDetailProduct(product)}>
        <span className="card-brand-label">Sasto Ramro Wear</span>
        <h3 className="card-title-label">{product.name}</h3>

        {/* Ratings block */}
        <div className="card-rating-row">
          <div className="card-stars">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                size={12} 
                fill={i < Math.floor(product.rating) ? "var(--color-accent)" : "none"}
                color="var(--color-accent)"
              />
            ))}
          </div>
          <span className="card-rating-count">({product.ratingCount})</span>
        </div>

        {/* Pricing tags */}
        <div className="card-price-row">
          <span className="card-price">NRS {product.price.toLocaleString()}</span>
          {product.originalPrice > product.price && (
            <span className="card-original-price">NRS {product.originalPrice.toLocaleString()}</span>
          )}
        </div>
      </div>
    </div>
  );
}
