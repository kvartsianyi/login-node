const Joi = require('joi');

module.exports = Joi.object().keys({
    login: Joi.string().alphanum().min(3).max(60).required(),
    password: Joi.string().min(8).max(20).required()
});
