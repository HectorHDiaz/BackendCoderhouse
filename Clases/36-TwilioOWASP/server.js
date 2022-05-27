const express = require('express');
const MessagingResponse = require('twilio').twiml.MessagingResponse;

const PORT = process.env.PORT || 8080;
const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  res.send('Hello world! (modificado)')
});

const generarBienvenida = (nombre) => `Hola 👋 ${nombre}, Bienvenido a Jorel's Market
¿En qué te podemos ayudar?
1. Comprar un producto
2. Ubicación de oficinas
3. Hablar con un asesor `;

const mensajeProductos = `Genial! 🤩
¿Qué producto deseas comprar?
1. Cepillo de dientes
2. Crema dental`;

const mensajeOficinas = `Ya veo 👀
Estas son nuestras locaciones:
* Colombia: Av. siempre viva No 123
* Argentina: Av. siempre alegre 123
* Perú: Av. siempre llena 123`;

const actions = {
  hola: (twiml, nombre) => twiml.message(generarBienvenida(nombre)),
  1: (twiml) => twiml.message(mensajeProductos),
  2: (twiml) => twiml.message(mensajeOficinas),
  3: (twiml, nombre) => twiml.message(`Excelente ${nombre}!, ya te comunicamos con un asesor! 😎`),
  // default: twiml.message(`Excelente ${nombre}!, ya te comunicamos con un asesor! 😎`)
}

app.post('/whsp', (req, res) => {
  const twiml = new MessagingResponse();
  const profileName = req.body.ProfileName;
  const mensaje = req.body.Body; // hola, 1, 2, 3
  (actions[mensaje] ?? actions['hola'])(twiml, profileName);
  res.set('Content-Type', 'text/xml');
  res.send(twiml.toString());
});

app.listen(PORT, () => {
  console.log('Ready on port => ', PORT);
})