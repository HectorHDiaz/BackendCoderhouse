const mongodb = require('mongodb')
const config = require('../../../config/config')
const CartDTO = require('../../../models/dtos/user.dto')
const CustomError = require('../../../utils/errors/customError');
const {errorLogger, consoleLogger} = require('../../../utils/logger/index')
const {STATUS} = require('../../../utils/constants/api.constants')

const {
  MongoClient,
  ObjectId
} = mongodb;

class CartMongoDAO{
    static #dbInstance = {};

    constructor(database){     
      if (!CartMongoDAO.#dbInstance[database]) {
          consoleLogger.info(`Connecting to ${database} database...`);

          MongoClient.connect(config.mongodb.connectTo('ProyectoFinal'))
          .then((connection)=>{
            const db = connection.db(database);
            this._collection = db.collection('carts');
            consoleLogger.info(`Connected to ${database}: Carts!`);
            CartMongoDAO.#dbInstance[database] = this;
            //console.log(CartMongoDAO.#dbInstance[database])
          })
        }
        else {
          //console.log('Validó el Singleton!')
          return CartMongoDAO.#dbInstance;
        }
    }
    async getAllCarts(){
        try {
            return await this._collection.find().toArray();
        } catch (error) {
          errorLogger.error(new Error(error));
          throw new CustomError(
          STATUS.SERVER_ERROR,
          'Error fetching all products',
          error
        )
        }
    }
    async getCartById(id){
        try {
            const theCart = await this._collection.findOne({ _id: ObjectId(id) });
            return theCart;
        } catch (error) {
            throw new CustomError(
              STATUS.SERVER_ERROR,
              `Error fetching cart with id ${id}`,
              error
            )
        }
    }
    async createCart(cart){
        try {
            const newCart = new CartDTO(cart);
            await this._collection.insertOne(newCart)
            return newCart
        } catch (error) {
            errorLogger.error(error);
        }
    }
    async updateCart(id, cart){
        try {
            const document = await this._collection.updateOne({ _id:id }, {$set: {...cart}});
            if (!document) {
                const errorMessage = `Wrong username or password`;
                throw new Error(errorMessage);
            } else return document;
        } catch (error) {
            errorLogger.error(error);
        }
    }
} 

module.exports = CartMongoDAO