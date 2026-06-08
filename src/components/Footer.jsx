import React, { useState } from 'react';
import { Send, ShieldCheck, Truck, RefreshCw, HelpCircle } from 'lucide-react';
import './Footer.css';

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="main-footer-section">
      {/* 1. Value Props Banner (SHEIN-style benefits) */}
      <div className="value-props-container">
        <div className="value-prop-card">
          <Truck className="prop-icon" size={32} />
          <div className="prop-info">
            <span className="prop-title">FAST SHIPPING</span>
            <span className="prop-desc">Free shipping on orders over $29</span>
          </div>
        </div>
        <div className="value-prop-card">
          <RefreshCw className="prop-icon" size={32} />
          <div className="prop-info">
            <span className="prop-title">30-DAY RETURNS</span>
            <span className="prop-desc">Hassle-free online return policy</span>
          </div>
        </div>
        <div className="value-prop-card">
          <ShieldCheck className="prop-icon" size={32} />
          <div className="prop-info">
            <span className="prop-title">SECURE PAYMENT</span>
            <span className="prop-desc">100% encrypted checkout system</span>
          </div>
        </div>
        <div className="value-prop-card">
          <HelpCircle className="prop-icon" size={32} />
          <div className="prop-info">
            <span className="prop-title">24/7 SUPPORT</span>
            <span className="prop-desc">Ready to help you anytime</span>
          </div>
        </div>
      </div>

      {/* 2. Newsletter Signup Segment */}
      <div className="newsletter-bar">
        <div className="newsletter-text">
          <h3 className="news-title">JOIN THE AKARIÉN CLUB</h3>
          <p className="news-desc">Subscribe to get 15% OFF your first order & receive secret fashion deals.</p>
        </div>
        <form className="newsletter-form" onSubmit={handleSubscribe}>
          <div className="newsletter-input-group">
            <input
              type="email"
              placeholder="Enter your email address"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="news-input"
            />
            <button type="submit" className="news-btn">
              {subscribed ? "SUBSCRIBED" : "SUBSCRIBE"}
              {!subscribed && <Send size={16} style={{ marginLeft: 8 }} />}
            </button>
          </div>
          {subscribed && <p className="news-success-msg">Welcome! Your 15% discount code has been sent to your email.</p>}
        </form>
      </div>

      {/* 3. Main Footer Columns */}
      <div className="footer-links-grid">
        <div className="footer-col brand-col">
          <div className="footer-logo">
            <span className="brand-title">AKARIÉN</span>
            <span className="brand-tag">SASTO RAMRO WEAR</span>
          </div>
          <p className="brand-mission">
            Redefining accessible luxury fashion. Beautiful, trendy, high-quality garments made for everyone, everywhere. Sasto Ramro Wear brings premium quality clothing at reasonable prices.
          </p>
        </div>

        <div className="footer-col">
          <h4 className="col-title">SHOP CATEGORIES</h4>
          <ul className="footer-links">
            <li><a href="#catalog-section">Women's Collection</a></li>
            <li><a href="#catalog-section">Men's Apparel</a></li>
            <li><a href="#catalog-section">Kids' Fashion Wear</a></li>
            <li><a href="#catalog-section">Premium Accessories</a></li>
            <li><a href="#catalog-section">New Arrivals</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4 className="col-title">CUSTOMER SERVICES</h4>
          <ul className="footer-links">
            <li><a href="#/" onClick={(e) => { e.preventDefault(); alert("Simulated FAQs: Shipping takes 3-5 days. Returns can be scheduled online."); }}>Shipping Info</a></li>
            <li><a href="#/" onClick={(e) => { e.preventDefault(); alert("Simulated Refund Policy: Refunds will be credited to original payment within 7 working days."); }}>Returns & Refunds</a></li>
            <li><a href="#/" onClick={(e) => { e.preventDefault(); alert("Simulated Tracking: Enter your Order ID inside profile panel to track."); }}>Track Your Order</a></li>
            <li><a href="#/" onClick={(e) => { e.preventDefault(); alert("Simulated Size Guide: Find size guides directly inside product details modal."); }}>Size Guide</a></li>
            <li><a href="#/" onClick={(e) => { e.preventDefault(); alert("Simulated Help Center: Email support@akarien.com or call 1-800-AKARIEN."); }}>Contact Us</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4 className="col-title">COMPANY INFO</h4>
          <ul className="footer-links">
            <li><a href="#/" onClick={(e) => { e.preventDefault(); alert("About Us: Founded in 2026, AKARIÉN designs premium outfits inspired by local aesthetic values."); }}>About AKARIÉN</a></li>
            <li><a href="#/" onClick={(e) => { e.preventDefault(); alert("Careers: We are always hiring models, clothing designers, and developers!"); }}>Careers</a></li>
            <li><a href="#/" onClick={(e) => { e.preventDefault(); alert("Sustainability: We use 100% organic cotton and environment-friendly packaging."); }}>Sustainability</a></li>
            <li><a href="#/" onClick={(e) => { e.preventDefault(); alert("Affiliates: Partner with us on social media and earn 10% commission on sales."); }}>Influencer Program</a></li>
          </ul>
        </div>
      </div>

      {/* 4. Footer Bottom Credit Panel */}
      <div className="footer-bottom-bar">
        <span className="copyright">© 2026 AKARIÉN Inc. All Rights Reserved. Label name Sasto Ramro Wear.</span>
        <div className="payment-badges">
          <span className="pay-badge">VISA</span>
          <span className="pay-badge">MASTERCARD</span>
          <span className="pay-badge">AMEX</span>
          <span className="pay-badge">PAYPAL</span>
          <span className="pay-badge">APPLE PAY</span>
        </div>
      </div>
    </footer>
  );
}
