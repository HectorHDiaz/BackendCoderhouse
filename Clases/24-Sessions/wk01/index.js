const express = require('express')
const cookieParser = require('cookie-parser')

const app = express()


//Middlewares
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cookieParser(['top-secret']))

//Routes
app.get('/cookies',(req,res)=>{
    res.json({
        basicas: req.cookies,
        firmadas: req.signedCookies
    })
})
app.post('/cookies',(req,res)=>{
    const {nombre, valor, tiempo} = req.body;

    if(!nombre || !valor){
        return res.json({error:'Propiedades requeridas!'})
    }
    const tiempoValido = tiempo && !isNaN(parseInt(tiempo)) || parseInt(tiempo) > 0
    const cookieOptions = {
        signed:true,
        ...(tiempoValido ? {maxAge: 1000 * parseInt(tiempo)} : {})
    }
    res.cookie(nombre, valor, cookieOptions)
    res.json({proceso:'OK'})
})
app.delete('/cookies/:nombre',(req,res)=>{
    const {nombre} = req.params
    if(!req.cookie[nombre] || req.signedCookies[nombre]){
        res.json({error:'Cookie no encontrada'})
    }else{
        res.clearCookie(nombre)
        res.json({proceso:'OK'})
    }
})

PORT = 8080
app.listen(PORT, ()=>{
    console.log('Server running on PORT' + PORT)
})