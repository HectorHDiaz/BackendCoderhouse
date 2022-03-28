const FirebaseContainer = require('../../containers/FirebaseContainer');

class FirebaseProductsDao extends FirebaseContainer {
  constructor() {
    super('carts');
  }
}

module.exports = FirebaseProductsDao;