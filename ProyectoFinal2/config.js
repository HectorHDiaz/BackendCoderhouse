const firebaseConfig = require('./db/firebase/firebase.config.json');

module.exports = {
  ENV: {
    PORT: process.env.PORT || 8080,
    //mongo o firebase
    PERS: process.env.PERS || 'firebase',
  },
  DB_CONFIG: {
    mongodb: {
      uri: `mongodb+srv://HectorDiaz:5CuerdasPRO@ecommerce.knuiz.mongodb.net/ProyectoFinal?retryWrites=true&w=majority`
    },
    firebase: {
      credential: firebaseConfig,
    }
  }
}