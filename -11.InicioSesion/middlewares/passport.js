const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

const UserDao = require('../models/daos/usersDao')
const userDao = new UserDao()

const salt = () => bcrypt.genSaltSync(10);
const createHash = (password) => bcrypt.hashSync(password, salt());
const isValidPassword = (user, password) => bcrypt.compareSync(password, user.password);

passport.use('login', new LocalStrategy(async(userEmail, password, done)=>{
    try {
        const user = await userDao.getByEmail(userEmail);
        if(!isValidPassword(user, password)){
            console.log('invalid user o password')
            return done(null, false)
        }
        console.log('User logged in succesfully')
        return done(null, user)

    } catch (error) {
        return done(error)
    }
}))
passport.use('register', new LocalStrategy(async(userEmail, password, done)=>{
    console.log('asdf')
    try {
        const newUser={
            email: userEmail,
            pass: createHash(password)
        }
        const user = await userDao.createUser(newUser)
        console.log("User registration successful!");
        return done(null, user);

    } catch (error) {
        return done(error)
    }
}))

// Serializacion:
passport.serializeUser((user, done) => {
    console.log("Inside serializer");
    done(null, user._id);
  })
  
  // Deserializacion:
  passport.deserializeUser(async (id, done) => {
    console.log("Inside deserializer");
    const user = await userDao.getById(id);
    done(null, user);
  })

  module.exports = passport