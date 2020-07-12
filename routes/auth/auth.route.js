const {Router} = require('express');

const {
    authMiddleware: {isAccessTokenValid, isRefreshTokenValid},
    userMiddleware: {isUserLoginValid}
} = require('../../middlewares');
const {authController: {login, logout, refreshToken}} = require('../../controllers');

const authRouter = Router();

authRouter.post('/login', isUserLoginValid, login);
authRouter.post('/logout', isAccessTokenValid, logout);
authRouter.post('/refresh', isRefreshTokenValid, refreshToken);

module.exports = authRouter;
