const path = require('path')
const fs = require('fs')
const uuid = require('uuid').v4;
const CartsDTO = require('../../dtos/cart.dto')
const dataPath = path.resolve(__dirname, "./cartsData.txt")


class CartsMemDAO {
  constructor() {
    this.carts = this.readFileDAO()
    this.saveCartsFile = () => {
      fs.writeFileSync(dataPath, JSON.stringify(this.carts, null, 3))
    }
  }
  readFileDAO() {
    this.carts = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
  }
  getAllCarts() {
    this.readFileDAO()
    return this.carts;
  };

  getCartById(id) {
    this.readFileDAO()
    const theCart = this.carts.find((cart) => cart._id === id);
    return theCart || { error: `La cart ${id} no fué encontrada!` };
  };

  createCart(cartPayload) {
    this.readFileDAO()
    const newCart = new CartsDTO(cartPayload, uuid())
    this.carts.push(newCart)
    this.saveCartsFile()
    return newCart;
  };

  updateCartById(id, cartPayload) {
    this.readFileDAO()
    const index = this.carts.findIndex(cart => cart._id === id);
    if (index < 0) return { error: `No se encontró una Cart con el id: ${id}!` };
    const updatedCart = {
      ...this.carts[index],
      ...cartPayload
    }
    const replacedCart = new CartsDTO(updatedCart)
    this.carts[index] = replacedCart
    this.saveCartsFile()
    return replacedCart;
  };
  deleteCartById(id) {
    this.readFileDAO()
    const index = this.carts.findIndex(cart => cart._id === id);
    if (index < 1) throw new Error(`No se encontró una Cart con el id: ${id}!`);
    const newList = this.carts.splice(index, 1);
    this.saveCartsFile()
    return newList
  };
}

module.exports = CartsMemDAO;