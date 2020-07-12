'use strict';
const {dbTablesNamesEnum: {USERS, TOKENS}} = require('../constants');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable(TOKENS, {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            accessToken: {
                type: Sequelize.STRING,
                allowNull: false
            },
            refreshToken: {
                type: Sequelize.STRING,
                allowNull: false
            },
            userId: {
                type: Sequelize.INTEGER,
                foreignKey: true,
                references: {
                    model: USERS,
                    key: 'id'
                },
                onUpdate: "NO ACTION",
                onDelete: "NO ACTION"
            },
            createdAt: {
                type: Sequelize.DATE,
                defaultValue: Sequelize.fn('now')
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable(TOKENS);
    }
};
