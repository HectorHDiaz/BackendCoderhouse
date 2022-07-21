const mongodb = require('mongodb');
const uuid = require('uuid').v4;
const config = require('../../../config/config')
const ProductDTO = require('../../../models/dtos/product.dto')
const CustomError = require('../../../utils/errors/customError');
const { STATUS } = require('../../../utils/constants/api.constants')
const { errorLogger, consoleLogger } = require('../../../utils/logger/index')

const {
  MongoClient
} = mongodb;

class ProductsMongoDAO {

  static #dbinstances = {}

  constructor(database) {
    if (!ProductsMongoDAO.#dbinstances[database]) {
      consoleLogger.info(`Connecting to ${database} database...`);
      MongoClient.connect(config.mongodb.connectTo('ProyectoDesafios'))
        .then((connection) => {
          const db = connection.db(database);
          this._collection = db.collection('products');
          consoleLogger.info(`Connected to ${database}: Products!`);
          ProductsMongoDAO.#dbinstances[database] = this;
        })
    } else {
      return ProductsMongoDAO.#dbinstances[database]
    }
  }
  async getAllProducts() {
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

  async getProductById(id) {
    try {
      return await this._collection.findOne({ _id: id });
    }
    catch (error) {
      throw new CustomError(
        STATUS.SERVER_ERROR,
        `Error fetching product with id ${id}`,
        error
      )
    }
  }
  async createProduct(resourceItem) {
    try {
      const newProduct = new ProductDTO(resourceItem, uuid());
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

  async updateProductById(id, productsInfo) {
    try {
      const document = await this._collection.updateOne({ _id: id }, { $set: { ...productsInfo } });
      if (!document) {
        const errorMessage = `Wrong data product`;
        throw new Error(errorMessage);
      } else return document;
    } catch (error) {
      errorLogger.error(error);
    }
  }

  async deleteProductById(id) {
    try {
      const document = await this._collection.deleteOne({ _id:id });
      if (!document) {
        const errorMessage = `Wrong data product`;
        throw new Error(errorMessage);
      } else return document;
    } catch (error) {
      errorLogger.error(error);
    }
  }
}

module.exports = ProductsMongoDAO;