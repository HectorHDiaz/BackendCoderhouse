const { v4: uuid } = require('uuid');
const config = require('../config/config');
const DAOSFactory = require('../models/daos/daos.factory');
const CartSchema = require('../models/schemas/cart.schema');
const { STATUS } = require('../utils/constants/api.constants');
const CustomError = require('../utils/errors/customError');
const { newPurchaseNodemailer } = require('../utils/nodemailer');

class CartServices {
    static async #validateCart(cart) {
      try {
        return await CartSchema.validate(cart);
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
        this.cartDAO = DAOSFactory.getDAOS(config.DATA_SOURCE).cartsDao;
        this.userDAO = DAOSFactory.getDAOS(config.DATA_SOURCE).userDao;
        this.prodDAO = DAOSFactory.getDAOS(config.DATA_SOURCE).productsDao;
    }

    async getAllCartsService(){
        const allCarts = await this.cartDAO.getAllCarts()
        return allCarts;
    }
    async getCartByIdService(id){
        const theCart = await this.cartDAO.getCartById(id)
        return theCart
    }
    async createCartService(userId){
        const newCart = {
            owner : userId,
            timestamp : Date.now(),
            products:[],
        }
        const validateCart = await CartServices.#validateCart(newCart)
        const newMongoCart = await this.cartDAO.createCart(validateCart)
        return newMongoCart._id
    }
    async updateCartService(id, cart){
        const updatedCart = this.cartDAO.updateCart(id, cart)
        return updatedCart;
    }
    
    async getCartProductsService(id){
        const theCart = await this.cartDAO.getCartById(id);
        return theCart.products
    }
    async addProductToCartService(cartId, productId){
        const theCart = await this.cartDAO.getCartById(cartId);
        const theProduct = await this.prodDAO.getProductById(productId)

        theCart.products.push(theProduct);
        const updatedCart = await this.cartDAO.updateCart(cartId, theCart);
        return updatedCart;
    }
    async removeProductToCartService(cartId, productId){
        const theCart = await this.cartDAO.getCartById(cartId);
        const index = theCart.products.findIndex(product => product._id === productId);

        theCart.products.splice(index, 1)
        const updatedCart = await this.cartDAO.updateCart(cartId, theCart);
        return updatedCart;
    }
    async purchaseCartService(cartId){
        const theCart = await this.cartDAO.getCartById(cartId);
        const theOwner = await this.userDAO.getById(theCart.owner);
        //Really Purchase Function goes here
        const newCart = {...theCart._doc, products:[]}
        await newPurchaseNodemailer(theOwner, theCart)
        const updatedCart = await this.cartDAO.updateCart(cartId, newCart);
    }

}
module.exports = CartServices;