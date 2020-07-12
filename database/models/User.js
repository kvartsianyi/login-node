const {dbTablesNamesEnum: {USERS}, modelNamesEnum: {USER}} = require('../../constants');

module.exports = (sequelize, DataTypes) => {
    return sequelize.define(USER, {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            login: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false
            },
            email: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false
            }
        },
        {
            tableName: USERS,
            timestamps: false
        });
};
