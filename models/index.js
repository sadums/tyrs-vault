const sequelize = require('../config/connection');
const User = require('./User');
const Game = require('./Game');
const UserGames = require('./userGames');

User.hasMany(Game, {
    through: {
        model: UserGames,
        unique: false
    }
});
Game.belongsToMany(User, {
    through: {
        model: UserGames,
        unique: false
    }
});

module.exports = {User, Game, UserGames}