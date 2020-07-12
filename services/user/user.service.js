let db = require('../../database').getInstance();
const {modelNamesEnum: {USER}} = require('../../constants');

class UserService {
    getUserByParams(params) {
        const UserModel = db.getModel(USER);

        return UserModel.findOne({
            where: params
        });
    }

    getUserByPk(userId) {
        const UserModel = db.getModel(USER);

        return UserModel.findByPk(userId, {attributes: ['id', 'login', 'email']});
    }

    async createUser(user) {
        const UserModel = db.getModel(USER);

        return UserModel.create(user);
    }
}

module.exports = new UserService;
