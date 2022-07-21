const express = require('express')

const UserController = require('../../controllers/user.controllers')

const userController = new UserController()
const router = express.Router()

router.use(express.json())
router.use(express.urlencoded({extended:true}))

router.get('/session', (req,res)=>{
  const user = req.user
  res.json(user);
})
router.get('/', userController.getAllUsers)
router.get('/:userId' , userController.getUserById)
router.post('/', async (req,res)=>{const infoUser = req.body; const newUser = await userController.createUserController(infoUser); res.json(newUser)})
router.put('/:userId', userController.updateUser)

module.exports = router