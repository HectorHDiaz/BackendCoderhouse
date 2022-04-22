require('dotenv').config();

const {
  PORT,
  DB_PASSWORD,
  SESSION_SECRET
} = process.env;

module.exports = {
  PORT,
  DB_PASSWORD,
  SESSION_SECRET,
}