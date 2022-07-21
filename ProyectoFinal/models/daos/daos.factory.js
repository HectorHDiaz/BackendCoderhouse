const CartMemDAO = require('./cart/CartMemDao'),
      ProductMemDAO = require('./products/ProductsMemDao'),
      UserMemDAO = require('./users/userMemDao'),
      MessagesMemDAO = require('./messages/MessagesMemDao');
const CartMongoDAO = require('./cart/CartMongoDao'),
      ProductMongoDAO = require('./products/ProductsMongoDao'),
      UserMongoDAO = require('./users/userMongoDao'),
      MessagesMongoDAO = require('./messages/MessagesMongoDao');


 class DAOSFactory {
  static getDAOS(type){
    let productsDao;
    let cartsDao;
    let userDao;
    let messageDao;

    switch(type.toLowerCase()) {
      case 'mem':
        cartsDao = new CartMemDAO();
        productsDao = new ProductMemDAO();
        userDao = new UserMemDAO();
        messageDao = new MessagesMemDAO()
        break;
      case 'mongo':
        cartsDao = new CartMongoDAO('ProyectoFinal');
        productsDao = new ProductMongoDAO('ProyectoFinal');
        userDao = new UserMongoDAO('ProyectoFinal');
        messageDao = new MessagesMongoDAO('ProyectoFinal');
        break;
      default:
        throw new Error('Solo está configurado el Mongo(PRD) y Mem(DEV).');
    }
    return {
      cartsDao,
      productsDao,
      userDao,
      messageDao
    }
  }
}

module.exports = DAOSFactory