const express = require('express');
const multer = require('multer');
const fs = require('fs');
const cors = require('cors');
require('dotenv').config();
const analyzeBill = require('./llamaVision');

const app = express();
app.use(cors());

const upload = multer({ dest: 'uploads/' });

app.post('/upload', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
    const base64 = fs.readFileSync(req.file.path).toString('base64');
    const resultText = await analyzeBill(base64);
    fs.unlinkSync(req.file.path);

    const items = resultText
      .split('\n')
      .filter(l => l.trim())
      .map(line => {
        const [name, price] = line.split(' - ');
        return { name: name?.trim() || '', price: price?.trim() || '' };
      });

    res.json({ items });
  } catch (e) {
    console.error('Upload error:', e.response?.data || e.message);
    res.status(500).json({ error: 'Failed to process bill' });
  }
});

app.listen(process.env.PORT || 5000, () => console.log('Backend running on http://localhost:5000'));
