import React from 'react';
import { useStore } from '../context/StoreContext.jsx';

export default function Cart() {
  const { cart, updateQty, removeFromCart } = useStore();

  const total = cart.reduce((s, it) => s + ((it.price || 0) * (it.qty || 1)), 0);

  return (
    <div className="p-6">
      <h2 className="text-2xl mb-4">Your Cart</h2>
      {cart.length === 0 ? <div>Your cart is empty.</div> : (
        <div className="space-y-3">
          {cart.map(it => (
            <div key={it._id} className="flex items-center justify-between border p-3 rounded">
              <div>
                <div className="font-semibold">{it.name}</div>
                <div className="text-sm text-gray-500">${(it.price || 0).toFixed(2)}</div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => updateQty(it._id, Math.max(1, (it.qty || 1) - 1))} className="px-2 py-1 border rounded">-</button>
                <div className="px-3">{it.qty}</div>
                <button onClick={() => updateQty(it._id, (it.qty || 1) + 1)} className="px-2 py-1 border rounded">+</button>
                <button onClick={() => removeFromCart(it._id)} className="ml-4 px-3 py-1 bg-red-500 text-white rounded">Remove</button>
              </div>
            </div>
          ))}
          <div className="text-right font-bold">Total: ${total.toFixed(2)}</div>
        </div>
      )}
    </div>
  );
}
