const Joi = require('joi');

const {httpStatusCodeEnum} = require('../../constants');
const {ErrorHandler} = require('../../errors');
const {userValidation: {userLoginValidation}} = require('../../validators');

module.exports = (req, res, next) => {
    const user = req.body;
    const {error} = Joi.validate(user, userLoginValidation);

    if (error) {
        return next(new ErrorHandler(error.details[0].message, httpStatusCodeEnum.NOT_FOUND));
    }

    next();
};
