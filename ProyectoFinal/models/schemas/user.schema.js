const yup = require('yup');

class UserSchema {

  static #Schema = yup.object({
    email: yup.string().required(),
    password: yup.string().required(),
    name: yup.string().required(),
    phone: yup.string().required(),
    bday: yup.string().required(),
    age: yup.number().required(),
    address: yup.string(),
    image: yup.string(),
    cart: yup.string(yup.ref('carts')),
  });

  constructor(email, password, name,phone, bday, age, address, image, cart) {
    this.email = email,
    this.password = password,
    this.naem = name,
    this.phone = phone,
    this.bday = bday,
    this.age = age,
    this.address = address,
    this.image = image,
    this.cart = cart
  }

  static async validate(userItem) {
    try {
      return await UserSchema.#Schema.validate(userItem);
    }
    catch(error) {
      throw error;
    }
  }
}

module.exports = UserSchema;