const express = require('express');
const pa11y = require('pa11y');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

app.get('/api/test', async (req, res) => {
  if (!req.query.url) {
    res.status(400).json({ err: 'URL is required' });
  } else {
    const response = await pa11y(req.query.url);
    res.status(200).json(response);
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
