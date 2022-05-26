const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const moment = require('moment');
const path = require('path');
const {postNewCart} = require('../../controllers/cart.controller')

const UserDao = require('../../models/daos/users/userDao');
const userDao = new UserDao();

const salt = () => bcrypt.genSaltSync(10);
const createHash = (password) => bcrypt.hashSync(password, salt());
const isValidPassword = (user, password) => bcrypt.compareSync(password, user.password);

passport.use("login", new LocalStrategy(async (username, password, done) => {
    console.log('Ingresó a Login!')
    try {
      const user = await userDao.getByEmail(username);
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

  passport.use("register",  new LocalStrategy(
    { passReqToCallback: true },
    async (req, username, password, done) => {
      try {
        const birthDayDate = req.body.bday
        const ageInYears = moment().diff(new Date(birthDayDate), 'years');

        const usrObject= {
          email: username,
          password: createHash(password),
          name: req.body.name,
          phone: req.body.phone,
          bday: req.body.bday,
          age: ageInYears,
          address: req.body.address,
          image: req.file.path,
          cart: await postNewCart()
        };
        const user = await userDao.createUser(usrObject);
        console.log("User registration successful!");
        return done(null, user);
      }
      catch(error) {
        return done(null, false);
      }
    }
  ));
  
  // Serializacion
  passport.serializeUser((user, done) => {
    console.log("Inside serializer");
    done(null, user._id);
  });
  
  // Deserializacion
  passport.deserializeUser(async (id, done) => {
    console.log('Inside deserializer');
    const user = await userDao.getById(id);
    done(null, user); 
  });
  
  module.exports = passport;
  