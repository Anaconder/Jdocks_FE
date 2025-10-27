import React, { useState } from "react";
import "../styles/Inventory.css";

export default function Inventory() {
  const [inventory] = useState([
    { id: 1, name: "Motor", quantity: 10 },
    { id: 2, name: "Capacitor", quantity: 25 },
    { id: 3, name: "Cable", quantity: 50 },
  ]);

  return (
    <div className="inventory-container">
      <h1>Inventory</h1>
      <ul>
        {inventory.map(item => (
          <li key={item.id}>{item.name} - {item.quantity} pcs</li>
        ))}
      </ul>
    </div>
  );
}
