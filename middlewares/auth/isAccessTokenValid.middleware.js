const jwt = require('jsonwebtoken');

const {
    headersEnum,
    httpStatusCodeEnum: {BAD_REQUEST},
    tokenWordsEnum: {ACCESS_TOKEN}
} = require('../../constants');
const {customErrors: {BAD_REQUEST_TOKEN_NOT_VALID}, ErrorHandler} = require('../../errors');
const {authService: {getTokenByParams}} = require('../../services');

module.exports = async (req, res, next) => {
    try {
        const accessToken = req.get(headersEnum.AUTHORIZATION);

        if (!accessToken) {
            return next(new ErrorHandler(
                BAD_REQUEST_TOKEN_NOT_VALID.message,
                BAD_REQUEST,
                BAD_REQUEST_TOKEN_NOT_VALID.code
            ));
        }

        jwt.verify(accessToken, ACCESS_TOKEN, (err) => {
            if (err) {
                return next(new ErrorHandler(
                    BAD_REQUEST_TOKEN_NOT_VALID.message,
                    BAD_REQUEST,
                    BAD_REQUEST_TOKEN_NOT_VALID.code
                ));
            }
        });

        const tokenPair = await getTokenByParams({accessToken});

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
