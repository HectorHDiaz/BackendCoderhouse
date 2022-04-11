const mongoose = require('mongoose');
const { DB_CONFIG } = require('../../config');

class MongoContainer {
  constructor(collection, schema) {
    this.connect().then(() => console.log('Database connected!'));
    this.model = mongoose.model(collection, schema);
  }

  async connect() {
    await mongoose.connect(DB_CONFIG.mongodb.uri);
  }

  async getAll() {
    const documents = await this.model.find({}, {__v: 0}).lean();
    return documents;
  }

  async getById(id) {
    const document = await this.model.findOne({ _id: id }, {__v: 0});
    if (!document) {
      throw new Error('[NOT_FOUND] The requested resource does not exist in our records!');
    }
    return document;
  }

  async save(payload) {
    const newDocument = new this.model(payload)
    return await newDocument.save();
  }

  async updateById(id, payload) {
    const updatedDocument = await this.model.updateOne({ _id: id }, 
      { 
        $set: { ...payload } 
      }
    );
    if (!updatedDocument.matchedCount) {
      throw new Error('[NOT_FOUND] The requested resource does not exist in our records!');
    }
    return updatedDocument;
  }

  async deleteById(id) {
    return await this.model.deleteOne({ _id: id });
  }
}

module.exports = MongoContainer;