const express = require('express');
const authRoutes = require('./auth/auth.routes');
const randomRoute = require('./random/random')
const router = express.Router();

//Routes
router.use('/auth', authRoutes);
//router.use('/randoms', randomRoute)

module.exports = router;