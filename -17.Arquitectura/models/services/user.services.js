const config = require('../../config/config');
const DAOSFactory = require('../daos/users/userDaosFactory');
const UserSchema = require('../schemas/user.schema');
const { STATUS } = require('../../utils/constants/api.constants');
const CustomError = require('../../utils/errors/customError');

class UserServices {
  static async #validateUser(user) {
    try {
      return await UserSchema.validate(user);
    }
    catch(error) {
      throw new CustomError(
        STATUS.BAD_REQUEST,
        `Validation error`,
        error,
      )
    }
  }

  constructor() {
    this.userDAO = DAOSFactory.getDAOS(config.DATA_SOURCE).userDAO;
  }

  async getUserByEmailService(email) {
    if (!id) {
      throw new CustomError(
        STATUS.BAD_REQUEST,
        'The id param is a required field'
      )
    }
    return await this.userDAO(email);
  }

  async createUserService(user) {
    const newUser = UserServices.#validateUser(user);
    return await this.userDAO.createUser(newUser);
  } 
}

module.exports = UserServices;