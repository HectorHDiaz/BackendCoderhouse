const express = require('express');
const rutasPersonas = require('./personas/personas.routes');
const router = express.Router();

// Middlewares
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// Rutas
router.use('/personas', rutasPersonas);

module.exports = router;