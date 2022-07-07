const express = require('express')
const productsRouter = require('./products/products.router')
const cartRouter = require('./cart/cart.router')
const authRouter = require('./auth/authRoute')
const fileRouter = require('./file/fileRoute')
const CartController = require('../controllers/cart.controller')
const ProductsController = require('../controllers/products.controller')
const {infoLogger, errorLogger} = require('../utils/logger/index')

const router = express.Router()

router.use(express.json())
router.use(express.urlencoded({extended:true}))

router.use('/products', productsRouter)
router.use('/cart', cartRouter)
router.use('/auth', authRouter)
router.use('/file', fileRouter)

const cartController = new CartController()
const productsController = new ProductsController()

router.get('/', async (req,res)=>{
    try {
        const sessionName = req.user;
        const allProducts = await productsController.getAllProducts()
        if(sessionName){
            const sessionCart = await cartController.getCartById(sessionName.cart)
            return res.render('index', {sessionName, sessionCart, allProducts})
        }
            res.render('index', {sessionName, allProducts})
        
    } catch (error) {
        errorLogger.error(error);
    }
})
router.get('/desloguear', (req,res)=>{
    const deslogueoName = req.user
    req.logout();
    infoLogger.info('User logued out!');
    res.render('index',{deslogueoName})

});

router.get('/login',(req,res)=>{
    res.render('login.html')
})

router.get('/register-error', (req, res) => {
    res.render('index', { titleError: "register-error" , message: "USER ERROR SIGNUP" });
});
router.get('/login-error', (req, res) => {
    res.render('index', { titleError: "login-error" , message: "USER ERROR LOGIN" });
});

router.get('*', (req, res)=>{
    const router = req.url;
    const method = req.method;
    errorLogger.warn(`Route: ${router}. Method: ${method}`);
    res.status(404).send('no bueno. Mal ahí: 404')
  });
module.exports = router