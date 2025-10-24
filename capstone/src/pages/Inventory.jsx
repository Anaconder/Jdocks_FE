import React, { useState } from 'react';
import AdminRoute from '../components/AdminRoute';
import { useStore } from '../context/StoreContext';

export default function InventoryPage() {
  const { state, updateItemOnServer } = useStore();
  const items = state.items || [];
  const [savingId, setSavingId] = useState(null);
  const [local, setLocal] = useState(() => (items.map(i => ({ ...i })) ));

  // Keep in sync when items change
  React.useEffect(() => setLocal(items.map(i => ({ ...i }))), [items]);

  async function save(item) {
    setSavingId(item._id);
    try {
      await updateItemOnServer(item._id, { name: item.name, qty: item.qty });
    } catch (err) {
      alert('Save failed: ' + (err.message || err));
    } finally {
      setSavingId(null);
    }
  }

  return (
    <AdminRoute>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Inventory (admin)</h1>
        <div className="space-y-3">
          {local.map(it => (
            <div key={it._id} className="flex items-center justify-between border rounded p-3">
              <div className="flex-1 pr-4">
                <input className="w-full border px-2 py-1 rounded" value={it.name || ''} onChange={(e) => setLocal(prev => prev.map(p => p._id === it._id ? { ...p, name: e.target.value } : p))} />
                <div className="text-sm text-gray-500">Category: {it.category || '—'}</div>
              </div>
              <div className="flex items-center gap-2">
                <input type="number" className="w-20 border px-2 py-1 rounded" value={it.qty ?? 0} onChange={(e) => setLocal(prev => prev.map(p => p._id === it._id ? { ...p, qty: parseInt(e.target.value || '0', 10) } : p))} />
                <button onClick={() => save(it)} disabled={savingId === it._id} className="px-3 py-1 bg-green-600 text-white rounded">{savingId === it._id ? 'Saving...' : 'Save'}</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminRoute>
  );
}
