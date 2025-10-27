import React, { useState } from "react";
import { inventoryData } from "../data/data";
import "../styles/Inventory.css";

export default function Inventory({ carts, setcarts }) {
  const [items, setItems] = useState(inventoryData);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addTocarts = (item) => {
    if (!carts.find(i => i.id === item.id)) {
      setcarts([...carts, item]);
    }
  };

  const removeFromInventory = (item) => {
    setItems(items.filter(i => i.id !== item.id));
    setcarts(carts.filter(i => i.id !== item.id)); // optional: remove from carts too
  };

  return (
    <div className="inventory-container">
      <h1>Inventory</h1>
      <input
        type="text"
        placeholder="Search inventory..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        className="search-input"
      />
      <ul>
        {filteredItems.map(item => (
          <li key={item.id}>
            <strong>{item.name}</strong> - Qty: {item.quantity} - Price: ${item.price}
            <button onClick={() => addTocarts(item)}>Add to carts</button>
            <button onClick={() => removeFromInventory(item)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
