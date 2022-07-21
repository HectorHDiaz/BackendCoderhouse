const config = require('../config/config')
const DAOSFactory = require('../models/daos/daos.factory')
const CartService = require('./cart.services')
const UserSchema = require('../models/schemas/user.schema')
const { errorLogger, infoLogger } = require('../utils/logger/index')
const CustomError = require('../utils/errors/customError');

const { newRegisterNodemailer } = require('../utils/nodemailer')

class UserServices {
  static async #validateUser(user) {
    try {
      return await UserSchema.validate(user)
    } catch (error) {
      errorLogger.error(error)
    }
  }
  constructor() {
    this.userDAO = DAOSFactory.getDAOS(config.DATA_SOURCE).userDao;
    this.cartService = new CartService()
  }

  async getAllUsersService() {
    return await this.userDAO.getAllUsers()
  }

  async getUserByIdService(id) {
    if (!id) {
      throw new CustomError(
        STATUS.BAD_REQUEST,
        'The id param is a required field'
      )
    }
    return await this.userDAO.getUserById(id)
  }

  async getUserByEmailService(email) {
    if (!email) {
      throw new CustomError(
        STATUS.BAD_REQUEST,
        'The id param is a required field'
      )
    }

    const theUser = await this.userDAO.getUserByEmail(email)
    return theUser
  }

  async createUserService(user) {
    const usrObject = {
      email: user.email,
      password: user.password,
      name: user.name,
      phone: user.phone,
      image: user.image,
    };
    const newUser = await this.userDAO.postNewUser(usrObject);
    const userWithCart = { ...newUser, cart: await this.cartService.createCartService(newUser._id) }
    const validateUser = await UserServices.#validateUser(userWithCart);
    const reUser = await this.userDAO.updateUserById(userWithCart._id, userWithCart)
    infoLogger.info("User registration successful!");
    await newRegisterNodemailer(reUser)
    return validateUser
  }
  async updateUserService(id, userPayload) {
    try {
      return await this.userDAO.updateUserById(id, userPayload)
    } catch (error) {
      return error
    }
  }
}

module.exports = UserServices;