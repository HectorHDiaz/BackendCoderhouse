const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 8080;
const app = express();
const productsRoute = require('./router/productos.route')

app.use(express.static('views'))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('views', './views/')
app.set('view engine', 'pug')

app.get('/', (req,res)=>{
    res.render('form')
})

app.use('/products', productsRoute)

const connected = app.listen(PORT, ()=>{
    console.log("API Restful running...")
})

connected.on('error', (error)=>{
    console.error('Error: ', error)
})