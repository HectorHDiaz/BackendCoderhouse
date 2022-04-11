const express = require('express');
const apiRoutes = require('./routers/index');

const PORT = process.env.PORT || 8080;

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', apiRoutes);

app.listen(PORT, () => {
  console.log(`Listening on port `, PORT);
});