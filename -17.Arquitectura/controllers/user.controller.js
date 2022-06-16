const bcrypt = require('bcrypt');

const UserServices = require('../models/services/user.services') 
const { STATUS } = require('../utils/constants/api.constants');
const passport = require('../middlewares/passport');
const { apiFailedResponse, apiSuccessResponse } = require('../utils/api.utils');

const salt = () => bcrypt.genSaltSync(10);
const createHash = (password) => bcrypt.hashSync(password, salt());
const isValidPassword = (user, password) => bcrypt.compareSync(password, user.password);

class UserControllers {
  constructor(){
    this.service = new UserServices()
  }

  async getUserByIdController(req, res, next) {
    try {
      const { email } = req.params;
      const user = await this.service.getUserByEmailService(email);
      const response = apiSuccessResponse(user, STATUS.OK);
      return res.status(STATUS.OK).json(response);
    }
    catch(error) {
      next(error);
    }
  }
  async createUserController(req, res, next) {
    try {
      const infoUser = req.body;
      const newUser = await this.service.createUserService(infoUser);
      const response = apiSuccessResponse(newUser, STATUS.CREATED);
      return res.status(STATUS.CREATED).json(response);
    }
    catch(error) {
      next(error);
    }
  }

  async passportLogin(username, password, done){
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
  }
  async passportRegister(req, username, password, done){
    console.log('Ingresó a Register!')
    try {
      const usrObject= {
        email: username,
        password: createHash(password)
      }
      const user = await userDao.createUser(usrObject);
      console.log("User registration successful!");
      return done(null, user);
    }
    catch(error) {
      return done(null, false);
    }
  }

  async registerRoute(req, res, next){
    passport.authenticate("register", {
    failureRedirect: "/register-error",
    successRedirect: "/"
  });
  }
  async loginRoute(req, res, next){
    passport.authenticate("login", {
    failureRedirect: "/login-error",
    successRedirect: "/"
  });
  }

    async registerError(req, res){
    res.render('index', { titleError: "register-error" , message: "USER ERROR SIGNUP" });
  }
    async loginError(req, res){
    res.render('index', { titleError: "login-error" , message: "USER ERROR LOGIN" });
  }
  
}

  module.exports = UserControllers