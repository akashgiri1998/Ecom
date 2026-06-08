import React, { useState, useEffect, useRef } from 'react';
import { useShop } from '../context/ShopContext';
import { Search, Heart, ShoppingBag, User, X, Sparkles, Menu, ArrowRight } from 'lucide-react';
import './Header.css';

export default function Header() {
  const {
    cart,
    wishlist,
    setCartOpen,
    setWishlistOpen,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    products
  } = useShop();

  const [activeAnnouncement, setActiveAnnouncement] = useState(0);
  const [searchFocused, setSearchFocused] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [autocompleteResults, setAutocompleteResults] = useState([]);
  const searchRef = useRef(null);

  const announcements = [
    "🔥 FLASH SALE: Use code SASTORAMRO for 20% OFF! 🔥",
    "🚚 FREE SHIPPING on orders over NRS 3,000 + Free Returns 🚚",
    "✨ AKARIÉN Premium - Welcome to Sasto Ramro Wear! ✨"
  ];

  // Rotate announcements
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveAnnouncement((prev) => (prev + 1) % announcements.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // Search Autocomplete Suggestion Logic
  useEffect(() => {
    if (searchQuery.trim().length > 1) {
      const query = searchQuery.toLowerCase();
      const filtered = products
        .filter(p => 
          p.name.toLowerCase().includes(query) || 
          p.category.toLowerCase().includes(query) ||
          p.tags.some(t => t.toLowerCase().includes(query))
        )
        .slice(0, 5); // Limit to 5 suggestions
      setAutocompleteResults(filtered);
    } else {
      setAutocompleteResults([]);
    }
  }, [searchQuery, products]);

  // Click outside search listener
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const totalCartItems = cart.reduce((total, item) => total + item.quantity, 0);

  const handleCategoryClick = (cat) => {
    setSelectedCategory(cat);
    setMobileMenuOpen(false);
    
    // Smooth scroll to product grid
    const catalogElement = document.getElementById("catalog-section");
    if (catalogElement) {
      catalogElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSuggestionClick = (p) => {
    setSearchQuery(p.name);
    setSearchFocused(false);
    const catalogElement = document.getElementById("catalog-section");
    if (catalogElement) {
      catalogElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

  return (
    <header className="main-header">
      {/* 1. Announcement Bar */}
      <div className="announcement-bar">
        <div className="announcement-text">
          {announcements[activeAnnouncement]}
        </div>
      </div>

      {/* 2. Primary Navigation Bar */}
      <div className="nav-container glassy-effect">
        <div className="nav-content">
          {/* Mobile Menu Icon */}
          <button className="mobile-menu-btn" onClick={() => setMobileMenuOpen(true)}>
            <Menu size={24} />
          </button>

          {/* Logo */}
          <div className="logo-section" onClick={() => handleCategoryClick("all")}>
            <span className="logo-brand">AKARIÉN</span>
            <span className="logo-sub">SASTO RAMRO WEAR</span>
          </div>

          {/* Desktop Categories */}
          <nav className="desktop-nav">
            <button 
              className={`nav-link ${selectedCategory === "all" ? "active" : ""}`}
              onClick={() => handleCategoryClick("all")}
            >
              All Styles
            </button>
            <button 
              className={`nav-link ${selectedCategory === "women" ? "active" : ""}`}
              onClick={() => handleCategoryClick("women")}
            >
              Women
            </button>
            <button 
              className={`nav-link ${selectedCategory === "men" ? "active" : ""}`}
              onClick={() => handleCategoryClick("men")}
            >
              Men
            </button>
            <button 
              className={`nav-link ${selectedCategory === "kids" ? "active" : ""}`}
              onClick={() => handleCategoryClick("kids")}
            >
              Kids
            </button>
            <button 
              className={`nav-link ${selectedCategory === "accessories" ? "active" : ""}`}
              onClick={() => handleCategoryClick("accessories")}
            >
              Accessories
            </button>
          </nav>

          {/* Search Box */}
          <div className="search-wrapper" ref={searchRef}>
            <div className={`search-box ${searchFocused ? "focused" : ""}`}>
              <Search className="search-icon" size={18} />
              <input
                type="text"
                placeholder="Search trends, dresses, jackets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setSearchFocused(true)}
              />
              {searchQuery && (
                <button className="clear-search-btn" onClick={clearSearch}>
                  <X size={16} />
                </button>
              )}
            </div>

            {/* Autocomplete Popup */}
            {searchFocused && (
              <div className="search-dropdown">
                {autocompleteResults.length > 0 ? (
                  <div className="suggestions-section">
                    <p className="section-title">SUGGESTED FOR YOU</p>
                    {autocompleteResults.map(p => (
                      <div 
                        key={p.id} 
                        className="suggestion-item"
                        onClick={() => handleSuggestionClick(p)}
                      >
                        <img src={p.images[0]} alt={p.name} className="suggest-img" />
                        <div className="suggest-details">
                          <span className="suggest-name">{p.name}</span>
                          <span className="suggest-price">NRS {p.price.toLocaleString()}</span>
                        </div>
                        <ArrowRight size={14} className="suggest-arrow" />
                      </div>
                    ))}
                  </div>
                ) : searchQuery.length > 1 ? (
                  <div className="no-suggestions">No exact clothing item found. Press enter to search tags.</div>
                ) : (
                  <div className="trending-searches">
                    <p className="section-title"><Sparkles size={14} style={{ marginRight: 6 }} /> TRENDING NOW</p>
                    <div className="tag-cloud">
                      {["Pleated Dress", "Denim Jacket", "Oversized Tee", "Sunglasses", "Overalls", "Linen"].map(tag => (
                        <button 
                          key={tag} 
                          className="trending-tag"
                          onClick={() => {
                            setSearchQuery(tag);
                            setSearchFocused(false);
                          }}
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Action Icons */}
          <div className="actions-section">
            <button className="action-btn user-profile-btn" onClick={() => alert("Welcome back! Simulated customer profile activated.")}>
              <User size={20} />
            </button>
            <button className="action-btn" onClick={() => setWishlistOpen(true)}>
              <Heart size={20} />
              {wishlist.length > 0 && <span className="action-badge pulse">{wishlist.length}</span>}
            </button>
            <button className="action-btn cart-toggle-btn" onClick={() => setCartOpen(true)}>
              <ShoppingBag size={20} />
              {totalCartItems > 0 && <span className="action-badge">{totalCartItems}</span>}
            </button>
          </div>
        </div>
      </div>

      {/* 3. Mobile Navigation Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="mobile-drawer-overlay" onClick={() => setMobileMenuOpen(false)}>
          <div className="mobile-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="drawer-header">
              <span className="drawer-title">MENU</span>
              <button className="close-drawer-btn" onClick={() => setMobileMenuOpen(false)}>
                <X size={22} />
              </button>
            </div>
            <div className="drawer-menu-links">
              {["all", "women", "men", "kids", "accessories"].map(cat => (
                <button
                  key={cat}
                  className={`mobile-menu-link ${selectedCategory === cat ? "active" : ""}`}
                  onClick={() => handleCategoryClick(cat)}
                >
                  {cat === "all" ? "All Collections" : cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              ))}
            </div>
            <div className="mobile-drawer-footer">
              <span className="brand-label">Sasto Ramro Wear</span>
              <span className="brand-copy">© 2026 AKARIÉN</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
