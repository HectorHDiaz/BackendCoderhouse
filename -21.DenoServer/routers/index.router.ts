import {Router} from "oak";
import userRoutes from "@routers/user/user.routes.ts";

const router = new Router({prefix:'/api'})

router.use(userRoutes.routes());

export default router;
 