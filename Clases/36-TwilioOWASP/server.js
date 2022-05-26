const express = require('express');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const PORT = process.env.PORT || 8080;
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.get('/', (req,res)=>{
    res.send('Hello World')
})

const mensajeHola='TComo estais oshtia tío?';
const mensaje1='1 - Una aventura grande y llena de emocion';
const mensaje2='2 - A buscar con indole la bola dragon';
const mensaje3='3 - A todos respeto infunde';

const actions ={
    Hola:(twiml)=>twiml.message(mensajeHola),
    1:(twiml) => twiml.message(mensaje1),
    2:(twiml) => twiml.message(mensaje2),
    3:(twiml) => twiml.message(mensaje3),
    default:(twiml) => twiml.message('No te entiendooo'),
}

app.post('/wpp', (req,res)=>{
    const twiml = new MessagingResponse();
    const response = req.body.Body;
    actions[response](twiml);
    res.set('Content-Type', 'text/xml');
    res.send(twiml.toString());
})

app.listen(PORT, ()=>{
    console.log('Servidor corriendo...')
})