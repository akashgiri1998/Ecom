import React from 'react';
import { useShop } from '../context/ShopContext';
import { RefreshCw, Filter } from 'lucide-react';
import './SidebarFilters.css';

export default function SidebarFilters() {
  const {
    selectedCategory,
    setSelectedCategory,
    selectedSizes,
    handleSizeFilter,
    selectedColors,
    handleColorFilter,
    priceRange,
    setPriceRange,
    resetFilters
  } = useShop();

  const categories = [
    { id: "all", name: "All Styles" },
    { id: "women", name: "Women's Fashion" },
    { id: "men", name: "Men's Apparel" },
    { id: "kids", name: "Kids' Outfits" },
    { id: "accessories", name: "Premium Accessories" }
  ];

  const sizes = ["2T", "3T", "4T", "XS", "S", "M", "L", "XL", "XXL", "30", "32", "34", "36", "One Size"];

  const colors = [
    { name: "Emerald Green", hex: "#0f5132" },
    { name: "Champagne Gold", hex: "#e5d3b3" },
    { name: "Midnight Black", hex: "#1c1c1c" },
    { name: "Blossom Pink", hex: "#f0b4c4" },
    { name: "Ocean Blue", hex: "#a4c2f4" },
    { name: "Charcoal Grey", hex: "#4a4a4a" },
    { name: "Sand Beige", hex: "#dcd1c4" },
    { name: "Pure White", hex: "#ffffff" },
    { name: "Nautical Red", hex: "#b22222" },
    { name: "Pure Gold", hex: "#ffd700" }
  ];

  return (
    <aside className="sidebar-filters-container">
      {/* 1. Header with clear button */}
      <div className="filter-header-row">
        <div className="title-area">
          <Filter size={18} style={{ marginRight: 8 }} />
          <h3>FILTERS</h3>
        </div>
        <button className="clear-all-btn" onClick={resetFilters}>
          <RefreshCw size={12} style={{ marginRight: 4 }} />
          Reset
        </button>
      </div>

      {/* 2. Category selection list */}
      <div className="filter-group">
        <h4 className="filter-title">COLLECTION</h4>
        <div className="category-options-list">
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`cat-option-btn ${selectedCategory === cat.id ? "active" : ""}`}
              onClick={() => setSelectedCategory(cat.id)}
            >
              <span className="bullet"></span>
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Price slider range */}
      <div className="filter-group">
        <div className="price-title-row">
          <h4 className="filter-title">MAX PRICE</h4>
          <span className="price-bubble">NRS {priceRange}</span>
        </div>
        <input
          type="range"
          min="10"
          max="60"
          step="5"
          value={priceRange}
          onChange={(e) => setPriceRange(Number(e.target.value))}
          className="price-range-slider"
        />
        <div className="range-limits">
          <span>NRS 100</span>
          <span>NRS 6000                             </span>
        </div>
      </div>

      {/* 4. Size selectors */}
      <div className="filter-group">
        <h4 className="filter-title">SIZES</h4>
        <div className="sizes-swatches-grid">
          {sizes.map((size) => {
            const isSelected = selectedSizes.includes(size);
            return (
              <button
                key={size}
                className={`size-swatch-btn ${isSelected ? "active" : ""}`}
                onClick={() => handleSizeFilter(size)}
              >
                {size}
              </button>
            );
          })}
        </div>
      </div>

      {/* 5. Color dots list */}
      <div className="filter-group">
        <h4 className="filter-title">COLORS</h4>
        <div className="colors-palette-list">
          {colors.map((color) => {
            const isSelected = selectedColors.includes(color.hex);
            return (
              <button
                key={color.hex}
                className={`color-dot-btn ${isSelected ? "active" : ""}`}
                style={{ backgroundColor: color.hex }}
                title={color.name}
                onClick={() => handleColorFilter(color.hex)}
              >
                <span className="color-tooltip">{color.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
