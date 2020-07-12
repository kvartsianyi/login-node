const Sequelize = require('sequelize');
const fs = require('fs');
const path = require('path');

const {DB_HOST, DB_NAME, DB_PASSWORD, DB_USERNAME} = require('../config');

module.exports = (() => {
    let instance;

    function newConnection() {
        const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD,
            {
                host: DB_HOST,
                dialect: 'mysql'
            }
        );

        let models = {};

        function getModels() {
            fs.readdir(path.join(process.cwd(), 'database', 'models'), ((err, files) => {
                if (err) {
                    throw new Error(err.message);
                }

                files.forEach(file => {
                    const [modelName] = file.split('.');
                    models[modelName] = sequelize.import(path.join(process.cwd(), 'database', 'models', modelName));
                });
            }))
        }

        return {
            setModels: () => getModels(),
            getModel: (modelName) => models[modelName]
        }
    }

    return {
        getInstance: () => {
            if (!instance) {
                instance = newConnection();
            }

            return instance;
        }
    }
})();
