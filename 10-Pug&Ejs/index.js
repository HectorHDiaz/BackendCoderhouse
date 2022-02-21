
const path = require('path');
const rutasApi = require('./routers/index');
const express = require('express');


const app = express();
const PORT = process.env.PORT || 8080;

// Middlewares
app.use(express.static(path.resolve(__dirname, './public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//
app.set('views', './views')
app.set('view engine', 'ejs')

// Rutas
app.use('/api', rutasApi);

app.get('/datos', (req, res)=>{
  res.render('pug/main', req.query)
})
app.get('/pug', (req,res)=>{
  res.render('main', {showList:true})
})
app.get('/ejs', (req,res)=>{
  arreglo = [1,2,3,4,5,6,7]
  res.render('ejs/index', {showSaludo : false, arreglo})
})

//Formulario

const personas = []

app.get('/', (req,res)=>{
    res.render('index', {personas})
})
 
app.post('/personas', (req,res)=>{
  personas.push(req.body)
  res.redirect('/')
})
//

const connectedServer = app.listen(PORT, () => {
  console.log(`Servidor activo y escuchando en el puerto ${PORT}`);
});

connectedServer.on('error', (error) => {
  console.log(error.message);
});