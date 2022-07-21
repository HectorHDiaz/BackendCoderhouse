const mongodb = require('mongodb');
const uuid = require('uuid').v4;
const config = require('../../../config/config')
const MessageDTO = require('../../../models/dtos/message.dto')
const CustomError = require('../../../utils/errors/customError');
const { STATUS } = require('../../../utils/constants/api.constants')
const { errorLogger, consoleLogger } = require('../../../utils/logger/index')

const {
  MongoClient
} = mongodb;

class MessagesMongoDAO {

  static #dbinstances = {}

  constructor(database) {
    if (!MessagesMongoDAO.#dbinstances[database]) {
      consoleLogger.info(`Connecting to ${database} database...`);
      MongoClient.connect(config.mongodb.connectTo('ProyectoFinal'))
        .then((connection) => {
          const db = connection.db(database);
          this._collection = db.collection('messages');
          consoleLogger.info(`Connected to ${database}: Messages!`);
          MessagesMongoDAO.#dbinstances[database] = this;
        })
    } else {
      return MessagesMongoDAO.#dbinstances[database]
    }
  }

  async getAllMessages() {
    try {
      return await this._collection.find().toArray();
    } catch (error) {
      errorLogger.error(new Error(error));
      throw new CustomError(
        STATUS.SERVER_ERROR,
        'Error fetching all messages',
        error
      )
    }
  }

  async getMessageById(id) {
    try {
      return await this._collection.findOne({ _id: id });
    }
    catch (error) {
      throw new CustomError(
        STATUS.SERVER_ERROR,
        `Error fetching messages with id ${id}`,
        error
      )
    }
  }

  async createMessage(message) {
    try {
      const newMessage = new MessageDTO(message, uuid());
      await this._collection.insertOne(newMessage);
      return newMessage;
    }
    catch (err) {
      errorLogger.error(new Error(error));
      throw new CustomError(
        STATUS.SERVER_ERROR,
        'Error creating message',
        error
      )
    }
  }

  async updateById(id, messagePayload) {
    try {
      const document = await this._collection.updateOne({ _id: id }, { $set: { ...messagePayload } });
      if (!document) {
        const errorMessage = `Wrong data message`;
        throw new Error(errorMessage);
      } else return document;
    } catch (error) {
      errorLogger.error(error);
    }
  }
  async deleteById(id) {
    try {
      const document = await this._collection.deleteOne({ _id: id });
      if (!document) {
        const errorMessage = `Wrong data message`;
        throw new Error(errorMessage);
      } else return document;
    } catch (error) {
      errorLogger.error(error);
    }
  }
}
module.exports = MessagesMongoDAO;