import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UploadPage from './pages/UploadPage';
import ItemsPage from './pages/ItemsPage';
import AssignPage from './pages/AssignPage';
import SummaryPage from './pages/SummaryPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UploadPage />} />
        <Route path="/items" element={<ItemsPage />} />
        <Route path="/assign" element={<AssignPage />} />
        <Route path="/summary" element={<SummaryPage />} />
      </Routes>
    </Router>
  );
}

export default App;
