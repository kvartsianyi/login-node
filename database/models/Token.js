const {dbTablesNamesEnum: {TOKENS}, modelNamesEnum: {TOKEN}} = require('../../constants');

module.exports = (sequelize, DataTypes) => {
    return sequelize.define(TOKEN, {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            accessToken: {
                type: DataTypes.STRING,
                allowNull: false
            },
            refreshToken: {
                type: DataTypes.STRING,
                allowNull: false
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false
            }
        },
        {
            tableName: TOKENS,
            timestamps: false
        });
};
