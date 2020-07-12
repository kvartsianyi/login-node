const jwt = require('jsonwebtoken');

const {
    tokenWordsEnum: {
        ACCESS_TOKEN,
        ACCESS_TOKEN_TIME,
        REFRESH_TOKEN,
        REFRESH_TOKEN_TIME
    }
} = require('../../constants');

module.exports = () => {
    const accessToken = jwt.sign({}, ACCESS_TOKEN, {expiresIn: ACCESS_TOKEN_TIME});
    const refreshToken = jwt.sign({}, REFRESH_TOKEN, {expiresIn: REFRESH_TOKEN_TIME});

    return {
        accessToken,
        refreshToken
    }
};
