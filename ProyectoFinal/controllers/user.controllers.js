const  UserServices = require('../services/user.services')
const { errorLogger } = require('../utils/logger')


class UserControllers {
    constructor() {
      this.service = new UserServices()
    }
    async getUserByEmailController(email){
        try {
          const theUser = await this.service.getUserByEmailService(email)
          return theUser
        } 
        catch (error) {
          console.log(error)
        }

    }
    async createUserController(infoUser){
        try {
            const newUser = await this.service.createUserService(infoUser)
            return (newUser)
        } 
        catch (error) {
        errorLogger.error(error)
        }
    }
}

module.exports = UserControllers;