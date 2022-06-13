const config = require('../../config/config');
const DAOSFactory = require('../daos/messages/messagesDaosFactory');
const MessageSchema = require('../schemas/message.schema');
const { STATUS } = require('../../utils/constants/api.constants');
const CustomError = require('../../utils/errors/customError');

class MessageServices {
  static async #validateMessage(message) {
    try {
      return await MessageSchema.validate(message);
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
    this.messageDAO = DAOSFactory.getDAOS(config.DATA_SOURCE).messageDAO;
  }

  async getAllMessageService() {
    return await this.messageDAO.getAll();
  }

  async getMessageByIdService(id) {
    if (!id) {
      throw new CustomError(
        STATUS.BAD_REQUEST,
        'The id param is a required field'
      )
    }
    return await this.messageDAO.getMessageById(id);
  }

  async createMessageService(message) {
    const newMessage = MessageServices.#validateMessage(message);
    return await this.messageDAO.createMessage(newMessage);
  } 
}

module.exports = MessageServices;