require('dotenv').config(); // load .env variables
const express = require('express');
const fetch = require('node-fetch'); // npm i node-fetch@2
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files (frontend)
app.use(express.static(path.join(__dirname, 'public')));

// API route to get movie data from OMDb
app.get('/api/movies', async (req, res) => {
  const title = req.query.title;
  if (!title) {
    return res.status(400).json({ error: 'Missing title parameter' });
  }

  try {
    const apiKey = process.env.OMDB_API_KEY; // Your OMDb key from .env
    const response = await fetch(`http://www.omdbapi.com/?t=${encodeURIComponent(title)}&apikey=${apiKey}`);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching movie data' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

