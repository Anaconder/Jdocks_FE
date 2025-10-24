import React from 'react';
import { useStore } from '../context/StoreContext';

export default function Home() {
  const { state, addToCart } = useStore();
  const items = state.items || [];
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Home</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map(item => (
          <div key={item._id} className="border p-4 rounded flex flex-col">
            <div className="flex-1">
              <h3 className="font-semibold">{item.name}</h3>
              <p className="text-sm text-gray-600">{item.category || ''}</p>
            </div>
            <div className="mt-2 flex items-center justify-between">
              <div className="text-sm">Qty: {item.qty ?? 0}</div>
              <button
                onClick={() => addToCart(item)}
                disabled={(item.qty ?? 0) <= 0}
                className="px-3 py-1 bg-blue-600 text-white rounded disabled:opacity-60"
              >Add</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
