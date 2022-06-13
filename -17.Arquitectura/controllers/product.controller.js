const ProductServices = require('../models/services/product.services') 
const { STATUS } = require('../utils/constants/api.constants');
const { apiFailedResponse, apiSuccessResponse } = require('../utils/api.utils');


class ProductControllers {
  constructor(){
    this.service = new ProductServices()
  }

  async getAllProductsController(req,res,next){
    return await this.service.getAllProductsService()
  }

  async getProductByIdController(req, res, next) {
    try {
      const { id } = req.params;
      const user = await this.service.getProductByIdService(id);
      const response = apiSuccessResponse(user, STATUS.OK);
      return res.status(STATUS.OK).json(response);
    }
    catch(error) {
      next(error);
    }
  }
  async createProductController(req, res, next) {
    try {
      const infoProduct = req.body;
      const newProduct = await this.service.createProductService(infoProduct);
      const response = apiSuccessResponse(newProduct, STATUS.CREATED);
      return res.status(STATUS.CREATED).json(response);
    }
    catch(error) {
      next(error);
    }
  }
}

module.exports = ProductControllers;