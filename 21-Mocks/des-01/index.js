const express = require('express');
const { generateArray } = require('./utils/index');

const PORT = 8080;

const app = express();

app.get('/', (req, res) => {
  res.json(generateArray(10));
});

app.listen(PORT, () => console.log('Listening on port ', PORT));