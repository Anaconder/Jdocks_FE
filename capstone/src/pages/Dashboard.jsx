import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { useStore } from '../context/StoreContext.jsx';
import { apiGet } from '../utils/api.js';

export default function Dashboard() {
  const { user } = useAuth();
  const { cart } = useStore();
  const [itemsCount, setItemsCount] = useState(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const items = await apiGet('/inventory');
        if (mounted) setItemsCount(Array.isArray(items) ? items.length : 0);
      } catch {
        if (mounted) setItemsCount(null);
      }
    })();
    return () => (mounted = false);
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl mb-4">Dashboard</h2>
      <div>Logged in as: {user ? user.username : 'Guest'}</div>
      <div>Cart items: {cart.reduce((s, i) => s + (i.qty || 0), 0)}</div>
      <div>Inventory count: {itemsCount === null ? '—' : itemsCount}</div>
    </div>
  );
}
