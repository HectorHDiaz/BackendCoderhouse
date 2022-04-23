const express = require('express');
const authControllers = require('../../../controllers/auth.controllers');
const passport = require('../../../middlewares/passport');

const router = express.Router();

router.post('/register', 
passport.authenticate('register', { failureRedirect: 'www.google.com' }),
function(req, res) {
  res.redirect('/');
});

router.post(
  '/login', 
  passport.authenticate('login', { failureRedirect: '/login-error' }),
  authControllers.login
);

module.exports = router;