import React, { useState } from "react";
import { inventoryData } from "../data/data";
import "../styles/Home.css";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [carts, setcarts] = useState([]);

  const filteredItems = inventoryData.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addTocarts = (item) => {
    if (!carts.find(i => i.id === item.id)) {
      setcarts([...carts, item]);
    }
  };

  return (
    <div className="home-container">
      <h1>Welcome to JDocks</h1>
      <input
        type="text"
        placeholder="Search items..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        className="search-input"
      />
      <div className="grid-container">
        {filteredItems.map(item => (
          <div key={item.id} className="grid-item">
            <img src={item.image} alt={item.name} />
            <h3>{item.name}</h3>
            <p>Qty: {item.quantity}</p>
            <p>Price: ${item.price}</p>
            <button onClick={() => addTocarts(item)}>Add to carts</button>
          </div>
        ))}
      </div>
    </div>
  );
}
