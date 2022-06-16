const express = require('express');
const UserControllers = require('../../controllers/user.controller')

const authRouter = express.Router();

class UserRoutes {
    constructor(){
        this.controller = new UserControllers()
    }

    initialize(){
        authRouter.post('/register', this.controller.loginRoute);

        authRouter.post('/login', this.controller.loginRoute);

        authRouter.get('/register-error', this.controller.registerError);

        authRouter.get('/login-error', this.controller.loginError);

        return authRouter;
    }
}

module.exports = new UserRoutes();