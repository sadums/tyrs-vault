const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class UserGames extends Model{}

UserGames.init(
    {
        id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        game_id:{
            type: DataTypes.INTEGER,
            references:{
                model: 'game',
                key: 'id',
                unique: false
            }
        },
        user_id:{
            type:DataTypes.INTEGER,
            references:{
                model: 'user',
                key: 'id',
                unique: false
            }
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'userGames',
    }
)

module.exports = UserGames;