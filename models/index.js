const User = require('./User');
const Game = require('./Game');
const UserGames = require('./UserGames');
const Friend = require('./Friend');
const FriendRequest = require('./FriendRequest');
const Platform = require('./Platform')

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
    foreignKey: 'targetUserID'
});
FriendRequest.hasMany(User, {
    foreignKey: 'targetUserID'
});

User.hasMany(Platform, {
    foreignKey: 'user_id'
});
Platform.belongsTo(User, {
    foreignKey: 'user_id'
});





module.exports = {User, Game, UserGames, Friend, FriendRequest, Platform}
