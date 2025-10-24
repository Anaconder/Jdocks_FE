const BASE_URL = 'http://localhost:5000'; // Replace with your backend link

export async function fetchItems() {
  const res = await fetch(`${BASE_URL}/api/items`);
  if (!res.ok) throw new Error('Failed to fetch items');
  return res.json();
}

export async function patchItemQuantity(id, quantity) {
  const res = await fetch(`${BASE_URL}/api/items/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ quantity }),
  });
  if (!res.ok) throw new Error('Failed to update item');
  return res.json();
}
