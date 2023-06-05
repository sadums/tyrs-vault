const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Platform extends Model { }

Platform.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id',
                unique: false
            }
        },
        platform_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        platform_username: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'platform',
    }
);

module.exports = Platform;