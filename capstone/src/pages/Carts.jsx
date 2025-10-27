import React, { useState } from "react";
import "../styles/Cart.css";

export default function Cart() {
  const [cartItems] = useState([
    { id: 1, name: "Transformer" },
    { id: 2, name: "Circuit Breaker" },
    { id: 3, name: "Resistor" },
  ]);

  return (
    <div className="cart-container">
      <h1>JDocks Cart</h1>
      <ul>
        {cartItems.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}
