const express = require('express')
const { users } = require('../../data/data');
const router = express.Router()
// /api/users => /
router.get('/', (req,res) => {
    const { role, search } = req.query;
    let userResponse = [...users];
    if (Object.keys(req.query).length > 0) {
      if (role) {
        userResponse = userResponse.filter(user => user.role === role.toLowerCase());
      }
      if (search) {
        userResponse = userResponse.filter(user => 
          user.name.toLowerCase().includes(search.toLowerCase()) ||
          user.lastname.toLowerCase().includes(search.toLowerCase())
        );
      }
      return res.json({ success: true, result: userResponse });
    }
      return res.json({ success: true, result: userResponse });
  });
  
  router.get('/:userId', (req, res) => {
    const { userId } = req.params;
    if (isNaN(+userId) || +userId < 0 || +userId % 1 !== 0) {
      return res.status(400).json({ success: false, error: 'userId must be a positive integer valid number' });
    }
    const user = users.find(user => user.id === +userId);
    if (!user) {
      return res.status(404).json({ success: false, error: `User with id ${userId} is not in our records!` }); 
    }
    return res.json({ success: true, result: user });
  });
  
  router.post('/', (req,res) => {
    const { name, lastname, age, email, role } = req.body || {};
    if (!name || !lastname || !age || !email || !role) {
      let requiredFields = [];
      if (!name) requiredFields.push('name');
      if (!lastname) requiredFields.push('lastname');
      if (!age) requiredFields.push('age');
      if (!email) requiredFields.push('email');
      if (!role) requiredFields.push('role');
      return res.status(400).json({ success: false, error: `Following fields are required: ${requiredFields.join(', ')}`})
    }
    const newUser = {
      id: users[users.length - 1].id + 1,
      name,
      lastname,
      age,
      email,
      role
    };
    users.push(newUser);
    return res.json({ success: true, result: newUser});
  });
  
  router.put('/:userId', (req, res) => {
    const { params: { userId }, body: { name, lastname, age, email, role } } = req;
    if (isNaN(+userId) || +userId < 0 || +userId % 1 !== 0) {
      return res.status(400).json({ success: false, error: 'userId must be a positive integer valid number' });
    }
    const userIndex = users.findIndex( user => user.id === +userId);
    if (userIndex < 0) {
      return res.status(404).json({ success: false, error: `User with id ${userId} is not in our records!` });
    } 
    if (!name || !lastname || !age || !email || !role) {
      let requiredFields = [];
      if (!name) requiredFields.push('name');
      if (!lastname) requiredFields.push('lastname');
      if (!age) requiredFields.push('age');
      if (!email) requiredFields.push('email');
      if (!role) requiredFields.push('role');
      return res.status(400).json({ success: false, error: `Following fields are required: ${requiredFields.join(', ')}`})
    }
    const modifiedUser = {
      ...users[userIndex],
      name,
      lastname,
      age,
      email,
      role
    };
    users[userIndex] = modifiedUser;
    return res.json({ success: true, result: modifiedUser });
  });
  
  router.delete('/:userId', (req, res) => {
    const { userId } = req.params;
    if (isNaN(+userId) || +userId < 0 || +userId % 1 !== 0) {
      return res.status(400).json({ success: false, error: 'userId must be a positive integer valid number' });
    }
    const userIndex = users.findIndex( user => user.id === +userId);
    if (userIndex < 0) {
      return res.status(404).json({ success: false, error: `User with id ${userId} is not in our records!` });
    } 
    const eliminatedUser = users[userIndex];
    users.splice(userIndex, 1);
    return res.json({ success: true, result: eliminatedUser });
  });

module.exports = router