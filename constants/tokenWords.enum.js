module.exports = {
    ACCESS_TOKEN: process.env.ACCESS_TOKEN || 'SECRET_ACCESS_WORD',
    ACCESS_TOKEN_TIME: process.env.ACCESS_TOKEN_TIME || '15m',

    REFRESH_TOKEN: process.env.REFRESH_TOKEN || 'SECRET_REFRESH_WORD',
    REFRESH_TOKEN_TIME: process.env.REFRESH_TOKEN_TIME || '1d'
};
