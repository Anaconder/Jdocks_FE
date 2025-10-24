import { useEffect, useState } from "react";
import { getCart, deleteCart } from "../api/cartAPI";
import "../styles/carts.css";

export default function Carts() {
  const [cartId, setCartId] = useState("");
  const [cart, setCart] = useState(null);

  async function fetchCart() {
    if (!cartId) return;
    const res = await getCart(cartId);
    setCart(res.data);
  }

  async function handleDelete() {
    await deleteCart(cartId);
    setCart(null);
    setCartId("");
  }

  return (
    <div className="page">
      <h2>Carts</h2>
      <input
        type="text"
        placeholder="Enter Cart ID"
        value={cartId}
        onChange={(e) => setCartId(e.target.value)}
      />
      <button onClick={fetchCart}>Fetch Cart</button>

      {cart && (
        <div>
          <h3>{cart.name}</h3>
          <ul>
            {cart.items.map((it) => (
              <li key={it._id}>{it.item.name} — {it.qty}</li>
            ))}
          </ul>
          <button onClick={handleDelete}>Delete Cart</button>
        </div>
      )}
    </div>
  );
}
