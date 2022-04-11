const FirebaseContainer = require('../../containers/FirebaseContainer');

class FirebaseProductsDao extends FirebaseContainer {
  constructor() {
    super('products');
  }
}

module.exports = FirebaseProductsDao;