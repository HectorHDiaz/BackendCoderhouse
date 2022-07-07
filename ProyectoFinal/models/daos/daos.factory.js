const CartMongoDAO = require('./cart/CartDaoMongoDB'),
      ProductMongoDAO = require('./products/ProductsDaoMongoDB'),
      UserMongoDAO = require('./users/userMongoDao')

 class DAOSFactory {
  static getDAOS(type){
    let productsDao;
    let cartsDao;
    let userDao;

    switch(type.toLowerCase()) {
      case 'mongo':
        cartsDao = new CartMongoDAO('ProyectoFinal');
        productsDao = new ProductMongoDAO('ProyectoFinal');
        userDao = new UserMongoDAO('ProyectoFinal');
        break;
      default:
        throw new Error('Solo está configurado el Mongo, así que elegite ese.');
    }
    return {
      cartsDao,
      productsDao,
      userDao
    }
  }
}

module.exports = DAOSFactory