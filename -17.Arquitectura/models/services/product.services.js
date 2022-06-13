const config = require('../../config/config');
const DAOSFactory = require('../daos/products/productsDaosFactory');
const ProductSchema = require('../schemas/products.schema');
const { STATUS } = require('../../utils/constants/api.constants');
const CustomError = require('../../utils/errors/customError');

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
    this.productDAO = DAOSFactory.getDAOS(config.DATA_SOURCE).productDAO;
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
    return await this.productDAO.getProductById(id);
  }

  async createProductService(product) {
    const newProduct = ProductServices.#validateProduct(product);
    return await this.productDAO.createItem(newProduct);
  } 
}

module.exports = ProductServices;