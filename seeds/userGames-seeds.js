const UserGames = require('../models/UserGames')

const userGamesSeedData = [
    {
      game_id: 1,
      user_id: 1
    },
    {
      game_id: 2,
      user_id: 1
    },
    {
      game_id: 3,
      user_id: 2
    },
    {
      game_id: 4,
      user_id: 2
    },
    {
      game_id: 5,
      user_id: 3
    },
    {
      game_id: 6,
      user_id: 3
    },
    {
      game_id: 7,
      user_id: 4
    },
    {
      game_id: 8,
      user_id: 4
    },
    {
      game_id: 9,
      user_id: 5
    },
    {
      game_id: 10,
      user_id: 5
    },
    {
      game_id: 11,
      user_id: 6
    },
    {
      game_id: 12,
      user_id: 6
    },
    {
      game_id: 13,
      user_id: 7
    },
    {
      game_id: 14,
      user_id: 7
    },
    {
      game_id: 15,
      user_id: 8
    },
    {
      game_id: 16,
      user_id: 8
    },
    {
      game_id: 17,
      user_id: 9
    },
    {
      game_id: 18,
      user_id: 9
    },
    {
      game_id: 19,
      user_id: 10
    },
    {
      game_id: 20,
      user_id: 10
    }
  ];
  
const seedUserGames = () => UserGames.bulkCreate(userGamesSeedData);

module.exports = seedUserGames;
  