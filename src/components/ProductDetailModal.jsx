import React, { useState, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { X, Star, Heart, ShoppingBag, Plus, Minus, Ruler, Info, ShieldAlert } from 'lucide-react';
import './ProductDetailModal.css';

export default function ProductDetailModal() {
  const {
    detailProduct,
    setDetailProduct,
    addToCart,
    toggleWishlist,
    wishlist
  } = useShop();

  const [activeImage, setActiveImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [activeTab, setActiveTab] = useState("description"); // description, reviews

  // Reset local selectors when product changes
  useEffect(() => {
    if (detailProduct) {
      setActiveImage(detailProduct.images[0]);
      setSelectedSize(detailProduct.sizes[0]);
      setSelectedColor(detailProduct.colors[0]);
      setQuantity(1);
      setActiveTab("description");
    }
  }, [detailProduct]);

  if (!detailProduct) return null;

  const isFavorited = wishlist.some((item) => item.id === detailProduct.id);

  const handleAddToCartClick = () => {
    addToCart(detailProduct, selectedSize, selectedColor, quantity);
    setDetailProduct(null); // Close modal
  };

  const discountPercent = Math.round(
    ((detailProduct.originalPrice - detailProduct.price) / detailProduct.originalPrice) * 100
  );

  return (
    <div className="detail-modal-overlay" onClick={() => setDetailProduct(null)}>
      <div className="detail-modal-panel animate-zoom" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button className="close-modal-btn" onClick={() => setDetailProduct(null)}>
          <X size={24} />
        </button>

        <div className="modal-scroll-container">
          <div className="modal-split-layout">
            {/* 1. GALLERY SIDE */}
            <div className="gallery-column">
              {/* Main Image View */}
              <div className="main-image-container">
                <img src={activeImage} alt={detailProduct.name} className="main-zoom-image" />
                {discountPercent > 0 && (
                  <span className="sale-bubble">-{discountPercent}% OFF</span>
                )}
              </div>

              {/* Thumbnails grid */}
              <div className="thumbnails-row">
                {detailProduct.images.map((img, idx) => (
                  <button
                    key={idx}
                    className={`thumb-btn ${activeImage === img ? "active" : ""}`}
                    onClick={() => setActiveImage(img)}
                  >
                    <img src={img} alt={`Thumbnail ${idx}`} />
                  </button>
                ))}
              </div>
            </div>

            {/* 2. SPECIFICATIONS COLUMN */}
            <div className="specs-column">
              <span className="specs-brand">Sasto Ramro Wear</span>
              <h2 className="specs-title">{detailProduct.name}</h2>

              {/* Quick ratings overview */}
              <div className="specs-ratings-bar">
                <div className="stars-row">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={14} 
                      fill={i < Math.floor(detailProduct.rating) ? "var(--color-accent)" : "none"}
                      color="var(--color-accent)"
                    />
                  ))}
                </div>
                <span className="rating-score">{detailProduct.rating}</span>
                <span className="divider">|</span>
                <span className="reviews-count-link" onClick={() => setActiveTab("reviews")}>
                  {detailProduct.ratingCount} Customer Reviews
                </span>
              </div>

              {/* Price Line */}
              <div className="specs-price-bar">
                <span className="current-price">NRS {detailProduct.price.toLocaleString()}</span>
                {detailProduct.originalPrice > detailProduct.price && (
                  <>
                    <span className="original-price">NRS {detailProduct.originalPrice.toLocaleString()}</span>
                    <span className="discount-tag">Save NRS {(detailProduct.originalPrice - detailProduct.price).toLocaleString()}</span>
                  </>
                )}
              </div>

              {/* Product brief description */}
              <p className="specs-brief-desc">{detailProduct.description}</p>

              {/* COLOR SELECTOR */}
              <div className="selectors-group">
                <span className="selector-title">
                  Color: <strong>{selectedColor ? selectedColor.name : ""}</strong>
                </span>
                <div className="colors-swatches">
                  {detailProduct.colors.map((color) => (
                    <button
                      key={color.hex}
                      className={`color-swatch-circle ${selectedColor?.hex === color.hex ? "active" : ""}`}
                      style={{ backgroundColor: color.hex }}
                      onClick={() => setSelectedColor(color)}
                    >
                      <span className="tooltip-text">{color.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* SIZE SELECTOR */}
              <div className="selectors-group">
                <div className="size-header-row">
                  <span className="selector-title">
                    Size: <strong>{selectedSize}</strong>
                  </span>
                  <button className="size-guide-link" onClick={() => setShowSizeGuide(true)}>
                    <Ruler size={14} style={{ marginRight: 4 }} />
                    Size Guide
                  </button>
                </div>
                <div className="sizes-swatches">
                  {detailProduct.sizes.map((size) => (
                    <button
                      key={size}
                      className={`size-swatch-box ${selectedSize === size ? "active" : ""}`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* QUANTITY SELECTOR */}
              <div className="selectors-group">
                <span className="selector-title">Quantity</span>
                <div className="qty-counter-box">
                  <button 
                    className="qty-change-btn"
                    onClick={() => setQuantity(prev => Math.max(prev - 1, 1))}
                  >
                    <Minus size={14} />
                  </button>
                  <span className="qty-count-val">{quantity}</span>
                  <button 
                    className="qty-change-btn" 
                    onClick={() => setQuantity(prev => prev + 1)}
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>

              {/* BUYING ACTION CTAS */}
              <div className="ctas-row">
                <button className="add-to-cart-btn-specs" onClick={handleAddToCartClick}>
                  <ShoppingBag size={18} style={{ marginRight: 8 }} />
                  ADD TO SHOPPING BAG
                </button>
                <button 
                  className={`wishlist-btn-specs ${isFavorited ? "active" : ""}`}
                  onClick={() => toggleWishlist(detailProduct)}
                >
                  <Heart size={20} fill={isFavorited ? "var(--color-sale)" : "none"} />
                </button>
              </div>

              {/* Tabs area for Detailed Spec / Reviews */}
              <div className="tabs-header-bar">
                <button 
                  className={`tab-btn-title ${activeTab === "description" ? "active" : ""}`}
                  onClick={() => setActiveTab("description")}
                >
                  Product Details
                </button>
                <button 
                  className={`tab-btn-title ${activeTab === "reviews" ? "active" : ""}`}
                  onClick={() => setActiveTab("reviews")}
                >
                  Reviews ({detailProduct.ratingCount})
                </button>
              </div>

              <div className="tab-content-panel">
                {activeTab === "description" ? (
                  <ul className="details-bullets">
                    {detailProduct.details.map((detail, idx) => (
                      <li key={idx}>
                        <Info size={14} className="bullet-info-icon" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="reviews-tab-panel">
                    {detailProduct.reviews.length > 0 ? (
                      <div className="comments-list">
                        {detailProduct.reviews.map((rev, idx) => (
                          <div key={idx} className="comment-card">
                            <div className="comment-header-row">
                              <span className="comment-user">{rev.name}</span>
                              <span className="comment-date">{rev.date}</span>
                            </div>
                            <div className="comment-stars">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  size={10} 
                                  fill={i < rev.rating ? "var(--color-accent)" : "none"}
                                  color="var(--color-accent)"
                                />
                              ))}
                            </div>
                            <p className="comment-text">{rev.comment}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="no-reviews-panel">
                        <ShieldAlert size={36} color="var(--color-text-muted)" />
                        <p>No customer reviews yet. Be the first to order and review this clothing item!</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Nested Size Guide Sliding Drawer Drawer */}
      {showSizeGuide && (
        <div className="size-guide-overlay" onClick={() => setShowSizeGuide(false)}>
          <div className="size-guide-panel" onClick={(e) => e.stopPropagation()}>
            <div className="size-guide-header">
              <h3>SIZE CHART GUIDE</h3>
              <button className="close-guide-btn" onClick={() => setShowSizeGuide(false)}>
                <X size={20} />
              </button>
            </div>
            <div className="size-guide-body">
              <p className="guide-subtitle">Aesthetic clothing measurements are based in inches. True to fit.</p>
              <table className="size-table">
                <thead>
                  <tr>
                    <th>SIZE</th>
                    <th>CHEST (IN)</th>
                    <th>WAIST (IN)</th>
                    <th>HIPS (IN)</th>
                    <th>LENGTH (IN)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>XS</td>
                    <td>31-33</td>
                    <td>24-25</td>
                    <td>33-35</td>
                    <td>38.5</td>
                  </tr>
                  <tr>
                    <td>S</td>
                    <td>33-35</td>
                    <td>26-27</td>
                    <td>35-37</td>
                    <td>39.0</td>
                  </tr>
                  <tr>
                    <td>M</td>
                    <td>35-37</td>
                    <td>28-29</td>
                    <td>37-39</td>
                    <td>39.5</td>
                  </tr>
                  <tr>
                    <td>L</td>
                    <td>37-39</td>
                    <td>30-31</td>
                    <td>39-41</td>
                    <td>40.0</td>
                  </tr>
                  <tr>
                    <td>XL</td>
                    <td>39-42</td>
                    <td>32-34</td>
                    <td>41-44</td>
                    <td>40.5</td>
                  </tr>
                  <tr>
                    <td>XXL</td>
                    <td>42-45</td>
                    <td>35-38</td>
                    <td>44-47</td>
                    <td>41.0</td>
                  </tr>
                </tbody>
              </table>
              <div className="measuring-tips">
                <h4>Measuring Tips:</h4>
                <p><strong>Chest:</strong> Wrap tape under armpits and around fullest part of chest.</p>
                <p><strong>Waist:</strong> Measure around natural waistline (narrowest area).</p>
                <p><strong>Hips:</strong> Measure around fullest part of hips standing with feet together.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
