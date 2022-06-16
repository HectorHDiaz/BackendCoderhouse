const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const UserControllers = require('../controllers/user.controller')

const userController = new UserControllers()


passport.use("login", new LocalStrategy(userController.passportLogin));

passport.use("register", new LocalStrategy(userController.passportRegister));
  
// Serializacion
passport.serializeUser((user, done) => {
  console.log("Inside serializer");
  done(null, user._id);
});

// Deserializacion
passport.deserializeUser(async (id, done) => {
  console.log('Inside deserializer')
  const user = await userDao.getById(id);
  done(null, user);
})
  
module.exports = passport;
  