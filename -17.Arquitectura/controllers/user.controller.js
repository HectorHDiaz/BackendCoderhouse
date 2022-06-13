const UserServices = require('../models/services/user.services') 
const { STATUS } = require('../utils/constants/api.constants');
const passport = require('../../middlewares/passport');
const { apiFailedResponse, apiSuccessResponse } = require('../utils/api.utils');


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

  async passportRegister(req, res, next){
    passport.authenticate("register", {
    failureRedirect: "/register-error",
    successRedirect: "/"
  });
  }
  async passportLogin(req, res, next){
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