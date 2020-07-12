module.exports = {
    PORT: process.env.PORT || 5000,

    DB_NAME: process.env.DB_NAME || 'localhost',
    DB_HOST: process.env.DB_HOST || 'authorization',
    DB_USERNAME: process.env.DB_USER || 'root',
    DB_PASSWORD: process.env.DB_PASSWORD || 'root',

    ALLOWED_ORIGIN: process.env.ALLOWED_ORIGIN || 'http://localhost:4200;http://localhost:3000',
    SERVER_RATE_LIMIT: {
        period: 15 * 60 * 1000,
        maxRequests: 1000
    }
};
