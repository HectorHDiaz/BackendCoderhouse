require('dotenv').config();

const {DB_URI} = process.env;
const {PORT} = process.env;
const {PERS} = process.env;
const {firebaseConfig} = process.env;
const {ADMIN_EMAIL} = process.env;
const {ADMIN_PHONE} = process.env;
const {TWILIO_ID} = process.env;
const {TWILIO_TOKEN} = process.env;

module.exports ={
  PORT: PORT || 8080,

  //mongo o firebase
  PERS: PERS || 'mongo',
  
  ADMIN_EMAIL: ADMIN_EMAIL,
  ADMIN_PHONE: ADMIN_PHONE,

  TWILIO_ID: TWILIO_ID,
  TWILIO_TOKEN: TWILIO_TOKEN,

  mongodb: {
    connectTo: (database) => 
    `mongodb+srv://${DB_URI}.knuiz.mongodb.net/${database}?retryWrites=true&w=majority`
  },

  firebase: {
    credential: firebaseConfig,
  }
} 