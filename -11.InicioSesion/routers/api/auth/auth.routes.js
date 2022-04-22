const express = require('express');
const passport = require('../../../middlewares/passport');

const authRoutes = express.Router();

authRoutes.post(
  '/login', 
  passport.authenticate('login', { failureRedirect: "/login-error"}),
  (req, res) => {res.redirect('/')}
);
authRoutes.post('/register', passport.authenticate("register", { 
  failureRedirect: "/register-error",
  successRedirect: "/"
}));

module.exports = authRoutes;