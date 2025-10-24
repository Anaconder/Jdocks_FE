import React, { createContext, useContext, useState } from "react";

const StoreContext = createContext();

export function StoreProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    setCart(prev => {
      const exist = prev.find(i => i._id === item._id);
      if (exist) return prev.map(i => i._id === item._id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const removeFromCart = (itemId) => {
    setCart(prev => prev.filter(i => i._id !== itemId));
  };

  const updateQty = (itemId, qty) => {
    setCart(prev => prev.map(i => i._id === itemId ? { ...i, qty } : i));
  };

  return (
    <StoreContext.Provider value={{ cart, addToCart, removeFromCart, updateQty }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  return useContext(StoreContext);
}
