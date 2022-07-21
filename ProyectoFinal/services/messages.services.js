const config = require('../config/config');
const { v4: uuid } = require('uuid');
const DAOSFactory = require('../models/daos/daos.factory');
const MessageSchema = require('../models/schemas/message.schema');
const { errorLogger, infoLogger } = require('../utils/logger/index')
const CustomError = require('../utils/errors/customError');


class MessageServices {
  static async #validateMessage(message) {
    try {
      return await MessageSchema.validate(message);
    }
    catch (error) {
      return error
    }
  }
  constructor() {
    this.messageDAO = DAOSFactory.getDAOS(config.DATA_SOURCE).messageDao;
  }

  async getAllMessagesService() {
    return await this.messageDAO.getAllMessages()
  }
  
  async getMessageByIdService(id) {
    if (!id) {
      throw new CustomError(
        STATUS.BAD_REQUEST,
        'The id param is a required field'
      )
    }
    return await this.messageDAO.getMessageById(id)
  }

  async createMessageService(messagePayload) {
    const newMessage = await MessageServices.#validateMessage(messagePayload);
    return await this.messageDAO.createMessage(newMessage, uuid());
  }
}

module.exports = MessageServices