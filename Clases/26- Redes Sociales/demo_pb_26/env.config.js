require('dotenv').config();

const {
  PORT,
  DB_PASSWORD,
  SESSION_SECRET,
  TWITTER_API_KEY,
  TWITTER_API_SECRET,
} = process.env;

module.exports = {
  PORT,
  DB_PASSWORD,
  SESSION_SECRET,
  TWITTER_API_KEY,
  TWITTER_API_SECRET,
}