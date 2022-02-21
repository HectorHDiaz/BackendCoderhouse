const express = require('express')
const {engine} = require('express-handlebars')
const path = require('path')
const PORT = process.env.PORT || 8080;
const app = express();
const productsRoute = require('./router/productos.route')

app.use(express.static('views'))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('hbs', engine({
    extname:'hbs',
    defaultLayout:'index.hbs',
    layoutsDir:path.resolve(__dirname,"./views/layouts"),
    partialDir:path.resolve(__dirname, "./views/partials")
}))
app.set('views', './views/')
app.set('view engine', 'hbs')

app.get('/', (req,res)=>{
    res.render('form', {saludo: "Hola GORDO"})
})

app.use('/products', productsRoute)

const connected = app.listen(PORT, ()=>{
    console.log("API Restful running...")
})

connected.on('error', (error)=>{
    console.error('Error: ', error)
})