const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const {errorLogger} = require('../utils/logger/index');
const UserControllers = require('../controllers/user.controllers');
const bcrypt = require('bcrypt');
const salt = () => bcrypt.genSaltSync(10);
const createHash = (password) => bcrypt.hashSync(password, salt());
const isValidPassword = (user, password) => bcrypt.compareSync(password, user.password);

const userController = new UserControllers()

passport.use("login", new LocalStrategy(async (username, password, done) => {
    try {
      const theUser = await userController.getUserByEmailController(username);
      if (!isValidPassword(theUser, password)) {
        errorLogger.error('Invalid user or password');
        return done(null, false);
      }
      return done(null, theUser);
    }
    catch (error) {
      errorLogger.error(error);
      return done(null, false);
    }
  }));

  passport.use("register",  new LocalStrategy(
    { passReqToCallback: true },
    async (req, username, password, done) => {
      try {
        const usrObject= {
          email: username,
          password: createHash(password),
          name: req.body.name,
          phone: req.body.phone,
          bday: req.body.bday,
          address: req.body.address,
          image: req.file.path,
        };
        const newUser = await userController.createUserController(usrObject)
        return done(null, newUser);
      }
      catch(error) {
        errorLogger.error(error);
        return done(null, false);
      }
    }
  ));
  
  // Serializacion
  passport.serializeUser((user, done) => {
    done(null, user.email);
  });
  
  // Deserializacion
  passport.deserializeUser(async (email, done) => {
    const user = await userController.getUserByEmailController(email);
    done(null, user); 
  });
  
  module.exports = passport;
  