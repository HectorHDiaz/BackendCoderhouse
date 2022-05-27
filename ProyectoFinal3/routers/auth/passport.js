const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const moment = require('moment');
const {newRegister} = require('../../utils/nodemailer')
const {postNewCart} = require('../../controllers/cart.controller')
const {infoLogger, errorLogger} = require('../../utils/logger/index')
const UserDao = require('../../models/daos/users/userDao');
const userDao = new UserDao();

const salt = () => bcrypt.genSaltSync(10);
const createHash = (password) => bcrypt.hashSync(password, salt());
const isValidPassword = (user, password) => bcrypt.compareSync(password, user.password);

passport.use("login", new LocalStrategy(async (username, password, done) => {
    try {
      const user = await userDao.getByEmail(username);
      if (!isValidPassword(user, password)) {
        errorLogger.error('Invalid user or password');
        return done(null, false);
      }
      return done(null, user);
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
        };
        const user = await userDao.createUser(usrObject);
        const userWithCart = {...user._doc, cart: await postNewCart(user._id)}
        const reUser = await userDao.updateById(user._id, userWithCart)
        infoLogger.info("User registration successful!");
        
        await newRegister(usrObject)
        return done(null, user);
      }
      catch(error) {
        errorLogger.error(error);
        return done(null, false);
      }
    }
  ));
  
  // Serializacion
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });
  
  // Deserializacion
  passport.deserializeUser(async (id, done) => {
    const user = await userDao.getById(id);
    done(null, user); 
  });
  
  module.exports = passport;
  