const express = require('express');
const usersRoutes = require('./users/users.routes');

const router = express.Router();

// Routes
router.use('/users', usersRoutes);

module.exports = router;