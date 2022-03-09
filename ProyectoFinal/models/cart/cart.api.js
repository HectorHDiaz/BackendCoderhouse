class CartsApi{
    constructor(){
        this.carts = []
    }
    static idCount = 0

    createCart(){
        const newCart = {
            id: ++CartsApi.idCount,
            timestamp : Date.now(),
            products:[],
        }
        this.carts.push(newCart)
        return {NewCart: `Tu nuevo Carro es el ${newCart.id}`}
    }
    clearDelete(idCart){
        const theCart = this.carts.find(cart => cart.id === +idCart)
        theCart.products = []
        
        const index = this.carts.findIndex(cart => cart.id ===+idCart)
        if (index < 0) return { error: `No se encontró el Carrito con el id: ${idCart}!`};
        this.carts.splice(index, 1)

        return {success:`${theCart} fué eliminado.`}
    }
    showItems(idCart){
        const theCart = this.carts.find(cart => cart.id === +idCart)

        return {Productos: theCart.products}
    }
    saveItem(idCart, product){
        const theCart = this.carts.find(cart => cart.id === +idCart)
        theCart.products.push(product)

        return {message: `${product.name} a sido añadido al Cart`}
    }
    deleteItem(idCart, idProduct){
        const theCart = this.carts.find(cart => cart.id === +idCart)
        const actualProducts = theCart.products
        const index = actualProducts.findIndex(product => product.id === +idProduct);
        if (index < 0) return { error: `No se encontró un Producto con el id: ${idProduct}!`};
        const theProductName = actualProducts[index].name
        actualProducts.splice(index, 1)

        return {Success: `El producto: ${theProductName} fué eliminado de la lista`} 
    }
} 

module.exports = CartsApi