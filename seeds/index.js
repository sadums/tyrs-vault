const seedFriends = require('./friend-seeds')
const seedGames = require('./game-seeds')
const seedUsers = require('./user-seeds')
const seedUserGames = require('./userGames-seeds')

const sequelize = require('../config/connection');

const seedAll = async () => {
    await sequelize.sync({force: true});
    console.log('\n----- DATABASE SYNCED -----\n');
    await seedGames();
    console.log('\n----- GAMES SEEDED -----\n');
    await seedUsers();
    console.log('\n----- USERS SEEDED -----\n');
    await seedUserGames();
    console.log('\n----- USER GAMES SEEDED -----\n');
    await seedFriends();
    console.log('\n----- FRIENDS SEEDED -----\n');

    process.exit(0);
}

seedAll();