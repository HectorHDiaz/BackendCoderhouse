const ContenedorMongoDB = require('../contenedores/contenedorMongoDB')
const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const {errorLogger} = require('../../utils/logger/index')

const collection = 'messages'

const messageSchema = new mongoose.Schema({
    author: { type: Schema.Types.ObjectId, ref: "users" },
    text: { type: String, required: true },
    createdAt: { type: String, required: true },
    updatedAt: { type: String, required: true }
})

class MessageDaoMongoDB extends ContenedorMongoDB{
    constructor(){
        super(collection, messageSchema)
    }

    async getAll(filter={}){
        try {
            const documents = await this.model.find(filter, {__v:0}).populate('author')
            return documents
        } catch (error) {
            errorLogger.error(new Error(error));
        }
    }

    async createMessage(resourceItem){
        try {
            const newItem = new this.model(resourceItem)
            await newItem.save();
            return newItem._id;
        } catch (error) {
            errorLogger.error(new Error(error));
        }
    }
}

module.exports = MessageDaoMongoDB;