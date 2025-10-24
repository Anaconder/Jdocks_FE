import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useStore } from '../context/StoreContext';

export default function Dashboard() {
  const { user } = useAuth();
  const { state } = useStore();

  const totalCart = state.cart.reduce((acc, i) => acc + i.qty * i.price, 0);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      <p>Logged in as: {user?.username || 'Guest'}</p>
      <p>Cart items: {state.cart.length}</p>
      <p>Cart total: ${totalCart.toFixed(2)}</p>
    </div>
  );
}
