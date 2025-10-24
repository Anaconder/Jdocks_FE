import { useEffect, useState } from "react";
import { getInventory, createInventory, deleteInventory } from "../api/inventoryAPI";
import "../styles/inventory.css";

export default function Inventory() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ name: "", qty: "", category: "" });

  useEffect(() => {
    fetchInventory();
  }, []);

  async function fetchInventory() {
    const res = await getInventory();
    setItems(res.data);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await createInventory(form);
    setForm({ name: "", qty: "", category: "" });
    fetchInventory();
  }

  async function handleDelete(id) {
    await deleteInventory(id);
    fetchInventory();
  }

  return (
    <div className="page">
      <h2>Inventory</h2>
      <form onSubmit={handleSubmit} className="inventory-form">
        <input
          type="text"
          placeholder="Item Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Quantity"
          value={form.qty}
          onChange={(e) => setForm({ ...form, qty: e.target.value })}
        />
        <input
          type="text"
          placeholder="Category"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        />
        <button type="submit">Add Item</button>
      </form>

      <ul>
        {items.map((i) => (
          <li key={i._id}>
            {i.name} — {i.qty} pcs ({i.category})
            <button onClick={() => handleDelete(i._id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
