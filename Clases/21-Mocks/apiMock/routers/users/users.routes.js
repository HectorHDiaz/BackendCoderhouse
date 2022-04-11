const express = require('express');
const { 
  getUsersController, 
  getUserByIdController, 
  saveUserController, 
  updateUseController, 
  deleteUserController,
  populateUsersController,
} = require('../../controllers/users/users.controllers');
const errorMiddleware = require('../../middlewares/errorMiddleware');

const router = express.Router();

// Routes
router.get('/', getUsersController);
router.get('/:id', getUserByIdController);
router.post('/', saveUserController);
router.put('/:id', updateUseController);
router.delete('/:id', deleteUserController);
router.post('/populate', populateUsersController);

// error middleware
router.use(errorMiddleware);


module.exports = router;