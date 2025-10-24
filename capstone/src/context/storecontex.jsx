import React, { createContext, useContext, useEffect, useReducer } from 'react';
import api from '../utils/api';

const StoreContext = createContext();

const initialState = {
  items: [],
  cart: [], // local cart; you can sync with backend if desired
  loading: false,
  error: null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'LOADING': return { ...state, loading: true, error: null };
    case 'SET_ITEMS': return { ...state, loading: false, items: action.payload };
    case 'SET_ERROR': return { ...state, loading: false, error: action.payload };
    case 'ADD_TO_CART': {
      const it = action.payload;
      const found = state.cart.find(c => c._id === it._id);
      if (found) {
        return { ...state, cart: state.cart.map(c => c._id === it._id ? { ...c, qty: c.qty + 1 } : c) };
      }
      return { ...state, cart: [...state.cart, { ...it, qty: 1 }] };
    }
    case 'REMOVE_FROM_CART':
      return { ...state, cart: state.cart.filter(c => c._id !== action.payload) };
    case 'SET_CART_QTY':
      return { ...state, cart: state.cart.map(c => c._id === action.payload.id ? { ...c, qty: action.payload.qty } : c) };
    case 'UPDATE_ITEM_LOCAL':
      return { ...state, items: state.items.map(i => i._id === action.payload._id ? action.payload : i) };
    default: return state;
  }
}

export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    async function loadItems() {
      dispatch({ type: 'LOADING' });
      try {
        const res = await api.get('/inventory');
        dispatch({ type: 'SET_ITEMS', payload: res.data || res });
      } catch (err) {
        console.error(err);
        dispatch({ type: 'SET_ERROR', payload: err.message || 'Failed' });
      }
    }
    loadItems();
  }, []);

  const addToCart = (item) => dispatch({ type: 'ADD_TO_CART', payload: item });
  const removeFromCart = (id) => dispatch({ type: 'REMOVE_FROM_CART', payload: id });
  const setCartQty = (id, qty) => dispatch({ type: 'SET_CART_QTY', payload: { id, qty } });

  const updateItemOnServer = async (id, updates) => {
    try {
      const res = await api.put(`/inventory/${id}`, updates);
      // some backends return message, others updated item — we optimistically update local store
      // prefer res.data else merge updates
      const updated = res.data || { ...updates, _id: id };
      dispatch({ type: 'UPDATE_ITEM_LOCAL', payload: updated });
      return updated;
    } catch (err) {
      throw err;
    }
  };

  return (
    <StoreContext.Provider value={{ state, addToCart, removeFromCart, setCartQty, updateItemOnServer }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  return useContext(StoreContext);
}
