import React from 'react';
import { useShop } from '../context/ShopContext';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import './CartDrawer.css'; // Leverage same layout panel styles

export default function WishlistDrawer() {
  const {
    wishlist,
    wishlistOpen,
    setWishlistOpen,
    toggleWishlist,
    addToCart
  } = useShop();

  if (!wishlistOpen) return null;

  const handleQuickAdd = (product) => {
    // Quick Add will pick first size and first color available
    const defaultSize = product.sizes[0];
    const defaultColor = product.colors[0];
    addToCart(product, defaultSize, defaultColor);
  };

  return (
    <div className="cart-drawer-overlay animate-fade" onClick={() => setWishlistOpen(false)}>
      <div className="cart-drawer-panel" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="drawer-header" style={{ borderBottom: '1px solid var(--color-border)' }}>
          <div className="title-area">
            <Heart size={20} fill="var(--color-sale)" color="var(--color-sale)" style={{ marginRight: 6 }} />
            <h3>MY WISHLIST</h3>
            <span className="items-count">({wishlist.length})</span>
          </div>
          <button className="close-drawer-btn" onClick={() => setWishlistOpen(false)}>
            <X size={22} />
          </button>
        </div>

        {/* Wishlist Items List */}
        <div className="drawer-body">
          {wishlist.length > 0 ? (
            <div className="cart-items-list">
              {wishlist.map((item) => (
                <div key={item.id} className="cart-item-row" style={{ paddingBottom: 20 }}>
                  <img src={item.images[0]} alt={item.name} className="item-img" />
                  <div className="item-details" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <h4 className="item-name">{item.name}</h4>
                    <span className="item-price" style={{ fontSize: '0.9rem', fontWeight: 700 }}>
                      ${item.price.toFixed(2)}
                    </span>
                    
                    {/* Add to Cart button from wishlist */}
                    <button
                      className="checkout-btn-cta"
                      onClick={() => handleQuickAdd(item)}
                      style={{
                        padding: '8px 16px',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        width: 'fit-content',
                        marginTop: 8,
                        height: 'auto'
                      }}
                    >
                      <ShoppingBag size={12} style={{ marginRight: 6 }} />
                      Quick Add
                    </button>
                  </div>
                  <button 
                    className="delete-item-btn"
                    onClick={() => toggleWishlist(item)}
                    title="Remove from Wishlist"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-cart-view">
              <span className="empty-bag-emoji">💖</span>
              <h3>WISHLIST IS EMPTY</h3>
              <p>You haven't liked any Sasto Ramro Wear items yet. Browse our collection and heart your favorite looks!</p>
              <button className="continue-shopping-btn" onClick={() => setWishlistOpen(false)}>
                BROWSE CLOTHES
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
