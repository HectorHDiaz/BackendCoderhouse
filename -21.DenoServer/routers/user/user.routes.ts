import {Router} from "oak";
import {
    getUsersController,
    getUserByIdController,
    createUserController
} from "@controllers/user.controllers.ts";

const router = new Router({prefix: '/users'})

router.get('/', getUsersController)
router.get('/:id', getUserByIdController)
router.post('/', createUserController)

export default router