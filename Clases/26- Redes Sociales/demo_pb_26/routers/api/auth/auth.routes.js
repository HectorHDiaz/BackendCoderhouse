const express = require('express');
const authControllers = require('../../../controllers/auth.controllers');
const passport = require('../../../middlewares/passport');

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

// => /api/auth/twitter
router.get(
  '/twitter',
  passport.authenticate('twitter'),
);

// => /api/auth/twitter/callback
router.get(
  '/twitter/callback',
  passport.authenticate('twitter', {
    successRedirect: '/profile',
    failureRedirect: '/twitter-error',
  })
);

module.exports = router;