const express = require('express')
const {engine} = require('express-handlebars')
const path = require('path')
const PORT = process.env.PORT || 8080;
const app = express();

app.use(express.static('views'))

app.engine('hbs', engine({
    extname:'hbs',
    defaultLayout:'main.hbs',
    layoutsDir:path.resolve(__dirname,"./views/layouts"),
    partialDir:path.resolve(__dirname, "./views/partials")
}))
app.set('views', './views')
app.set('view engine', 'hbs')

app.get('/', (req,res)=>{
    res.render('index', {saludo: "Hola GORDO"})
})

const connectedServer = app.listen(PORT, () => {
  console.log(`Servidor activo y escuchando en el puerto ${PORT}`);
});

connectedServer.on('error', (error) => {
  console.log(error.message);
});