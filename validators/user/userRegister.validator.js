const Joi = require('joi');

const {regexpEnum: {EMAIL}} = require('../../constants');

module.exports = Joi.object().keys({
    login: Joi.string().alphanum().min(3).max(60).required(),
    email: Joi.string().regex(EMAIL).required(),
    password: Joi.string().min(8).max(20).required()
});
