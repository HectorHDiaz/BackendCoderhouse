const mongodb = require('mongodb');
const {errorLogger} = require('../../../utils/logger/index')
const config = require('../../../config/config')
const MessageDTO = require('../../../models/dtos/message.dto')
const {STATUS} = require('../../../utils/constants/api.constants')
const CustomError = require('../../../utils/errors/customError');

const {
    MongoClient,
    ObjectId,
  } = mongodb;

class MessageDaoMongoDB {

    static #dbinstances = {}

    constructor(database){
        if(!MessageDaoMongoDB.#dbinstances[database]){
            console.log(`[${config.NODE_ENV.trim()}] Connecting to ${database} database...`);
            MongoClient.connect(config.mongodb.connectTo('ProyectoDesafios'))
            .then((connection)=>{
                MessageDaoMongoDB.#dbinstances[database] = this;
                const db = connection.db(database);
                this._collection = db.collection('messages');
                console.log(`[${config.NODE_ENV.trim()}] Connected to ${database}`) 
            })
        } else{
            return MessageDaoMongoDB.#dbinstances[database]
        }
    }

    async getAll(filter={}){
        try {
            //const documents = await this.model.find(filter, {__v:0}).populate('author')
            return await this._collection.find({}).toArray();
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
          return await this._collection.findOne({ _id: ObjectId(id) });
        }
        catch(error) {
          throw new CustomError(
            STATUS.SERVER_ERROR,
            `Error fetching message with if ${id}`,
            error
          )
        }
      }

    async createMessage(messageItem){
        try {
            const newMessage = new MessageDTO(messageItem);
            await this._collection.insertOne(newMessage);
            return newMessage;

        } catch (error) {
            errorLogger.error(new Error(error));
            throw new CustomError(
                STATUS.SERVER_ERROR,
                'Error creating message',
                error
            )
        }
    }
}

module.exports = MessageDaoMongoDB;