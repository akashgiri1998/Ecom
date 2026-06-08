import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { X, Trash2, Plus, Minus, CreditCard, Tag, Percent } from 'lucide-react';
import './CartDrawer.css';

export default function CartDrawer() {
  const {
    cart,
    cartOpen,
    setCartOpen,
    updateCartQuantity,
    deleteFromCart,
    getCartSubtotal,
    getCartDiscount,
    getShippingCost,
    getCartTotal,
    applyPromo,
    removePromo,
    promoCode,
    discountPercent,
    setCheckoutOpen
  } = useShop();

  const [couponInput, setCouponInput] = useState("");
  const [promoMessage, setPromoMessage] = useState({ type: "", text: "" });

  if (!cartOpen) return null;

  const subtotal = getCartSubtotal();
  const discount = getCartDiscount();
  const shipping = getShippingCost();
  const total = getCartTotal();

  // Progress for free shipping (threshold is NRS 3000)
  const shippingThreshold = 3000;
  const shippingProgress = Math.min((subtotal / shippingThreshold) * 100, 100);
  const remainingForFreeShipping = Math.max(shippingThreshold - subtotal, 0);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!couponInput.trim()) return;

    const result = applyPromo(couponInput);
    if (result.success) {
      setPromoMessage({ type: "success", text: result.message });
      setCouponInput("");
    } else {
      setPromoMessage({ type: "error", text: result.message });
    }
  };

  const handleCheckoutClick = () => {
    if (cart.length === 0) {
      alert("Your cart is empty! Add some trendy wear first.");
      return;
    }
    setCartOpen(false);
    setCheckoutOpen(true);
  };

  return (
    <div className="cart-drawer-overlay animate-fade" onClick={() => setCartOpen(false)}>
      <div className="cart-drawer-panel" onClick={(e) => e.stopPropagation()}>
        {/* 1. Header */}
        <div className="drawer-header">
          <div className="title-area">
            <h3>SHOPPING BAG</h3>
            <span className="items-count">({cart.reduce((sum, i) => sum + i.quantity, 0)})</span>
          </div>
          <button className="close-drawer-btn" onClick={() => setCartOpen(false)}>
            <X size={22} />
          </button>
        </div>

        {/* 2. Free Shipping Progress Bar */}
        {cart.length > 0 && (
          <div className="shipping-progress-panel">
            {remainingForFreeShipping > 0 ? (
              <p className="progress-text">
                Spend <strong>NRS {remainingForFreeShipping.toLocaleString()}</strong> more for <strong>FREE SHIPPING!</strong>
              </p>
            ) : (
              <p className="progress-text free-shipping-earned">
                🎉 Congratulations! You have earned <strong>FREE SHIPPING!</strong>
              </p>
            )}
            <div className="progress-bar-bg">
              <div 
                className="progress-bar-fill" 
                style={{ width: `${shippingProgress}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* 3. Items list scroll body */}
        <div className="drawer-body">
          {cart.length > 0 ? (
            <div className="cart-items-list">
              {cart.map((item) => (
                <div key={`${item.id}-${item.selectedSize}-${item.selectedColor.name}`} className="cart-item-row">
                  <img src={item.image} alt={item.name} className="item-img" />
                  <div className="item-details">
                    <h4 className="item-name">{item.name}</h4>
                    <span className="item-spec">
                      Size: <strong>{item.selectedSize}</strong> | Color:{" "}
                      <span className="color-indicator" style={{ backgroundColor: item.selectedColor.hex }}></span>{" "}
                      <strong>{item.selectedColor.name}</strong>
                    </span>

                    {/* Quantity selectors & price */}
                    <div className="qty-price-row">
                      <div className="quantity-selectors">
                        <button 
                          className="qty-btn"
                          onClick={() => updateCartQuantity(item.id, item.selectedSize, item.selectedColor.name, item.quantity - 1)}
                        >
                          <Minus size={12} />
                        </button>
                        <span className="qty-count">{item.quantity}</span>
                        <button 
                          className="qty-btn" 
                          onClick={() => updateCartQuantity(item.id, item.selectedSize, item.selectedColor.name, item.quantity + 1)}
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      <span className="item-price">NRS {(item.price * item.quantity).toLocaleString()}</span>
                    </div>
                  </div>
                  <button 
                    className="delete-item-btn"
                    onClick={() => deleteFromCart(item.id, item.selectedSize, item.selectedColor.name)}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-cart-view">
              <span className="empty-bag-emoji">🛍️</span>
              <h3>YOUR BAG IS EMPTY</h3>
              <p>Looks like you haven't added any Sasto Ramro Wear items yet. Start shopping and find your aesthetic style!</p>
              <button className="continue-shopping-btn" onClick={() => setCartOpen(false)}>
                START SHOPPING
              </button>
            </div>
          )}
        </div>

        {/* 4. Footer Calculations Area */}
        {cart.length > 0 && (
          <div className="drawer-footer">
            {/* Promo code input form */}
            <form className="coupon-form" onSubmit={handleApplyCoupon}>
              <div className="coupon-input-group">
                <Tag size={14} className="tag-icon" />
                <input
                  type="text"
                  placeholder="Promo Code (SASTORAMRO)"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  className="coupon-input"
                />
                <button type="submit" className="apply-coupon-btn">APPLY</button>
              </div>
              {promoMessage.text && (
                <p className={`coupon-msg ${promoMessage.type === "success" ? "success" : "error"}`}>
                  {promoMessage.text}
                </p>
              )}
            </form>

            {/* Price lines */}
            <div className="billing-summary">
              <div className="summary-row">
                <span>Subtotal</span>
                <span>NRS {subtotal.toLocaleString()}</span>
              </div>
              {discount > 0 && (
                <div className="summary-row discount-row">
                  <span className="flex-center"><Percent size={12} style={{ marginRight: 4 }} /> Discount ({discountPercent}%)</span>
                  <span>-NRS {discount.toLocaleString()}</span>
                </div>
              )}
              {promoCode && (
                <div className="applied-code-badge">
                  <span>Code: <strong>{promoCode}</strong> applied</span>
                  <button className="remove-code-btn" onClick={removePromo}>Remove</button>
                </div>
              )}
              <div className="summary-row">
                <span>Shipping</span>
                <span>{shipping === 0 ? "FREE" : `NRS ${shipping.toLocaleString()}`}</span>
              </div>
              <div className="summary-row total-row">
                <span>Estimated Total</span>
                <span>NRS {total.toLocaleString()}</span>
              </div>
            </div>

            {/* CTAs */}
            <button className="checkout-btn-cta" onClick={handleCheckoutClick}>
              <CreditCard size={18} style={{ marginRight: 8 }} />
              SECURE CHECKOUT
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
