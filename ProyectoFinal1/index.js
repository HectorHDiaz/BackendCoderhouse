const express = require('express')
const apiRoutes = require('./routes/indexRoutes')

const app = express()
const PORT = process.env.PORT || 8080

// Middlewares
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/api', apiRoutes)
//Routers
app.get('/',(req,res)=>{
    res.redirect('/api/products')
})

const connected = app.listen(PORT,()=>{
    console.log(`Servidor activo y corriendo en puerto ${PORT}`)
})
connected.on('error', (error)=>{
    console.error('Error: ', error)
})