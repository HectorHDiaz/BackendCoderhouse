const path = require('path');
const dotenv = require('dotenv');

dotenv.config({
  path: path.resolve(process.cwd(), `${process.env.NODE_ENV.trim()}.env`)
});

const {DB_URI} = process.env;

module.exports = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  HOST: process.env.HOST || 'localhost',
  PORT: process.env.PORT || 8080,
  MODE: process.env.MODE || 'FORK',
  DATA_SOURCE: process.env.DATA_SOURCE || 'MEM',
  COOKIE_SECRET: process.env.COOKIE_SECRET || 'desafio17',
  mongodb: {
    connectTo: (database) => 
    `mongodb+srv://${process.env.DB_URI}.knuiz.mongodb.net/${database}?retryWrites=true&w=majority`
  }
}