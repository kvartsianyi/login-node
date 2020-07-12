const {httpStatusCodeEnum: {CREATED}} = require('../../constants');
const {hashHelper: {hashPassword}} = require('../../helpers');
const {userService: {createUser}} = require('../../services');

module.exports = {
    createUser: async (req, res, next) => {
        try {
            const user = req.body;

            user.password = await hashPassword(user.password);

            await createUser(user);

            res.sendStatus(CREATED);
        } catch (e) {
            next(e);
        }
    }
};
