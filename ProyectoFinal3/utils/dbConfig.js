require('dotenv').config();

const {DB_URI} = process.env;
const {PORT} = process.env;
const {PERS} = process.env;
const {firebaseConfig} = process.env;

module.exports ={
  PORT: PORT || 8080,

  //mongo o firebase
  PERS: PERS || 'mongo',
  
  mongodb: {
    connectTo: (database) => 
    `mongodb+srv://${DB_URI}.knuiz.mongodb.net/${database}?retryWrites=true&w=majority`
  },

  firebase: {
    credential: firebaseConfig,
  }
} 