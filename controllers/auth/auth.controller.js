const {
    headersEnum: {AUTHORIZATION},
    httpStatusCodeEnum: {NOT_FOUND, OK}
} = require('../../constants');
const {customErrors: {BAD_REQUEST_USER_NOT_FOUND}, ErrorHandler} = require('../../errors');
const {
    hashHelper: {comparePasswords},
    tokenHelper: {tokenGenerator}
} = require('../../helpers');
const {authService, userService} = require('../../services');

module.exports = {
    login: async (req, res, next) => {
        try {
            const {login, password} = req.body;
            const user = await userService.getUserByParams({login});

            if (!user) {
                return next(new ErrorHandler(
                    BAD_REQUEST_USER_NOT_FOUND.message,
                    NOT_FOUND,
                    BAD_REQUEST_USER_NOT_FOUND.code
                ));
            }

            const isPasswordsEqual = await comparePasswords(password, user.password);

            if (!isPasswordsEqual) {
                return next(new ErrorHandler(
                    BAD_REQUEST_USER_NOT_FOUND.message,
                    NOT_FOUND,
                    BAD_REQUEST_USER_NOT_FOUND.code
                ));
            }

            const tokenPair = tokenGenerator();

            await authService.createToken({userId: user.id, ...tokenPair});

            res.json(tokenPair);
        } catch (e) {
            next(e);
        }
    },

    logout: async (req, res, next) => {
        try {
            const accessToken = req.get(AUTHORIZATION);

            await authService.deleteTokenByParams({accessToken});

            res.sendStatus(OK);
        } catch (e) {
            next(e);
        }
    },

    refreshToken: async (req, res, next) => {
        try {
            const refreshToken = req.get(AUTHORIZATION);
            const userId = req.userId;

            if (!userId) {
                return next(new ErrorHandler(
                    BAD_REQUEST_USER_NOT_FOUND.message,
                    NOT_FOUND,
                    BAD_REQUEST_USER_NOT_FOUND.code
                ));
            }

            const tokenPair = tokenGenerator();

            await authService.deleteTokenByParams({refreshToken});
            await authService.createToken({userId, ...tokenPair});

            res.json(tokenPair);
        } catch (e) {
            next(e);
        }
    }
};
