const firebaseConfig = require('./db/firebase/firebase.config.json');

module.exports = {
  ENV: {
    PORT: process.env.PORT || 8080,
    PERS: process.env.PERS || 'mongo',
  },
  DB_CONFIG: {
    mongodb: {
      uri: 'mongodb://localhost/ecommerce'
    },
    firebase: {
      credential: firebaseConfig,
    }
  }
}