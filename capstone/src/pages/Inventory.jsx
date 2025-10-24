import React from 'react';
import { useStore } from '../context/StoreContext';
import { patchItemQuantity } from '../api/api';
import ItemCard from '../components/ItemCard';

export default function Inventory() {
  const { state, dispatch } = useStore();

  const handleQtyChange = async (id, qty) => {
    if (qty < 0) return;
    try {
      await patchItemQuantity(id, qty);
      dispatch({ type: 'SET_ITEMS', payload: state.items.map(i => i._id === id ? { ...i, quantity: qty } : i) });
    } catch (err) {
      console.error(err);
    }
  };

  const handleNameChange = (id, name) => {
    dispatch({ type: 'SET_ITEMS', payload: state.items.map(i => i._id === id ? { ...i, name } : i) });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Inventory (Admin)</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {state.items.map(item => (
          <div key={item._id}>
            <ItemCard item={item} editable onChangeName={handleNameChange} />
            <div className="flex mt-2 items-center space-x-2">
              <button
                className="bg-red-500 text-white px-2 py-1 rounded"
                onClick={() => handleQtyChange(item._id, item.quantity - 1)}
              >-</button>
              <span>{item.quantity}</span>
              <button
                className="bg-green-500 text-white px-2 py-1 rounded"
                onClick={() => handleQtyChange(item._id, item.quantity + 1)}
              >+</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
