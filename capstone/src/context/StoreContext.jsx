import React, { createContext, useContext, useState, useEffect } from "react";
import { fetchInventory } from "../api/inventoryApi";
import { getCart } from "../api/cartApi";

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const [inventory, setInventory] = useState([]);
  const [cart, setCart] = useState(null);

  useEffect(() => {
    fetchInventory().then(setInventory);
  }, []);

  const loadCart = async (cartId) => {
    const data = await getCart(cartId);
    setCart(data);
  };

  const addToCart = (item) => {
    if (!cart) return;
    setCart({ ...cart, items: [...cart.items, item] });
  };

  return (
    <StoreContext.Provider
      value={{ inventory, cart, setCart, addToCart, loadCart }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);
