const mongodb = require('mongodb');
const {errorLogger} = require('../../../utils/logger/index')
const config = require('../../../config/config')
const dbConfig = require('../../../db/config')
const ProductDTO = require('../../../models/dtos/product.dto')
const {STATUS} = require('../../../utils/constants/api.constants')
const CustomError = require('../../../utils/errors/customError');

const {
  MongoClient,
  ObjectId,
} = mongodb;

class ProductsDaoMongoDB{

  static #dbinstances = {}

  constructor(database){
    if(!ProductsDaoMongoDB.#dbinstances[database]){
        console.log(`[${config.NODE_ENV.trim()}] Connecting to ${database} database...`);
        MongoClient.connect(dbConfig.mongodb)
        .then((connection)=>{
            ProductsDaoMongoDB.#dbinstances[database] = this;
            const db = connection.db(database);
            this._collection = db.collection('products');
            console.log(`[${config.NODE_ENV.trim()}] Connected to ${database}`) 
        })
    } else{
        return ProductsDaoMongoDB.#dbinstances[database]
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
            'Error fetching all products',
            error
          )
    }
  }

  async getProductById(id) {
    try {
      return await this._collection.findOne({ _id: ObjectId(id) });
    }
    catch(error) {
      throw new CustomError(
        STATUS.SERVER_ERROR,
        `Error fetching product with id ${id}`,
        error
      )
    }
  }
  async createItem(resourceItem) {
      try {
        const newProduct = new ProductDTO(resourceItem);
        await this._collection.insertOne(newProduct);
        return newProduct;
      }
      catch (err) {
        errorLogger.error(new Error(error));
        throw new CustomError(
          STATUS.SERVER_ERROR,
          'Error creating item',
          error
        )
      }
    }
}

module.exports = ProductsDaoMongoDB;