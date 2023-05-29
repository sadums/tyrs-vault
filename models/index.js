const User = require('./User');
const Game = require('./Game');
const UserGames = require('./UserGames');
const Friend = require('./Friend');
const FriendRequest = require('./FriendRequest');

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

User.hasMany(User, {
    through: {
        model: Friend,
        unique: false
    }
});
User.belongsToMany(User, {
    through: {
        model: Friend,
        unique: false
    }
});

User.hasMany(FriendRequest, {
    onDelete: 'CASCADE'
});

FriendRequest.belongsTo(User);

module.exports = {User, Game, UserGames, Friend}
