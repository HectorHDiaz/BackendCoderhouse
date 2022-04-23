const express = require('express');
const passport = require('../../../middlewares/passport');
const authControllers = require('../../../middlewares/auth.controllers');

const router = express.Router();

router.post(
  '/register',
  passport.authenticate('register', { failureRedirect: '/register-error'}),
  authControllers.register
);

router.post(
  '/login', 
  passport.authenticate('login', { failureRedirect: '/login-error' }),
  authControllers.login
);

module.exports = router;