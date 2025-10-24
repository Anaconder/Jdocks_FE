import React from 'react';

export default function ItemCard({ item, onAdd, editable, onChangeName }) {
  return (
    <div className="border p-4 rounded shadow flex flex-col">
      {editable ? (
        <input type="text" value={item.name} onChange={(e) => onChangeName(item._id, e.target.value)} className="border p-1 rounded mb-2" />
      ) : (
        <h3 className="font-bold mb-2">{item.name}</h3>
      )}
      <p className="mb-2">{item.description}</p>
      <div className="mb-2">${item.price.toFixed(2)}</div>
      {!editable && <button onClick={() => onAdd(item)} className="bg-blue-600 text-white rounded px-3 py-1">Add</button>}
    </div>
  );
}
