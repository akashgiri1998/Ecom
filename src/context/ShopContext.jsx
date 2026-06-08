import React, { createContext, useState, useContext, useEffect } from 'react';
import { products } from '../data/products';

const ShopContext = createContext();

export const useShop = () => useContext(ShopContext);

export const ShopProvider = ({ children }) => {
  // Products
  const [productList] = useState(products);

  // Cart & Wishlist State
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  // UI States
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [detailProduct, setDetailProduct] = useState(null); // Active product in detailed modal
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState(1); // 1: Shipping, 2: Payment, 3: Success

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [priceRange, setPriceRange] = useState(6000); // Max product price is 6000 NRS
  const [sortBy, setSortBy] = useState("popularity"); // popularity, price-low, price-high, rating

  // Checkout Data
  const [promoCode, setPromoCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [shippingAddress, setShippingAddress] = useState({
    fullName: "",
    email: "",
    address: "",
    city: "",
    zipCode: ""
  });
  const [paymentDetails, setPaymentDetails] = useState({
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvv: ""
  });
  const [orders, setOrders] = useState([]);

  // Load state from localStorage on startup if available
  useEffect(() => {
    const savedCart = localStorage.getItem('akarien_cart');
    const savedWishlist = localStorage.getItem('akarien_wishlist');
    if (savedCart) setCart(JSON.parse(savedCart));
    if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
  }, []);

  // Sync state to localStorage
  useEffect(() => {
    localStorage.setItem('akarien_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('akarien_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Cart Operations
  const addToCart = (product, size, color, quantity = 1) => {
    if (!size) {
      alert("Please select a size first!");
      return;
    }
    if (!color) {
      alert("Please select a color first!");
      return;
    }

    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(
        (item) =>
          item.id === product.id &&
          item.selectedSize === size &&
          item.selectedColor.name === color.name
      );

      if (existingItemIndex > -1) {
        const newCart = [...prevCart];
        newCart[existingItemIndex].quantity += quantity;
        return newCart;
      } else {
        return [
          ...prevCart,
          {
            id: product.id,
            name: product.name,
            price: product.price,
            originalPrice: product.originalPrice,
            image: product.images[0],
            selectedSize: size,
            selectedColor: color,
            quantity: quantity,
            category: product.category
          }
        ];
      }
    });

    // Animate cart button or open cart drawer to give direct feedback
    setCartOpen(true);
  };

  const updateCartQuantity = (productId, size, colorName, newQty) => {
    if (newQty <= 0) {
      removeFromCart(productId, size, colorName);
      return;
    }

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId &&
        item.selectedSize === size &&
        item.selectedColor.name === colorName
          ? { ...item, quantity: newQty }
          : item
      )
    );
  };

  const removeFromCart = (productId, size, colorName) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (
            item.id === productId &&
            item.selectedSize === size &&
            item.selectedColor.name === colorName
          ) {
            return { ...item, quantity: item.quantity - 1 };
          }
          return item;
        })
        .filter((item) => item.quantity > 0)
    );
  };

  const deleteFromCart = (productId, size, colorName) => {
    setCart((prevCart) =>
      prevCart.filter(
        (item) =>
          !(
            item.id === productId &&
            item.selectedSize === size &&
            item.selectedColor.name === colorName
          )
      )
    );
  };

  // Wishlist Operations
  const toggleWishlist = (product) => {
    setWishlist((prevWishlist) => {
      const exists = prevWishlist.some((item) => item.id === product.id);
      if (exists) {
        return prevWishlist.filter((item) => item.id !== product.id);
      } else {
        return [...prevWishlist, product];
      }
    });
  };

  // Promo Code Operations
  const applyPromo = (code) => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === "AKARIEN15") {
      setPromoCode("AKARIEN15");
      setDiscountPercent(15);
      return { success: true, message: "15% discount applied successfully!" };
    } else if (cleanCode === "SASTORAMRO") {
      setPromoCode("SASTORAMRO");
      setDiscountPercent(20);
      return { success: true, message: "20% discount applied successfully!" };
    } else {
      return { success: false, message: "Invalid promo code! Try AKARIEN15 or SASTORAMRO." };
    }
  };

  const removePromo = () => {
    setPromoCode("");
    setDiscountPercent(0);
  };

  // Checkout Operations
  const placeOrder = () => {
    const newOrder = {
      orderId: `AKR-${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toLocaleDateString(),
      items: [...cart],
      address: { ...shippingAddress },
      financials: {
        subtotal: getCartSubtotal(),
        discount: getCartDiscount(),
        shipping: getShippingCost(),
        total: getCartTotal()
      }
    };
    setOrders((prev) => [newOrder, ...prev]);
    setCart([]); // Clear cart after placing order
    removePromo();
  };

  // Pricing calculations
  const getCartSubtotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getCartDiscount = () => {
    const subtotal = getCartSubtotal();
    return subtotal * (discountPercent / 100);
  };

  const getShippingCost = () => {
    const subtotal = getCartSubtotal();
    if (subtotal === 0) return 0;
    return subtotal >= 3000 ? 0 : 250; // Free shipping over NRS 3000, flat NRS 250 otherwise
  };

  const getCartTotal = () => {
    return getCartSubtotal() - getCartDiscount() + getShippingCost();
  };

  // Filter handlers
  const handleSizeFilter = (size) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const handleColorFilter = (colorHex) => {
    setSelectedColors((prev) =>
      prev.includes(colorHex) ? prev.filter((c) => c !== colorHex) : [...prev, colorHex]
    );
  };

  const resetFilters = () => {
    setSelectedSizes([]);
    setSelectedColors([]);
    setPriceRange(6000);
    setSortBy("popularity");
    setSelectedCategory("all");
    setSearchQuery("");
  };

  // Get Filtered and Sorted Products
  const getFilteredProducts = () => {
    return productList
      .filter((product) => {
        // Category filter
        if (selectedCategory !== "all" && product.category !== selectedCategory) {
          return false;
        }

        // Search query filter
        if (searchQuery) {
          const query = searchQuery.toLowerCase();
          const matchTitle = product.name.toLowerCase().includes(query);
          const matchDesc = product.description.toLowerCase().includes(query);
          const matchTags = product.tags.some((tag) => tag.toLowerCase().includes(query));
          if (!matchTitle && !matchDesc && !matchTags) return false;
        }

        // Price range filter
        if (product.price > priceRange) {
          return false;
        }

        // Size filter
        if (selectedSizes.length > 0) {
          const hasMatchingSize = product.sizes.some((size) => selectedSizes.includes(size));
          if (!hasMatchingSize) return false;
        }

        // Color filter
        if (selectedColors.length > 0) {
          const hasMatchingColor = product.colors.some((color) => selectedColors.includes(color.hex));
          if (!hasMatchingColor) return false;
        }

        return true;
      })
      .sort((a, b) => {
        // Sort operations
        if (sortBy === "price-low") {
          return a.price - b.price;
        } else if (sortBy === "price-high") {
          return b.price - a.price;
        } else if (sortBy === "rating") {
          return b.rating - a.rating;
        }
        // Popularity: sort by reviews count
        return b.ratingCount - a.ratingCount;
      });
  };

  return (
    <ShopContext.Provider
      value={{
        products: productList,
        cart,
        wishlist,
        cartOpen,
        setCartOpen,
        wishlistOpen,
        setWishlistOpen,
        detailProduct,
        setDetailProduct,
        checkoutOpen,
        setCheckoutOpen,
        checkoutStep,
        setCheckoutStep,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        selectedSizes,
        selectedColors,
        priceRange,
        setPriceRange,
        sortBy,
        setSortBy,
        promoCode,
        discountPercent,
        shippingAddress,
        setShippingAddress,
        paymentDetails,
        setPaymentDetails,
        orders,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        deleteFromCart,
        toggleWishlist,
        applyPromo,
        removePromo,
        placeOrder,
        getCartSubtotal,
        getCartDiscount,
        getShippingCost,
        getCartTotal,
        handleSizeFilter,
        handleColorFilter,
        resetFilters,
        filteredProducts: getFilteredProducts()
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};
