const jwt = require('jsonwebtoken');

const {
    headersEnum,
    httpStatusCodeEnum: {BAD_REQUEST},
    tokenWordsEnum: {REFRESH_TOKEN}
} = require('../../constants');
const {customErrors: {BAD_REQUEST_TOKEN_NOT_VALID}, ErrorHandler} = require('../../errors');
const {authService: {getTokenByParams}} = require('../../services');

module.exports = async (req, res, next) => {
    try {
        const refreshToken = req.get(headersEnum.AUTHORIZATION);

        if (!refreshToken) {
            return next(new ErrorHandler(
                BAD_REQUEST_TOKEN_NOT_VALID.message,
                BAD_REQUEST,
                BAD_REQUEST_TOKEN_NOT_VALID.code
            ));
        }

        jwt.verify(refreshToken, REFRESH_TOKEN, (err) => {
            if (err) {
                return next(new ErrorHandler(
                    BAD_REQUEST_TOKEN_NOT_VALID.message,
                    BAD_REQUEST,
                    BAD_REQUEST_TOKEN_NOT_VALID.code
                ));
            }
        });

        const tokenPair = await getTokenByParams({refreshToken});

        if (!tokenPair) {
            return next(new ErrorHandler(
                BAD_REQUEST_TOKEN_NOT_VALID.message,
                BAD_REQUEST,
                BAD_REQUEST_TOKEN_NOT_VALID.code
            ));
        }

        req.userId = tokenPair.userId;

        next();
    } catch (e) {
        next(e);
    }

};
