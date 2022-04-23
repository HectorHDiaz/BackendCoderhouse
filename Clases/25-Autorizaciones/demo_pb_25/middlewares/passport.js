const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const UsersDao = require('../models/daos/Users.dao');
const { formatUserForDB } = require('../utils/users.utils');

const User = new UsersDao();

const salt = () => bcrypt.genSaltSync(10);
const createHash = (password) => bcrypt.hashSync(password, salt());
const isValidPassword = (user, password) => bcrypt.compareSync(password, user.password);

// Passport Local Strategy
passport.use('login', new LocalStrategy(async (username, password, done) => {
  try {
    const user = await User.getByEmail(username);
    if (!isValidPassword(user, password)) {
      console.log('Invalid user or password');
      return done(null, false);
    }
    return done(null, user);
  }
  catch (error) {
    return done(error);
  }
}));
passport.use('register', new LocalStrategy({
    passReqToCallback: true,
  },
  async (req, username, password, done) => {
    console.log('Ingresó al Passport!')
  try {
    const userObject = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      birthdate: req.body.birthdate,
      email: username,
      password: createHash(password),
    };
    const newUser = formatUserForDB(userObject);
    const user = await User.createUser(newUser);
    console.log('User registration sucessful!');
    return done(null, user);
  }
  catch (error) {
    console.log('Error signing up >>>', error);
    return done(error);
  }
}));

// Serializacion
passport.serializeUser((user, done) => {
  console.log("Inside serializer");
  done(null, user._id);
});

// Deserializacion
passport.deserializeUser(async (id, done) => {
  console.log('Inside deserializer')
  const user = await User.getById(id);
  done(null, user);
})

module.exports = passport;
