// frontend/src/pages/SummaryPage.js
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './sum.css'; // Ensure you have a CSS file for styling
function SummaryPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { items, tip } = location.state || {};


  if (!items || items.length === 0) return <p>No data available</p>;

  // Calculate totals per person
  const peopleTotals = {};

  let subtotal = 0;
items.forEach(item => {
  if (!item.person) return; // Skip unassigned items

  subtotal += parseFloat(item.price);

  if (!peopleTotals[item.person]) {
    peopleTotals[item.person] = 0;
  }

  peopleTotals[item.person] += parseFloat(item.price);
});

  // Split tip proportionally
  const totalWithTip = subtotal + parseFloat(tip);
  const summary = Object.entries(peopleTotals).map(([person, amount]) => {
    const share = (amount / subtotal) * parseFloat(tip);
    
    return {
      person,
      subtotal: amount.toFixed(2),
      tip: share.toFixed(2),
      total: (amount + share).toFixed(2)
    };
  });
const grandTotal = summary.reduce((sum, entry) => sum + parseFloat(entry.total), 0).toFixed(2);

  return (
        <div className="centered-container" >
    <div className="container mt-5">
      <h2>🧾 Final Split Summary</h2>
      <table className="table mt-4">
        <thead>
          <tr>
          <th>Name</th>
            <th>Subtotal</th>
            <th>Tip Share</th>
            <th>Total to Pay</th>
          </tr>
        </thead>
        <tbody>
          {summary.map((entry, index) => (
            <tr key={index}>
              <td>{entry.person}</td>
              <td>₹{entry.subtotal}</td>
              <td>₹{entry.tip}</td>
              <td>₹{entry.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
<h5 className="grand-total">🧾 Grand Total (incl. tip): ₹{grandTotal}</h5>
      <button className="btn btn-primary" onClick={() => navigate('/')}>
        🔁 Start New
      </button>

    </div>
    </div>
    
  );
}

export default SummaryPage;
