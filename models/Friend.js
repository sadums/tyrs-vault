const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class UserFriends extends Model{}

//how could we adjust the model so that the number of friends is variable?
UserFriends.init(
    {
        id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        user_id1:{
            type: DataTypes.INTEGER,
            references:{
                model: 'user',
                key: 'id',
                unique: false
            }
        },
        user_id2:{
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
        modelName: 'userFriends',
    }
)

module.exports = UserFriends;