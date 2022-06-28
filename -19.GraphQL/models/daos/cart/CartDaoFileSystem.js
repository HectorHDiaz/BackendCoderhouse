const Contenedor = require('../../contenedores/contenedorFileSystem.js')
const path = require('path')

const dataPath= path.resolve(__dirname,"./carts.txt")
const contenedor = new Contenedor(dataPath)

class CartsApi{
    constructor(){
        this.carts = (contenedor.data).then((res)=> {this.carts = res})
    }
    static idCount = 0

    async createCart(){
        const newCart = {
            id: ++CartsApi.idCount,
            timestamp : Date.now(),
            products:[],
        }
        contenedor.writeFile(newCart)

        return {NewCart: `Tu nuevo Carro es el ${newCart.id}`}
    }
    async clearDelete(idCart){
        const carts = await this.carts
        
        const index = carts.findIndex(cart => cart.id ===+idCart)
        if (index < 0) return { error: `No se encontró el Carrito con el id: ${idCart}!`};
        const theCart = carts.find(cart => cart.id === +idCart)
        theCart.products = []
        
        carts.splice(index, 1)

        contenedor.writeAllFile(carts)

        return {success:`${theCart.id} fué eliminado.`}
    }
    showItems(idCart){
        const theCart = this.carts.find(cart => cart.id === +idCart)

        return {Productos: theCart.products}
    }
    async saveItem(idCart, product){
        const carts = await this.carts
        const index = carts.findIndex(cart => cart.id === +idCart)
        carts[index].products.push(product)
        contenedor.writeAllFile(carts)
        return {message: `${product.name} a sido añadido al Cart`}
    }
    async deleteItem(idCart, idProduct){
        const carts = await this.carts
        const theCart = carts.find(cart => cart.id === +idCart)
        const actualProducts = theCart.products
        const index = actualProducts.findIndex(product => product.id === +idProduct);
        if (index < 0) return { error: `No se encontró un Producto con el id: ${idProduct}!`};
        const theProductName = actualProducts[index].name
        actualProducts.splice(index, 1)
        contenedor.writeAllFile(carts)
        return {Success: `El producto: ${theProductName} fué eliminado de la lista`} 
    }
} 

module.exports = CartsApi