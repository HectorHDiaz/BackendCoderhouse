const express = require('express')
const productsRouter = require('./products/products.router')
const cartsRouter = require('./carts/cart.router')
const usersRouter = require('./users/user.router')
const authRouter = require('./auth/authRoute')
const fileRouter = require('./file/fileRoute')
const messagesRouter = require('./message/message.routes')
const CartController = require('../controllers/cart.controller')
const ProductsController = require('../controllers/products.controller')
const { infoLogger, errorLogger, consoleLogger } = require('../utils/logger/index')


const router = express.Router()

router.use(express.json())
router.use(express.urlencoded({ extended: true }))

router.use((req, res, next) => {
  const router = req.url;
  const method = req.method;
  consoleLogger.warn(`Route: ${router} Method: ${method}`);
  next()
})

router.use('/products', productsRouter)
router.use('/carts', cartsRouter)
router.use('/auth', authRouter)
router.use('/file', fileRouter)
router.use('/users', usersRouter)
router.use('/messages', messagesRouter)

const cartController = new CartController()
const productsController = new ProductsController()

router.get('/', async (req, res) => {
  const sessionName = req.user;
  const allProducts = await productsController.getAllProducts()
  try {
    if (sessionName) {
      const sessionCart = await cartController.getCartById(sessionName.cart)
      return res.render('index', { sessionName, sessionCart, allProducts })
    }
    res.render('index', { sessionName, allProducts })
  }
  catch (error) {
    errorLogger.error(error);
  }
})

router.get('/desloguear', (req, res) => {
  const deslogueoName = req.user
  req.logout();
  infoLogger.info('User logued out!');
  res.render('index', { deslogueoName })
});

router.get('/login', (req, res) => {
  res.render('login.html')
})

router.get('/register-error', (req, res) => {
  res.render('index', { titleError: "register-error", message: "USER ERROR SIGNUP" });
});

router.get('/login-error', (req, res) => {
  res.render('index', { titleError: "login-error", message: "USER ERROR LOGIN" });
});

router.get('/pug', (req, res) => {
  //Vista de Configuracion de Servidor
  const config = 'Estadio Bernabeu';
  res.render('serverconfig.pug', { config })
})
router.get('/ejs', (req, res) => {
  //Vista para Errores con Id y Detalles
  const error = 'Error 09.12.18';
  res.render('errorpage.ejs', { error })
})
router.get('*', (req, res) => {
  const router = req.url;
  const method = req.method;
  errorLogger.warn(`Route: ${router}. Method: ${method}`);
  res.status(404).send('no bueno. Mal ahí: 404')
});



module.exports = router