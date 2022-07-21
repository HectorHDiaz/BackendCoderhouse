const mongodb = require('mongodb')
const uuid = require('uuid').v4;
const config = require('../../../config/config')
const UserDTO = require('../../../models/dtos/user.dto')
const { errorLogger, consoleLogger } = require('../../../utils/logger/index')
const { STATUS } = require('../../../utils/constants/api.constants')

const {
  MongoClient
} = mongodb;

class UserMongoDAO {
  static #dbInstance = {};

  constructor(database) {
    if (!UserMongoDAO.#dbInstance[database]) {
      consoleLogger.info(`Connecting to ${database} database...`);

      MongoClient.connect(config.mongodb.connectTo('ProyectoFinal'))
        .then((connection) => {
          const db = connection.db(database);
          this._collection = db.collection('users');
          consoleLogger.info(`Connected to ${database}: Users!`);
          UserMongoDAO.#dbInstance[database] = this;
          //console.log(UserMongoDAO.#dbInstance[database])
        })
    }
    else {
      //console.log('Validó el Singleton!')
      return UserMongoDAO.#dbInstance;
    }
  }
  async getAllUsers() {
    return await this._collection.find().toArray()
  }
  async getUserByEmail(email) {
    try {
      const document = await this._collection.findOne({ email }, { __v: 0 });
      if (!document) {
        const errorMessage = `Wrong username or password`;
        throw new Error(errorMessage);
      } else return document;

    } catch (error) {
      errorLogger.error(error);
    }
  }
  async getUserById(id) {
    try {
      const document = await this._collection.findOne({ _id: id }, { __v: 0 });
      if (!document) {
        const errorMessage = `Cannot find user by id`;
        throw new Error(errorMessage);
      } else return document;

    } catch (error) {
      errorLogger.error(error);
    }
  }

  async postNewUser(userItem) {
    try {
      const newUser = new UserDTO(userItem, uuid());
      await this._collection.insertOne(newUser);
      return newUser;
    }
    catch (error) {
      errorLogger.error(error);
    }
  };

  async updateUserById(id, userInfo) {
    try {
      const document = await this._collection.updateOne({ _id: id }, { $set: { ...userInfo } });
      if (!document) {
        const errorMessage = `Wrong username or password`;
        throw new Error(errorMessage);
      } else return document;
    } catch (error) {
      errorLogger.error(error);
    }
  }
  async connect() {
    console.log('Una conexión')
  }
  async deleteUserById(id) {
    try {
      const document = await this._collection.deleteOne({ _id: id });
      if (!document) {
        const errorMessage = `Wrong data user`;
        throw new Error(errorMessage);
      } else return document;
    } catch (error) {
      errorLogger.error(error);
    }
  }
}

module.exports = UserMongoDAO;