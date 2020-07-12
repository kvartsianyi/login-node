const {Router} = require('express');

const {userController: {createUser, getUser}} = require('../../controllers');
const {
    authMiddleware: {isAccessTokenValid},
    userMiddleware: {isUserExist, isUserRegisterValid}
} = require('../../middlewares');

const userRouter = Router();

userRouter.post('/', isUserRegisterValid, isUserExist, createUser);
userRouter.get('/user', isAccessTokenValid, getUser);

module.exports = userRouter;
