const {products} = require('../data/data')

const createId = (req,res,next)=>{
    let i = 0;
    products.forEach((item, i) => item.id = i+1)
    next()
}

module.exports=createId