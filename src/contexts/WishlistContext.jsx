import React, { createContext, useState, useEffect, useContext } from 'react';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    const savedWishlist = localStorage.getItem('wishlist_items');
    if (savedWishlist) {
      setWishlistItems(JSON.parse(savedWishlist));
    }
  }, []);

  useEffect(() => {
    if (wishlistItems.length > 0) {
      localStorage.setItem('wishlist_items', JSON.stringify(wishlistItems));
    } else {
      localStorage.removeItem('wishlist_items');
    }
  }, [wishlistItems]);

  const addToWishlist = (product, selectedColor, selectedImage) => {
    setWishlistItems((prevItems) => {
      if (!prevItems.some((item) => item.id === product.id)) {
        const newItems = [
          ...prevItems,
          {
            id: product.id,
            name: product.name,
            price: product.price,
            color: selectedColor,
            image: selectedImage,
          },
        ];
        localStorage.setItem('wishlist_items', JSON.stringify(newItems));
        return newItems;
      }
      return prevItems;
    });
  };

  const clearWishlist = () => {
    setWishlistItems([]);
  };

  const removeFromWishlist = (productId) => {
    setWishlistItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId),
    );
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        addToWishlist,
        removeFromWishlist,
        wishlistCount: wishlistItems.length,
        clearWishlist: clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
