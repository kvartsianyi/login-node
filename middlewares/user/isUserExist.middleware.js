const {Op} = require('sequelize');

const {httpStatusCodeEnum: {BAD_REQUEST}} = require('../../constants');
const {ErrorHandler, customErrors: {BAD_REQUEST_USER_REGISTERED}} = require('../../errors');
const {userService: {getUserByParams}} = require('../../services');

module.exports = async (req, res, next) => {
    const {email, login} = req.body;
    const userFromDb = await getUserByParams(
        {
            [Op.or]: [{email}, {login}]
        }
    );

    if (userFromDb) {
        return next(new ErrorHandler(
            BAD_REQUEST_USER_REGISTERED.message,
            BAD_REQUEST,
            BAD_REQUEST_USER_REGISTERED.code
        ));
    }

    next();
};
