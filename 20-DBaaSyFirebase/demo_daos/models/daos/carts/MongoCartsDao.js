const { Schema } = require('mongoose');
const MongoContainer = require('../../containers/MongoContainer');

const collection = 'carts';

const cartsSchema = new Schema({
  timestamp: { type: Date, min: Date.now() },
  products: [{ type: Schema.Types.ObjectId, ref: 'products'}],
});

class MongocartsDao extends MongoContainer {
  constructor() {
    super(collection, cartsSchema);
  }
}

module.exports = MongocartsDao;