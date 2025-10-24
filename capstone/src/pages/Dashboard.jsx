import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useStore } from '../context/StoreContext';

export default function Dashboard() {
  const { user } = useAuth();
  const { state } = useStore();
  const cartCount = state.cart.reduce((s, c) => s + (c.qty || 0), 0);
  const itemsCount = state.items.length;
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="border rounded p-4">
          <div className="text-sm text-gray-500">Logged-in user</div>
          <div className="font-semibold">{user ? user.username : 'Guest'}</div>
        </div>
        <div className="border rounded p-4">
          <div className="text-sm text-gray-500">Inventory items</div>
          <div className="font-semibold">{itemsCount}</div>
        </div>
        <div className="border rounded p-4">
          <div className="text-sm text-gray-500">Cart items</div>
          <div className="font-semibold">{cartCount}</div>
        </div>
      </div>
    </div>
  );
}
