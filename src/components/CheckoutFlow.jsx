import React, { useState, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { X, ArrowRight, ShieldCheck, CreditCard as CardIcon, Truck, CheckCircle2, Ticket, Check } from 'lucide-react';
import './CheckoutFlow.css';

export default function CheckoutFlow() {
  const {
    checkoutOpen,
    setCheckoutOpen,
    checkoutStep,
    setCheckoutStep,
    shippingAddress,
    setShippingAddress,
    paymentDetails,
    setPaymentDetails,
    getCartSubtotal,
    getCartDiscount,
    getShippingCost,
    getCartTotal,
    cart,
    placeOrder,
    orders
  } = useShop();

  const [addressErrors, setAddressErrors] = useState({});
  const [paymentErrors, setPaymentErrors] = useState({});
  const [cardFocusedField, setCardFocusedField] = useState(""); // number, name, expiry, cvv

  if (!checkoutOpen) return null;

  const subtotal = getCartSubtotal();
  const discount = getCartDiscount();
  const shipping = getShippingCost();
  const total = getCartTotal();

  // Validate Shipping Address
  const handleAddressSubmit = (e) => {
    e.preventDefault();
    const errors = {};
    if (!shippingAddress.fullName.trim()) errors.fullName = "Full name is required";
    if (!shippingAddress.email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)) errors.email = "Enter a valid email address";
    if (!shippingAddress.address.trim()) errors.address = "Address is required";
    if (!shippingAddress.city.trim()) errors.city = "City is required";
    if (!shippingAddress.zipCode.match(/^\d{5}(-\d{4})?$/)) errors.zipCode = "Enter a 5-digit zip code";

    if (Object.keys(errors).length > 0) {
      setAddressErrors(errors);
    } else {
      setAddressErrors({});
      setCheckoutStep(2); // Proceed to payment
    }
  };

  // Validate Payment details & Complete Order
  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    const errors = {};
    if (!paymentDetails.cardName.trim()) errors.cardName = "Cardholder name is required";
    if (!paymentDetails.cardNumber.replace(/\s/g, "").match(/^\d{16}$/)) errors.cardNumber = "Enter a valid 16-digit card number";
    if (!paymentDetails.expiry.match(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/)) errors.expiry = "MM/YY expiry format required";
    if (!paymentDetails.cvv.match(/^\d{3}$/)) errors.cvv = "Enter 3-digit CVV";

    if (Object.keys(errors).length > 0) {
      setPaymentErrors(errors);
    } else {
      setPaymentErrors({});
      placeOrder(); // Context function to place order
      setCheckoutStep(3); // Go to success modal
    }
  };

  // Quick helper to format card number with spaces (e.g. 4444 4444 4444 4444)
  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length > 0) {
      return parts.join(" ");
    } else {
      return v;
    }
  };

  const handleCardNumberChange = (e) => {
    const formatted = formatCardNumber(e.target.value);
    setPaymentDetails({ ...paymentDetails, cardNumber: formatted.slice(0, 19) });
  };

  const handleExpiryChange = (e) => {
    let clean = e.target.value.replace(/[^0-9]/g, "");
    if (clean.length > 2) {
      clean = `${clean.slice(0, 2)}/${clean.slice(2, 4)}`;
    }
    setPaymentDetails({ ...paymentDetails, expiry: clean.slice(0, 5) });
  };

  const handleClose = () => {
    setCheckoutOpen(false);
    setCheckoutStep(1);
  };

  // Active Order (placed inside context)
  const activeOrder = orders[0] || null;

  return (
    <div className="checkout-flow-overlay" onClick={checkoutStep !== 3 ? handleClose : undefined}>
      <div className="checkout-flow-panel" onClick={(e) => e.stopPropagation()}>
        {/* Close button (disabled on success screen to ensure receipt read) */}
        {checkoutStep !== 3 && (
          <button className="close-checkout-btn" onClick={handleClose}>
            <X size={22} />
          </button>
        )}

        {/* 1. TIMELINE PROCESS NODES */}
        {checkoutStep !== 3 && (
          <div className="checkout-timeline-header">
            <div className={`timeline-node ${checkoutStep >= 1 ? "active" : ""}`}>
              <span className="node-num">{checkoutStep > 1 ? <Check size={12} /> : "1"}</span>
              <span className="node-label">Shipping</span>
            </div>
            <div className="timeline-connector"></div>
            <div className={`timeline-node ${checkoutStep >= 2 ? "active" : ""}`}>
              <span className="node-num">{checkoutStep > 2 ? <Check size={12} /> : "2"}</span>
              <span className="node-label">Payment</span>
            </div>
          </div>
        )}

        <div className="checkout-scroll-body">
          <div className="checkout-grid-split">
            
            {/* LEFT COLUMN: FORMS CONTROL */}
            <div className="form-column-area">
              {/* STEP 1: SHIPPING DETAILS */}
              {checkoutStep === 1 && (
                <form className="shipping-address-form" onSubmit={handleAddressSubmit}>
                  <h3 className="section-form-title"><Truck size={18} style={{ marginRight: 8 }} /> SHIPPING ADDRESS</h3>
                  <div className="input-row-group">
                    <label>Full Name</label>
                    <input
                      type="text"
                      placeholder="Akash Giri"
                      value={shippingAddress.fullName}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, fullName: e.target.value })}
                      className={addressErrors.fullName ? "error" : ""}
                    />
                    {addressErrors.fullName && <span className="field-error-msg">{addressErrors.fullName}</span>}
                  </div>

                  <div className="input-row-group">
                    <label>Email Address</label>
                    <input
                      type="email"
                      placeholder="akash@example.com"
                      value={shippingAddress.email}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, email: e.target.value })}
                      className={addressErrors.email ? "error" : ""}
                    />
                    {addressErrors.email && <span className="field-error-msg">{addressErrors.email}</span>}
                  </div>

                  <div className="input-row-group">
                    <label>Street Address</label>
                    <input
                      type="text"
                      placeholder="123 Fashion Way Apt 4B"
                      value={shippingAddress.address}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, address: e.target.value })}
                      className={addressErrors.address ? "error" : ""}
                    />
                    {addressErrors.address && <span className="field-error-msg">{addressErrors.address}</span>}
                  </div>

                  <div className="form-two-columns">
                    <div className="input-row-group">
                      <label>City</label>
                      <input
                        type="text"
                        placeholder="Kathmandu"
                        value={shippingAddress.city}
                        onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                        className={addressErrors.city ? "error" : ""}
                      />
                      {addressErrors.city && <span className="field-error-msg">{addressErrors.city}</span>}
                    </div>
                    <div className="input-row-group">
                      <label>Zip Code</label>
                      <input
                        type="text"
                        placeholder="44600"
                        value={shippingAddress.zipCode}
                        onChange={(e) => setShippingAddress({ ...shippingAddress, zipCode: e.target.value })}
                        className={addressErrors.zipCode ? "error" : ""}
                      />
                      {addressErrors.zipCode && <span className="field-error-msg">{addressErrors.zipCode}</span>}
                    </div>
                  </div>

                  <button type="submit" className="checkout-step-cta">
                    CONTINUE TO PAYMENT
                    <ArrowRight size={16} style={{ marginLeft: 8 }} />
                  </button>
                </form>
              )}

              {/* STEP 2: CREDIT CARD PAYMENT & CARD PREVIEW */}
              {checkoutStep === 2 && (
                <div className="payment-block-wrap">
                  {/* ANIMATED DIGITAL CARD PREVIEW */}
                  <div className={`animated-card-box ${cardFocusedField === "cvv" ? "flipped" : ""}`}>
                    <div className="card-face card-front">
                      <div className="card-logo-row">
                        <span className="card-chip"></span>
                        <span className="card-brand-tag">AKARIÉN</span>
                      </div>
                      <div className="card-number-preview">
                        {paymentDetails.cardNumber || "•••• •••• •••• ••••"}
                      </div>
                      <div className="card-bottom-row">
                        <div className="card-name-preview">
                          <span className="card-label">CARDHOLDER</span>
                          <span className="card-value">{paymentDetails.cardName.toUpperCase() || "YOUR FULL NAME"}</span>
                        </div>
                        <div className="card-expiry-preview">
                          <span className="card-label">EXPIRES</span>
                          <span className="card-value">{paymentDetails.expiry || "MM/YY"}</span>
                        </div>
                      </div>
                    </div>
                    <div className="card-face card-back">
                      <div className="card-magnetic-strip"></div>
                      <div className="card-cvv-strip">
                        <span className="signature-area"></span>
                        <span className="cvv-preview">{paymentDetails.cvv || "•••"}</span>
                      </div>
                      <span className="card-secure-seal">Sasto Ramro Wear SECURE</span>
                    </div>
                  </div>

                  {/* Payment Form Fields */}
                  <form className="payment-form" onSubmit={handlePaymentSubmit}>
                    <h3 className="section-form-title"><CardIcon size={18} style={{ marginRight: 8 }} /> CREDIT CARD DETAILS</h3>
                    
                    <div className="input-row-group">
                      <label>Cardholder Name</label>
                      <input
                        type="text"
                        placeholder="Akash Giri"
                        value={paymentDetails.cardName}
                        onChange={(e) => setPaymentDetails({ ...paymentDetails, cardName: e.target.value })}
                        onFocus={() => setCardFocusedField("name")}
                        className={paymentErrors.cardName ? "error" : ""}
                      />
                      {paymentErrors.cardName && <span className="field-error-msg">{paymentErrors.cardName}</span>}
                    </div>

                    <div className="input-row-group">
                      <label>Card Number</label>
                      <input
                        type="text"
                        placeholder="4111 1111 1111 1111"
                        value={paymentDetails.cardNumber}
                        onChange={handleCardNumberChange}
                        onFocus={() => setCardFocusedField("number")}
                        className={paymentErrors.cardNumber ? "error" : ""}
                      />
                      {paymentErrors.cardNumber && <span className="field-error-msg">{paymentErrors.cardNumber}</span>}
                    </div>

                    <div className="form-two-columns">
                      <div className="input-row-group">
                        <label>Expiry Date (MM/YY)</label>
                        <input
                          type="text"
                          placeholder="12/28"
                          value={paymentDetails.expiry}
                          onChange={handleExpiryChange}
                          onFocus={() => setCardFocusedField("expiry")}
                          className={paymentErrors.expiry ? "error" : ""}
                        />
                        {paymentErrors.expiry && <span className="field-error-msg">{paymentErrors.expiry}</span>}
                      </div>
                      <div className="input-row-group">
                        <label>CVV (3 Digits)</label>
                        <input
                          type="text"
                          placeholder="123"
                          value={paymentDetails.cvv}
                          onChange={(e) => setPaymentDetails({ ...paymentDetails, cvv: e.target.value.replace(/[^0-9]/g, "").slice(0, 3) })}
                          onFocus={() => setCardFocusedField("cvv")}
                          onBlur={() => setCardFocusedField("")}
                          className={paymentErrors.cvv ? "error" : ""}
                        />
                        {paymentErrors.cvv && <span className="field-error-msg">{paymentErrors.cvv}</span>}
                      </div>
                    </div>

                    <button type="submit" className="checkout-step-cta order-cta">
                      PLACE SIMULATED ORDER
                      <ShieldCheck size={18} style={{ marginLeft: 8 }} />
                    </button>
                  </form>
                </div>
              )}

              {/* STEP 3: SUCCESS CONGRATULATORY PANEL & CONFETTI */}
              {checkoutStep === 3 && activeOrder && (
                <div className="success-confetti-block">
                  {/* Confetti Generation loops */}
                  {[...Array(24)].map((_, i) => (
                    <div
                      key={i}
                      className="confetti"
                      style={{
                        left: `${Math.random() * 95}%`,
                        top: `-10px`,
                        animationDelay: `${Math.random() * 2.5}s`,
                        width: `${Math.random() * 8 + 6}px`,
                        height: `${Math.random() * 12 + 6}px`
                      }}
                    ></div>
                  ))}

                  <div className="success-header">
                    <CheckCircle2 className="success-icon-badge" size={60} />
                    <h2>THANK YOU FOR YOUR PURCHASE!</h2>
                    <p className="order-num-label">
                      Order ID: <strong>{activeOrder.orderId}</strong>
                    </p>
                    <p className="delivery-promise-label">
                      Estimated delivery: <strong>{new Date(Date.now() + 4 * 86400000).toLocaleDateString()}</strong> (3-5 Business Days)
                    </p>
                  </div>

                  {/* Complete invoice details */}
                  <div className="success-invoice-box">
                    <h4 className="invoice-title">ORDER SUMMARY RECEIPT</h4>
                    <div className="invoice-rows-list">
                      {activeOrder.items.map((item, idx) => (
                        <div key={idx} className="invoice-item-row">
                          <span className="inv-qty-name">{item.quantity}x {item.name} ({item.selectedSize})</span>
                          <span className="inv-price">${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                    <div className="invoice-divider"></div>
                    <div className="invoice-billing-math">
                      <div className="bill-row">
                        <span>Subtotal:</span>
                        <span>${activeOrder.financials.subtotal.toFixed(2)}</span>
                      </div>
                      {activeOrder.financials.discount > 0 && (
                        <div className="bill-row discount">
                          <span>Coupon Discount:</span>
                          <span>-${activeOrder.financials.discount.toFixed(2)}</span>
                        </div>
                      )}
                      <div className="bill-row">
                        <span>Shipping Cost:</span>
                        <span>{activeOrder.financials.shipping === 0 ? "FREE" : `$${activeOrder.financials.shipping.toFixed(2)}`}</span>
                      </div>
                      <div className="bill-row grand-total">
                        <span>Total Paid:</span>
                        <span>${activeOrder.financials.total.toFixed(2)}</span>
                      </div>
                    </div>

                    <div className="shipping-receipt-block">
                      <h5>Shipping to:</h5>
                      <p>{activeOrder.address.fullName}</p>
                      <p>{activeOrder.address.address}, {activeOrder.address.city}, {activeOrder.address.zipCode}</p>
                      <p>{activeOrder.address.email}</p>
                    </div>
                  </div>

                  <button className="checkout-step-cta success-done-btn" onClick={handleClose}>
                    CONTINUE SHOPPING
                  </button>
                </div>
              )}
            </div>

            {/* RIGHT COLUMN: MINI ORDER SUMMARY (HIDDEN IN SUCCESS PHASE) */}
            {checkoutStep !== 3 && (
              <div className="mini-order-summary-column">
                <h4 className="summary-section-title">BAG SUMMARY</h4>
                <div className="summary-items-list-wrap">
                  {cart.map((item, idx) => (
                    <div key={idx} className="summary-item-card">
                      <img src={item.image} alt={item.name} className="summary-item-img" />
                      <div className="summary-item-details">
                        <span className="summary-item-name">{item.name}</span>
                        <span className="summary-item-desc">{item.quantity}x Size {item.selectedSize}</span>
                        <span className="summary-item-price">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="billing-details-summary">
                  <div className="bill-row">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="bill-row discount">
                      <span>Discount</span>
                      <span>-${discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="bill-row">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  <div className="bill-row grand-total">
                    <span>Grand Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="secure-payment-info">
                  <ShieldCheck size={18} className="shield-icon" />
                  <p>Encrypted SSL Checkout. Your credit card details are processed simulated and never saved.</p>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
