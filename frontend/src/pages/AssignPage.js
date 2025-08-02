// frontend/src/pages/AssignPage.js
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './assign.css'; // 👈 make sure this is imported

function AssignPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { items = [], tip = 0 } = location.state || {};
  const [assignedItems, setAssignedItems] = useState(items);

  const handleAssign = (index, person) => {
    const updated = [...assignedItems];
    updated[index].person = person;
    setAssignedItems(updated);
  };

  const handleNext = () => {
    navigate('/summary', { state: { items: assignedItems, tip } });
  };

  const grandTotal = assignedItems.reduce((sum, item) => sum + Number(item.price || 0), 0);
  return (
    <div className="centered-container" >
      <div className="page-card">
        <h2 className="mb-3">👥 Assign People to Items</h2>
        {assignedItems.map((item, index) => (
          <div key={index} className="mb-3">
  <p><strong><em>{item.name.replace(/\*/g, '')}</em></strong> - ₹{item.price}</p>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="Enter person"
              value={item.person || ''}
              onChange={(e) => handleAssign(index, e.target.value)}
            />
          </div>
        ))}
<h4 className="grand-total">🧾 Grand Total: ₹{grandTotal}</h4>

        
        <button className="btn btn-primary w-100 mt-3" onClick={handleNext}>
          Next: View Summary →
        </button>
      </div>
    </div>
  );
}

export default AssignPage;
