require('dotenv').config();

const {DB_URI} = process.env;

module.exports ={
  mongodb: {
    connectTo: (database) => 
    `mongodb+srv://${DB_URI}.knuiz.mongodb.net/${database}?retryWrites=true&w=majority`
  }
} 