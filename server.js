const express = require('express');
const request = require('request');
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

app.get('/proxy', (req, res) => {
  const target = req.query.url;
  if (!target) return res.status(400).send('Missing ?url=');

  request(target)
    .on('error', err => res.status(500).send('Error: ' + err))
    .pipe(res);
});

app.listen(PORT, () => {
  console.log(`Proxy running on port ${PORT}`);
});
