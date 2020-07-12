const {Router} = require('express');

const {userController: {createUser}} = require('../../controllers');
const {userMiddleware: {isUserExist, isUserRegisterValid}} = require('../../middlewares');

const userRouter = Router();

userRouter.post('/', isUserRegisterValid, isUserExist, createUser);

module.exports = userRouter;
