const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const { loginController, registerController } = require('../controllers/user.controller')

const salt = () => bcrypt.genSaltSync(10);
const createHash = (password) => bcrypt.hashSync(password, salt());
const isValidPassword = (user, password) => bcrypt.compareSync(password, user.password);

passport.use("login", new LocalStrategy(loginController));

passport.use("register", new LocalStrategy(registerController));
  
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
  