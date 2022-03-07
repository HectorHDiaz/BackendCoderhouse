class CartApi{
    static idCount = 0
    constructor(){
        this.products = []
        this.id = idCount++
    }
    clearDelete(idCarrito){
        this.products = []
    }
    showItems(idCarrito){
        return this.products
    }
    saveItem(idCarrito){

    }
    deleteItem(idCarrito, idProducto){

    }
}