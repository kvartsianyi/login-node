module.exports = {
    // 400
    BAD_REQUEST_USER_REGISTERED: {
        message: 'User is already registered',
        code: 4001
    },

    BAD_REQUEST_USER_NOT_FOUND: {
        message: 'User not found',
        code: 4002
    },

    BAD_REQUEST_TOKEN_NOT_VALID: {
        message: 'Token not valid',
        code: 4003
    },

    //401
    UNAUTHORIZED_BAD_TOKEN: {
        message: 'Something wrong with token',
        code: 4011
    },

    // 404
    NOT_FOUND: {
        message: 'Record not found',
        code: 4041
    }
};
