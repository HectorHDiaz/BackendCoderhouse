const mongoose = require('mongoose');
const UsuariosModel = require('./models/Usuarios');

const DATABASE = 'ecommerce';

const DB_URI = `mongodb+srv://jorelmaro:coder123house456@coder.3c0d1.mongodb.net/${DATABASE}?retryWrites=true&w=majority`;

(async () => {
  try {
    await mongoose.connect(DB_URI);
    console.log('Database connected!');

    await UsuariosModel.create({ nombre: "Federico", apellido: 'Perez', dni: "320118321" });
    console.log('User created!');

    const usuarios = await UsuariosModel.find().lean();
    console.table(usuarios);
  }
  catch (error) {
    console.log(error);
  }
  finally {
    mongoose.disconnect();
  }
})();

