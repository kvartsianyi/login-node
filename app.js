require('dotenv').config();

const cors = require('cors');
const express = require('express');
const expressRateLimit = require('express-rate-limit');
const morgan = require('morgan');

const {
    ALLOWED_ORIGIN,
    PORT,
    SERVER_RATE_LIMIT: {period, maxRequests}
} = require('./config');
const {authRouter, userRouter} = require('./routes');

const db = require('./database').getInstance();
db.setModels();

const serverRequestLimit = expressRateLimit({
    windowMs: period,
    max: maxRequests
});

const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(morgan('dev'));
app.use(cors({
    origin: configureCors
}));
app.use(serverRequestLimit);

function configureCors(origin, callback) {
    const whiteList = ALLOWED_ORIGIN.split(';');

    if (!origin) return callback(null, true); // FOR POSTMAN
    if (!whiteList.includes(origin)) return callback(new Error('Cors not allowed'), false);

    return callback(null, true);
}

app.use('/auth', authRouter);
app.use('/users', userRouter);

app.use('*', (err, req, res, next) => {
    let message = err.message;

    if (err.parent) {
        message = err.parent.sqlMessage;
    }

    res
        .status(err.status || 400)
        .json({
            message,
            code: err.customCode
        })
});

app.listen(PORT, err => {
    if (err) console.log(err);
    else console.log(`Server started at ${PORT} port...`);
});

process.on('unhandledRejection', reason => {
    console.log(reason);

    process.exit(0);
});
