import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './UploadPage.css';

export default function UploadPage() {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false); // 👈 added state
  const navigate = useNavigate();

  const handleUpload = async () => {
    if (!image) return alert('Select an image first');
    setLoading(true);
    const fd = new FormData();
    fd.append('image', image);

    try {
      const resp = await fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: fd
      });
      const data = await resp.json();
      if (!resp.ok) throw new Error(data.error);
      navigate('/items', { state: { items: data.items } });
    } catch (e) {
      alert('Failed: ' + (e.message || 'Error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-container">
      <form className="upload-form" onSubmit={e => { e.preventDefault(); handleUpload(); }}>
        <h1>Upload Your Bill</h1>

        <div
          className={`drop-zone ${dragActive ? 'drag-active' : ''}`}
          onDragOver={e => { e.preventDefault(); setDragActive(true); }}
          onDragLeave={() => setDragActive(false)}
          onDrop={e => {
            e.preventDefault();
            setDragActive(false);
            setImage(e.dataTransfer.files[0]);
          }}
        >
          <p>Drag & Drop Bill Image Here</p>
        </div>

        <input
          type="file"
          accept="image/*"
          onChange={e => setImage(e.target.files[0])}
        />

        {image && <p className="file-info">Selected: <strong>{image.name}</strong></p>}

        <button type="submit" className="upload-btn" disabled={loading}>
          {loading ? 'Scanning...' : 'Upload & Scan'}
        </button>
      </form>
    </div>
  );
}
