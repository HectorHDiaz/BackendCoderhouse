const express = require('express');
const { ENV: { PORT } } = require('./config');
const apiRoutes = require('./routers/index');

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', apiRoutes);

app.listen(PORT, () => {
  console.log(`Server is up and running on port: `, PORT);
});
