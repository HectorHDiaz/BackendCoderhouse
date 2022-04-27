const ContenedorMongoDB = require('../contenedores/contenedorMongoDB')
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const collection = 'users'

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true },
    messages: [{ type: Schema.Types.ObjectId, ref: "messages" }]
})

class UserDaoMongoDB extends ContenedorMongoDB{
    constructor(){
        if (!UserDaoMongoDB.instance) {
          super(collection, userSchema);
          UserDaoMongoDB.instance = this;
          return this;
        }
        else {
          return UserDaoMongoDB.instance;
        }
    }

    async createUser(userItem) {
        try {
          const user = new this.model(userItem);
          await user.save();
          return user;
        }
        catch(error) {
          throw new Error(error);
        }
      };

      async getByEmail(email) {
        try {
            const document = await this.model.findOne({ email }, { __v: 0 });
            if (!document) {
                const errorMessage = `Wrong username or password`;
                throw new Error(errorMessage);
              } else return document;
              
        } catch (error) {
            throw new Error(error);
        }
      }
}

module.exports = UserDaoMongoDB;