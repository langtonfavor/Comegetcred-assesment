const express = require('express');
const axios = require('axios');
const app = express();
const port = 5000;

app.use(express.json());

// Replace this URL with any API that provides an array of objects with fields like title, body, etc.
const apiUrl = 'https://jsonplaceholder.typicode.com/posts';

app.get('/api/items', async (req, res) => {
  try {
    const response = await axios.get(apiUrl);
    const items = response.data.slice(0, 6); 
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data from the API' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
