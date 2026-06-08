import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import SidebarFilters from './SidebarFilters';
import ProductCard from './ProductCard';
import { SlidersHorizontal, ArrowUpDown, ChevronDown, ArchiveX, X } from 'lucide-react';
import './ProductCatalog.css';

export default function ProductCatalog() {
  const {
    filteredProducts,
    sortBy,
    setSortBy,
    selectedCategory,
    searchQuery,
    resetFilters
  } = useShop();

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const getCollectionTitle = () => {
    if (searchQuery) {
      return `Search Results for "${searchQuery}"`;
    }
    switch (selectedCategory) {
      case "women": return "WOMEN'S TRENDING FASHION";
      case "men": return "MEN'S APPAREL COLLECTION";
      case "kids": return "KIDS' PLAYFUL OUTFITS";
      case "accessories": return "PREMIUM STYLE ACCESSORIES";
      default: return "ALL TRENDING COLLECTIONS";
    }
  };

  return (
    <section className="product-catalog-section section-padding" id="catalog-section">
      {/* 1. Header block */}
      <div className="catalog-header-area">
        <div className="title-block">
          <h2 className="catalog-main-title">{getCollectionTitle()}</h2>
          <span className="results-count">({filteredProducts.length} items found)</span>
        </div>

        {/* Sorting and Mobile toggles */}
        <div className="controls-block">
          {/* Mobile Filter Toggle */}
          <button className="mobile-filter-toggle" onClick={() => setMobileFiltersOpen(true)}>
            <SlidersHorizontal size={16} style={{ marginRight: 8 }} />
            FILTERS
          </button>

          {/* Sorting Dropdown container */}
          <div className="sort-dropdown-container">
            <ArrowUpDown size={14} className="sort-icon" />
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-select-input"
            >
              <option value="popularity">Sort: Best Sellers</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Sort: Top Rated</option>
            </select>
            <ChevronDown size={14} className="arrow-down-icon" />
          </div>
        </div>
      </div>

      {/* 2. Main content split */}
      <div className="catalog-split-layout">
        {/* Desktop Sidebar Filters */}
        <div className="desktop-filters-sidebar">
          <SidebarFilters />
        </div>

        {/* Product Grid Area */}
        <div className="catalog-grid-area">
          {filteredProducts.length > 0 ? (
            <div className="products-card-grid">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="empty-catalog-fallback">
              <ArchiveX className="fallback-icon" size={64} />
              <h3>NO CLOTHES MATCH YOUR CRITERIA</h3>
              <p>We couldn't find any items matching your selected filters. Try broadening your criteria or reset filters.</p>
              <button className="fallback-reset-btn" onClick={resetFilters}>
                CLEAR ALL FILTERS
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 3. Mobile Filters Slide Drawer Overlay */}
      {mobileFiltersOpen && (
        <div className="mobile-filters-overlay" onClick={() => setMobileFiltersOpen(false)}>
          <div className="mobile-filters-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="drawer-header">
              <h3 className="drawer-title">REFINEMENTS</h3>
              <button className="close-filters-btn" onClick={() => setMobileFiltersOpen(false)}>
                <X size={20} />
              </button>
            </div>
            <div className="drawer-scroll-body">
              <SidebarFilters />
            </div>
            <div className="drawer-footer-actions">
              <button className="apply-filters-btn" onClick={() => setMobileFiltersOpen(false)}>
                APPLY FILTERS ({filteredProducts.length})
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
