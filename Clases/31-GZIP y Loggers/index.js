const express = require('express')
const compression = require('compression')
const {repeat} = require('./utils/index')

const PORT = 8080;
const app = express()

app.get('/saludo', (req,res)=>{
    res.send(repeat('Hola', 1000))
})
app.get('/saludozip', compression(), (req,res)=>{
    res.send(repeat('Hola', 1000))
})

app.listen(PORT, ()=>{
console.log('Server running');
})