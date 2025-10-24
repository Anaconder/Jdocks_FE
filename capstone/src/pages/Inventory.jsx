// src/pages/Inventory.jsx
import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { apiGet, apiPatch } from '../utils/api.js';

export default function Inventory() {
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user?.admin) return; // don't fetch if not admin
    let mounted = true;
    (async () => {
      setLoading(true);
      try {
        const data = await apiGet('/inventory'); // expects GET /inventory
        if (mounted) setItems(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
        setError('Failed to load inventory');
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => (mounted = false);
  }, [user]);

  async function saveItem(id, updates) {
    setSavingId(id);
    try {
      const updated = await apiPatch(`/inventory/${id}`, updates); // expects PATCH /inventory/:id { name?, qty? }
      setItems((prev) => prev.map(i => i._id === id ? { ...i, ...updated } : i));
    } catch (err) {
      console.error(err);
      setError('Save failed');
    } finally {
      setSavingId(null);
    }
  }

  if (!user) return <div className="p-6">Please login to view inventory.</div>;
  if (!user.admin) return <div className="p-6">Access denied — admin only.</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl mb-4">Inventory (Admin)</h2>
      {error && <div className="text-red-600 mb-3">{error}</div>}
      {loading ? <div>Loading...</div> : (
        <div className="space-y-3">
          {items.map(item => (
            <div key={item._id} className="flex items-center justify-between border rounded p-3">
              <div className="flex-1 pr-4">
                <input
                  className="w-full border px-2 py-1 rounded"
                  value={item.name || ''}
                  onChange={(e) => setItems(prev => prev.map(i => i._id === item._id ? { ...i, name: e.target.value } : i))}
                />
                <div className="text-sm text-gray-600 mt-1">Category: {item.category || '—'}</div>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  className="w-20 border px-2 py-1 rounded"
                  value={item.qty ?? 0}
                  onChange={(e) => setItems(prev => prev.map(i => i._id === item._id ? { ...i, qty: parseInt(e.target.value || '0', 10) } : i))}
                />
                <button
                  onClick={() => saveItem(item._id, { name: item.name, qty: item.qty })}
                  disabled={savingId === item._id}
                  className="px-3 py-1 bg-green-600 text-white rounded"
                >
                  {savingId === item._id ? 'Saving...' : 'Save'}
                </button>
              </div>
            </div>
          ))}
          {items.length === 0 && <div>No inventory items found.</div>}
        </div>
      )}
    </div>
  );
}
