import React, { createContext, useReducer, useContext } from 'react';

// Initial state
const initialState = {
  items: [
    { _id: '1', name: 'Item 1', price: 10, quantity: 5 },
    { _id: '2', name: 'Item 2', price: 20, quantity: 3 },
    { _id: '3', name: 'Item 3', price: 15, quantity: 8 },
  ],
  cart: []
};

// Reducer
function storeReducer(state, action) {
  switch (action.type) {
    case 'SET_ITEMS':
      return { ...state, items: action.payload };
    case 'ADD_TO_CART': {
      const item = action.payload;
      const existing = state.cart.find(i => i._id === item._id);
      if (existing) {
        return {
          ...state,
          cart: state.cart.map(i =>
            i._id === item._id ? { ...i, qty: i.qty + 1 } : i
          )
        };
      }
      return { ...state, cart: [...state.cart, { ...item, qty: 1 }] };
    }
    case 'REMOVE_FROM_CART':
      return { ...state, cart: state.cart.filter(i => i._id !== action.payload) };
    case 'SET_CART_QTY':
      return {
        ...state,
        cart: state.cart.map(i =>
          i._id === action.payload.id ? { ...i, qty: action.payload.qty } : i
        )
      };
    default:
      return state;
  }
}

// Create context
const StoreContext = createContext();

// Provider component
export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(storeReducer, initialState);
  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
}

// Hook to use in components
export function useStore() {
  return useContext(StoreContext);
}
