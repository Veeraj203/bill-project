const express = require('express');
const cors = require('cors');
const uploadRoute = require('./routes/upload');
require('dotenv').config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use('/api', uploadRoute);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
