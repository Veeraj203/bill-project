import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './CommonPage.css'; // <-- Import shared styles

function ItemsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [items, setItems] = useState(location.state?.items || []);
  const [tip, setTip] = useState(0);

  useEffect(() => {
    if (!items.length) navigate('/');
  }, []);

  const handleNext = () => {
    const updated = items.map(item => ({
      ...item,
      price: parseFloat(item.price)
    }));
    navigate('/assign', { state: { items: updated, tip } });
  };

  return (
    <div className="centered-container">
      <div className="page-card">
        <h2>🧾 Extracted Receipt Items</h2>
        <ul className="list-group mb-3">
          {items.map((item, idx) => (
            <li key={idx} className="list-group-item d-flex justify-content-between">
              <input
                type="text"
                className="form-control me-2"
                value={item.name}
                onChange={e => {
                  const arr = [...items];
                  arr[idx].name = e.target.value;
                  setItems(arr);
                }}
              />
              <input
                type="number"
                className="form-control"
                placeholder="₹"
                value={item.price}
                onChange={e => {
                  const arr = [...items];
                  arr[idx].price = e.target.value;
                  setItems(arr);
                }}
              />
            </li>
          ))}
        </ul>

        <div className="mb-3 text-start">
          <label>Add Tip (₹):</label>
          <input
            type="number"
            className="form-control"
            value={tip}
            onChange={e => setTip(e.target.value)}
          />
        </div>

        <button className="btn btn-primary w-100" onClick={handleNext}>
          Next: Assign People →
        </button>
      </div>
    </div>
  );
}

export default ItemsPage;
