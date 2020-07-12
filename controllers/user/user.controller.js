const {httpStatusCodeEnum: {CREATED}} = require('../../constants');
const {hashHelper: {hashPassword}} = require('../../helpers');
const {userService: {createUser, getUserByPk}} = require('../../services');

module.exports = {
    createUser: async (req, res, next) => {
        try {
            const user = req.body;

            user.password = await hashPassword(user.password);

            await createUser(user);

            res.status(CREATED).json();
        } catch (e) {
            next(e);
        }
    },

    getUser: async (req, res, next) => {
        try {
            const userId = req.userId;
            const user = await getUserByPk(userId);

            res.json(user);
        } catch (e) {
            next(e);
        }
    }
};
