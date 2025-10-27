import React, { useState } from "react";
import "../styles/cart.css";

export default function carts() {
  const [carts, setcarts] = useState([]); 

  const [searchTerm, setSearchTerm] = useState("");

  const filteredItems = carts.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const removeFromcarts = (id) => {
    setcarts(carts.filter(item => item.id !== id));
  };

  return (
    <div className="carts-container">
      <h1>My carts</h1>
      <input
        type="text"
        placeholder="Search carts..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        className="search-input"
      />
      {filteredItems.length === 0 ? <p>No items in carts</p> :
      <div className="grid-container">
        {filteredItems.map(item => (
          <div key={item.id} className="grid-item">
            <img src={item.image} alt={item.name} />
            <h3>{item.name}</h3>
            <p>Qty: {item.quantity}</p>
            <p>Price: ${item.price}</p>
            <button onClick={() => removeFromcarts(item.id)}>Remove</button>
          </div>
        ))}
      </div>}
    </div>
  );
}
