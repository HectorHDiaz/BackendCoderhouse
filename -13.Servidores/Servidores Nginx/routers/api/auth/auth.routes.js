const express = require('express');
const passport = require('../../../middlewares/passport');
const authControllers = require('../../../middlewares/auth.controllers');

const authRouter = express.Router();

authRouter.post('/register',
  (passport.authenticate("register", {
    failureRedirect: "/register-error",
    successRedirect: "/"
})));

authRouter.post('/login',
  (passport.authenticate("login", {
    failureRedirect: "/login-error",
    successRedirect: "/"
})));

module.exports = authRouter;