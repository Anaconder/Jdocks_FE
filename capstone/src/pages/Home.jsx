import React, { useEffect, useState } from "react";
import { useStore } from "../context/StoreContext.jsx";

export default function Home() {
  const [items, setItems] = useState([]);
  const { addToCart } = useStore();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/inventory`)
      .then(res => res.json())
      .then(data => setItems(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {items.map(item => (
        <div key={item._id} className="border p-4 rounded shadow">
          <h2 className="font-bold">{item.name}</h2>
          <p>Category: {item.category}</p>
          <p>Qty: {item.qty}</p>
          <button
            onClick={() => addToCart(item)}
            className="bg-blue-500 text-white px-2 py-1 mt-2 rounded"
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
}
