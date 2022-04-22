const moment = require('moment');

const randomNumber = () => Math.floor(Math.random()* 10);

const generateAccountNumber = (length = 10) => {
  let number = '';
  for (let i = 1; i <= length; i++) {
    number += randomNumber();
  }
  return number;
}

const generateInitialAccount = () => {
  const newAccount = {
    number: generateAccountNumber(),
    status: 'ACTIVE',
    type: 'savings',
    balance: 10000,
    owner: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  }
  return newAccount;
};

module.exports = {
  generateInitialAccount,
}