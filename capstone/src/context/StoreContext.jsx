import React, { createContext, useContext, useState } from 'react';

const StoreContext = createContext();

const INITIAL_ITEMS = [
  { id: 1, name: 'Apple', quantity: 10 },
  { id: 2, name: 'Banana', quantity: 15 },
  { id: 3, name: 'Orange', quantity: 20 },
];

export const StoreProvider = ({ children }) => {
  const [items, setItems] = useState(INITIAL_ITEMS);
  const [cart, setCart] = useState([]);

  const addToCart = (id) => {
    setCart(prev => {
      const exists = prev.find(i => i.id === id);
      if (exists) return prev.map(i => i.id === id ? { ...i, quantity: i.quantity + 1 } : i);
      const item = items.find(i => i.id === id);
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(i => i.id !== id));
  };

  const updateItem = (id, name, quantity) => {
    setItems(prev => prev.map(i => i.id === id ? { ...i, name, quantity } : i));
  };

  const updateCartQuantity = (id, qty) => {
    setCart(prev => prev.map(i => i.id === id ? { ...i, quantity: qty } : i));
  };

  return (
    <StoreContext.Provider value={{ items, cart, addToCart, removeFromCart, updateItem, updateCartQuantity }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);

