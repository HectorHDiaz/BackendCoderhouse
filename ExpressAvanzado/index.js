const express = require('express')

const PORT = process.env.PORT || 8080
const app = express()

const usuarios = [
    {id:1, nombre:"Jorge"},
    {id:2, nombre:"Betto"},
    {id:3, nombre:"SARA"}
]
app.get('/api/usuarios',(req,res)=>{
    res.json(usuarios)
})
//query
app.get('/api', (req,res)=>{
    const {nombre} = req.query
    console.log(nombre)
    res.json({message: 'Hola Mundo desde Express'})
})
//params
app.get('/api/usuarios/:idUsuario', (req, res)=>{
    const { idUsuario } = req.params;
    const usuario = usuarios.find((usuario) => usuario.id === +idUsuario)
    res.json(usuario);
});

//Desafío

const frase = "Hola mundo como estan";
app.get('/api/frase', (req, res)=>{
    res.json({frase})
});
app.get('/api/frase/:num', (req, res)=>{
    const {num} = req.params
    if(isNaN(+num)) return res.json({error:"El parametro debe ser un numero"})
    if(+num < 1 || +num > frase.length)return res.json({error:"Parametro demasiado largo"})
    res.json({letra: frase[+num-1]});
});
app.get('/api/palabras/:num', (req, res)=>{
    const {num} = req.params
    const palabras = frase.split(" ")
    if(isNaN(+num)) return res.json({error:"El parametro debe ser un numero"})
    if(+num < 1 || +num > frase.length)return res.json({error:"Parametro demasiado largo"})
    res.json({palabra: palabras[+num -1]})
});

//middlewares
app.use(express.json());

// POST
app.post('/api/usuarios', (req,res)=>{
    console.log('PETICION RECIBIDA')
    console.log(req.body)
    res.json({body : req.body})
})
//PUT
app.put('/api/usuarios/:idUsuario', (req,res)=>{
    const { idUsuario } = req.params;
    const {nombre} = req.body
    const indice = usuarios.findIndex((usuario) => usuario.id === +idUsuario)
    usuarios[indice] = {
        id: usuarios[indice],
        nombre: nombre
    };
    res.json({mensaje: "Usuario actualizado"})
})
//DELETE
app.delete('/api/usuarios/:idUsuario', (req,res)=>{
    const { idUsuario } = req.params;
    const indice = usuarios.findIndex((usuario) => usuario.id === +idUsuario)
    usuarios.splice(indice,1)
    res.json({mensaje: "usuario eliminado"})
})


const connectedServer = app.listen(PORT, ()=>{
    console.log(`Server es up and running on port:  ${PORT}`)
})

connectedServer.on('error', ()=>{
    console.log(error.message())
})