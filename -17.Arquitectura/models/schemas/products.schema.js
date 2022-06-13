const yup = require('yup');

class ProductSchema {

  static #Schema = yup.object({
    id: yup.number().required(),
    code: yup.string().required(),
    name: yup.string().required(),
    price: yup.number().min(0).required(),
    image: yup.string().required(),
    desc: yup.string().required(),
    stock: yup.number().min(0).required(),
  });

  constructor(id,code,name,price,desc,stock) {
    this.id = id;
    this.code = code;
    this.name = name;
    this.price = price;
    this.image = image;
    this.desc = desc;
    this.stock = stock;
  }

  static async validate(productItem) {
    try {
      return await ProductSchema.#Schema.validate(productItem);
    }
    catch(error) {
      throw error;
    }
  }
}

module.exports = ProductSchema