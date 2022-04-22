const moment = require('moment');

const formatUserForDB = (userObj) => {
  const today = moment();

  const birthdate = moment(userObj.birthdate, "MMMM DD, YYYY").startOf('day');
  const userAge = today.diff(birthdate, 'years');
  const newUser = {
    firstname: userObj.firstname,
    lastname: userObj.lastname,
    birthdate: birthdate.format('DD-MM-YYYY'),
    age: +userAge,
    email: userObj.email,
    password: userObj.password,
    createdAt: new Date(),
    updatedAt: new Date(),
    accounts: null
  };
  return newUser;
};

module.exports = {
  formatUserForDB,
}