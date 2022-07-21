const UserServices = require('../services/user.services')
const { errorLogger } = require('../utils/logger')


class UserControllers {
  constructor() {
    this.service = new UserServices()
  }
  getAllUsers = async (req, res) => {
    const allUsers = await this.service.getAllUsersService()
    return res.json(allUsers)
  };
  getUserById = async (req, res) => {
    const { userId } = req.params
    const searchedUser = await this.service.getUserByIdService(userId)
    return res.json(searchedUser);
  };
  async getUserByEmailController(email) {
    try {
      const theUser = await this.service.getUserByEmailService(email)
      return theUser
    }
    catch (error) {
      console.log(error)
    }

  }
  createUserController=async(infoUser)=> {
    try {
      const newUser = await this.service.createUserService(infoUser)
      return newUser
    }
    catch (error) {
      errorLogger.error(error)
    }
  }
  updateUser=async(req, res)=>{
    try {
      const theId = req.params.userId;
      const userPayload = req.params.body;
      const newUser = await this.service.updateUserService(theId, userPayload)
      return res.json(newUser)
    }
    catch (error) {
      errorLogger.error(error)
    }
  }
}

module.exports = UserControllers;