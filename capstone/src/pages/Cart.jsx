import React from 'react';
import { useStore } from '../context/StoreContext';

export default function Cart() {
  const { state, dispatch } = useStore();

  const updateQty = (id, qty) => {
    if (qty < 1) return;
    dispatch({ type: 'SET_CART_QTY', payload: { id, qty } });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      {state.cart.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        <div className="space-y-4">
          {state.cart.map(item => (
            <div key={item._id} className="flex items-center justify-between border p-4 rounded shadow">
              <div>
                <h3 className="font-bold">{item.name}</h3>
                <p>${item.price.toFixed(2)}</p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => dispatch({ type: 'REMOVE_FROM_CART', payload: item._id })}
                >Remove</button>
                <input
                  type="number"
                  value={item.qty}
                  min="1"
                  onChange={(e) => updateQty(item._id, parseInt(e.target.value))}
                  className="border rounded px-2 py-1 w-16 text-center"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
