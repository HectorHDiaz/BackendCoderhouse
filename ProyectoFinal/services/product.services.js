const config = require('../config/config');
const DAOSFactory = require('../models/daos/daos.factory');
const ProductSchema = require('../models/schemas/products.schema');
const { STATUS } = require('../utils/constants/api.constants');
const CustomError = require('../utils/errors/customError');
const { v4: uuid } = require('uuid');

class ProductServices {
  static async #validateProduct(product) {
    try {
      return await ProductSchema.validate(product);
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
    this.productDAO = DAOSFactory.getDAOS(config.DATA_SOURCE).productsDao;
  }

  async getAllProductsService() {
    return await this.productDAO.getAll()
  }

  async getProductByIdService(id) {
    if (!id) {
      throw new CustomError(
        STATUS.BAD_REQUEST,
        'The id param is a required field'
      )
    }
    return await this.productDAO.getProductById(id)
  }

  async createProductService(product) {
    const idCount = await this.productDAO.getAll()
    const newProduct = { 
        id: uuid(),
        code: idCount.length +1,
        timestamp: Date.now(),
        ...product
    };
    const validatedProduct = ProductServices.#validateProduct(newProduct);
    return await this.productDAO.createItem(newProduct);
  } 

  async updateProductService(id, product) {
    const idValidation = await this.productDAO.getProductById(id)
    if(!idValidation){
      throw new CustomError(
        STATUS.BAD_REQUEST,
        'The id param is a required field'
      )
    }
    const updatedProduct = await this.productDAO.updateById(id, product)
    return updatedProduct;
  }

  async deleteProduct(id){
    const idValidation = await this.productDAO.getProductById(id)
    if(!idValidation){
      throw new CustomError(
        STATUS.BAD_REQUEST,
        'The id param is a required field'
      )
    }
    const deletedProduct = await this.productDAO.deleteById(id)
    return deletedProduct
  }
}

module.exports = ProductServices;