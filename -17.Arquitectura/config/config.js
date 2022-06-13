const path = require('path');
const dotenv = require('dotenv');

dotenv.config({
  path: path.resolve(process.cwd(), `${process.env.NODE_ENV.trim()}.env`)
});

module.exports = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  HOST: process.env.HOST || 'localhost',
  PORT: process.env.PORT || 8080,
  DATA_SOURCE: process.env.DATA_SOURCE || 'MEM'
}