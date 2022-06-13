const mongodb = require('mongodb');
const {errorLogger} = require('../../../utils/logger/index')
const config = require('../../../config/config')
const dbConfig = require('../../../db/config')
const UserDTO = require('../../../models/dtos/product.dto')
const {STATUS} = require('../../../utils/constants/api.constants')
const CustomError = require('../../../utils/errors/customError');

const {
  MongoClient,
  ObjectId,
} = mongodb;

class UserDaoMongoDB{
  static #dbinstances = {}

  constructor(database){
    if(!UserDaoMongoDB.#dbinstances[database]){
        console.log(`[${config.NODE_ENV.trim()}] Connecting to ${database} database...`);
        MongoClient.connect(dbConfig.mongodb)
        .then((connection)=>{
            ProductsDaoMongoDB.#dbinstances[database] = this;
            const db = connection.db(database);
            this._collection = db.collection('users');
            console.log(`[${config.NODE_ENV.trim()}] Connected to ${database}`) 
        })
    } else{
        return UserDaoMongoDB.#dbinstances[database]
    }
}

    async createUser(userItem) {
        try {
          const newUser = new UserDTO(userItem);
          await this._collection.insertOne(newUser);
          return newUser;

        }
        catch(error) {
          errorLogger.error(new Error(error));
            throw new CustomError(
                STATUS.SERVER_ERROR,
                'Error creating user',
                error
            )
        }
      };

      async getByEmail(email) {
        try {
            const document = await this._collection.findOne({ email }, { __v: 0 });
            //await this.model.findOne({ email }, { __v: 0 });
            if (!document) {
                throw new CustomError(
                  STATUS.SERVER_ERROR,
                  `Wrong username!`,
                  error
                )
              } else return document;       
        } catch (error) {
          throw new CustomError(
            STATUS.SERVER_ERROR,
            `Error fetching user with email ${email}`,
            error
          )
        }
      }
}

module.exports = UserDaoMongoDB;