import express from 'express'
import {userController} from '../Controllers/index.js'
import { tokenService } from '../Services/index.js';

const userRouter = () => {
    var userRoute = express.Router();
    
    userRoute.route('/').put(userController.login);
    userRoute.route('/').post(userController.register);
    userRoute.route('/me').get(tokenService.verifyAuthenticateToken, userController.getMe);
    //userRoute.route('/').delete(tokenService.verifyAuthenticateToken, userController.disable);
    //userRoute.route('/:userUuid/').put(tokenService.verifyAuthenticateToken, userController.edit);
    userRoute.route('/password').put(tokenService.verifyAuthenticateToken, userController.editPassword);

    return (userRoute);
}

export default (userRouter)()