import React, { useState } from "react";
import "../styles/cart.css";

export default function carts() {
  const [carts] = useState([
    { id: 1, name: "Transformer" },
    { id: 2, name: "Circuit Breaker" },
    { id: 3, name: "Resistor" },
  ]);

  return (
    <div>
      <h1>Jdocks carts</h1>
      <ul>
        {carts.map(cart => <li key={cart.id}>{cart.name}</li>)}
      </ul>
    </div>
  );
}
