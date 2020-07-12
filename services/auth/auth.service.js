let db = require('../../database').getInstance();
const {modelNamesEnum: {TOKEN}} = require('../../constants');

class AuthService {
    createToken(token) {
        const TokenModel = db.getModel(TOKEN);

        return TokenModel.create(token);
    }

    deleteTokenByParams(params){
        const TokenModel = db.getModel(TOKEN);

        return TokenModel.destroy({
            where: params
        });
    }

    getTokenByParams(params) {
        const TokenModel = db.getModel(TOKEN);

        return TokenModel.findOne({where: params});
    }
}

module.exports = new AuthService;
