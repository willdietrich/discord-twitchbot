import {DataTypes, Sequelize} from "sequelize";

module.exports = function streamer(sequelize: Sequelize, DataTypes: DataTypes) {
    return sequelize.define('streamer', {
        name: DataTypes.STRING
    });
};
