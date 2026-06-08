import React from 'react';
import { ShopProvider } from './context/ShopContext';
import Header from './components/Header';
import HeroCarousel from './components/HeroCarousel';
import ProductCatalog from './components/ProductCatalog';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import WishlistDrawer from './components/WishlistDrawer';
import ProductDetailModal from './components/ProductDetailModal';
import CheckoutFlow from './components/CheckoutFlow';

function AppContent() {
  return (
    <div className="app-viewport-wrapper">
      {/* Navigation and Announcement Ticker */}
      <Header />

      <main className="main-content-scroller">
        {/* Promos & Banners sliders */}
        <HeroCarousel />

        {/* Categories, Filters, Grid Catalog */}
        <ProductCatalog />
      </main>

      {/* Branded footer + value prop banner + newsletter */}
      <Footer />

      {/* Slide drawers & Overlays */}
      <CartDrawer />
      <WishlistDrawer />
      <ProductDetailModal />
      <CheckoutFlow />
    </div>
  );
}

export default function App() {
  return (
    <ShopProvider>
      <AppContent />
    </ShopProvider>
  );
}
