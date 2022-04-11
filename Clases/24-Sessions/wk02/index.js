const express = require('express')
const session = require('express-session')

const app = express()
const nombreSesion = (req) => req.session?.nombre ?? '';

//Middlewares
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(session({
    secret: 'top-secret',
    resave: false,
    saveUninitialized:false
}))

//Routes
app.get('/', (req,res)=>{
    if(req.session.contador){
        res.send(`${nombreSesion(req)} visitaste la pagina ${++req.session.contador} veces`)
    }else{
        req.session.nombre = req.query.nombre;
        req.session.contador = 1;
        res.send(`Te damos la bienvenida ${nombreSesion(req)}`)
    }
})
app.get('/olvidar', (req,res)=>{
    const nombre = nombreSession(req)
    req.session.destroy(err=>{
        if(err){
            res.json({error:'olvidar, body:err'})
        }else{
            res.clearCookie()
            res.send(`Hasta luego ${nombre}`)
        }
    })
});
PORT = 8080
app.listen(PORT, ()=>{
    console.log('Server running on PORT' + PORT)
})