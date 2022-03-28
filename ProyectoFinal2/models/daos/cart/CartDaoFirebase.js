const ContenedorFirebase = require('../../contenedores/contenedorFirebase');

class CartDaoFirebase extends ContenedorFirebase {
  constructor() {
    super('carts');
  }
}

module.exports = CartDaoFirebase;