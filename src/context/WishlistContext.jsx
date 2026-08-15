import React, { createContext, useContext, useState, useEffect } from 'react';
import { useCart } from 'react-use-cart';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const { addItem } = useCart();
  const [wishlistItems, setWishlistItems] = useState(() => {
    try {
      const saved = localStorage.getItem('aero_step_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Error loading wishlist from localStorage:', e);
      return [];
    }
  });

  const [toastNotification, setToastNotification] = useState({
    show: false,
    message: '',
    type: 'add',
    product: null,
  });

  useEffect(() => {
    try {
      localStorage.setItem('aero_step_wishlist', JSON.stringify(wishlistItems));
    } catch (e) {
      console.error('Error saving wishlist to localStorage:', e);
    }
  }, [wishlistItems]);

  const showToast = (message, type, product) => {
    setToastNotification({ show: true, message, type, product });
    setTimeout(() => {
      setToastNotification((prev) => ({ ...prev, show: false }));
    }, 3000);
  };

  const isInWishlist = (productId) => {
    return wishlistItems.some((item) => String(item.id) === String(productId));
  };

  const addToWishlist = (product) => {
    if (!product || !product.id) return;
    if (!isInWishlist(product.id)) {
      const updated = [product, ...wishlistItems];
      setWishlistItems(updated);
      showToast('Added to wishlist', 'add', product);
    }
  };

  const removeFromWishlist = (productId) => {
    const target = wishlistItems.find((item) => String(item.id) === String(productId));
    const updated = wishlistItems.filter((item) => String(item.id) !== String(productId));
    setWishlistItems(updated);
    if (target) {
      showToast('Removed from wishlist', 'remove', target);
    }
  };

  const toggleWishlist = (product) => {
    if (!product || !product.id) return;
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const moveToCart = (product) => {
    if (!product) return;
    addItem({
      id: String(product.id),
      price: product.price,
      name: typeof product.title === 'string' ? product.title : product.title?.en || 'Product',
      image: product.images?.[0] || product.image || '',
    });
    removeFromWishlist(product.id);
    showToast('Moved to shopping cart', 'move', product);
  };

  const clearWishlist = () => {
    setWishlistItems([]);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        totalWishlistItems: wishlistItems.length,
        isInWishlist,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        moveToCart,
        clearWishlist,
        toastNotification,
        hideToast: () => setToastNotification((prev) => ({ ...prev, show: false })),
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};

export default WishlistContext;
