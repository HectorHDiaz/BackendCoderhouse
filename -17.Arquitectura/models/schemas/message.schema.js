const yup = require('yup');

class MessageSchema {

  static #Schema = yup.object({
    author: yup.string(yup.ref('messages')),
    text: yup.string().required()
  });

  constructor(author, text) {
    this.author = author;
    this.text = text;
  }

  static async validate(messageItem) {
    try {
      return await MessageSchema.#Schema.validate(messageItem);
    }
    catch(error) {
      throw error;
    }
  }
}

module.exports = MessageSchema
