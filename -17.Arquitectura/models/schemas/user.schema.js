const yup = require('yup');

class UserSchema {

  static #Schema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().required(),
    messages: yup.array(yup.ref('messages'))
  });

  constructor(email, password, messages) {
    this.email = email;
    this.password = password;
    this.messages = messages;
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

module.exports = UserSchema