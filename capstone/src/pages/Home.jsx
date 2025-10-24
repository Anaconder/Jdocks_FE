import React, { useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { fetchItems } from '../api/api';
import ItemCard from '../components/ItemCard';

export default function Home() {
  const { state, dispatch } = useStore();

  useEffect(() => {
    async function loadItems() {
      try {
        const items = await fetchItems();
        dispatch({ type: 'SET_ITEMS', payload: items });
      } catch (err) {
        console.error(err);
      }
    }
    loadItems();
  }, [dispatch]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">All Items</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {state.items.map(item => (
          <ItemCard key={item._id} item={item} onAdd={(i) => dispatch({ type: 'ADD_TO_CART', payload: i })} />
        ))}
      </div>
    </div>
  );
}
