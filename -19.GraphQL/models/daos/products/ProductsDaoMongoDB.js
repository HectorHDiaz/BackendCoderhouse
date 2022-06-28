const ContenedorMongoDB = require('../../contenedores/contenedorMongoDB')
const {errorLogger} = require('../../../utils/logger/index')
const mongoose = require('mongoose')

const collection = 'products'

const productSchema = new mongoose.Schema({
    id:{type:String, unique:true, required:true},
    code: {type:String, unique:true, required:true},
    name: {type:String, required:true},
    desc: {type:String},
    image: {type:String},
    price: {type:Number, required:true, min:0},
    stock: {type:Number, required:true, min:0},
    timestamp: {type:Date, required:true, min:Date.now()}
})

class ProductsDaoMongoDB extends ContenedorMongoDB{
    constructor(){
        super(collection, productSchema)
    }
    async createItem(resourceItem) {
        try {
          const newItem = new this.model(resourceItem);
          await newItem.save();
          return newItem;
        }
        catch (err) {
          errorLogger.error(new Error(error));
        }
      }
}

module.exports = ProductsDaoMongoDB;