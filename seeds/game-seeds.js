const Game = require('../models/Game')

const gameSeedData = [
    {
      title: "Super Mario Odyssey"
    },
    {
      title: "The Legend of Zelda: Breath of the Wild"
    },
    {
      title: "Red Dead Redemption 2"
    },
    {
      title: "God of War"
    },
    {
      title: "Minecraft"
    },
    {
      title: "Grand Theft Auto V"
    },
    {
      title: "Fortnite"
    },
    {
      title: "Fallout 4"
    },
    {
      title: "The Witcher 3: Wild Hunt"
    },
    {
      title: "Overwatch"
    },
    {
      title: "Animal Crossing: New Horizons"
    },
    {
      title: "Call of Duty: Warzone"
    },
    {
      title: "Assassin's Creed Valhalla"
    },
    {
      title: "Final Fantasy VII Remake"
    },
    {
      title: "Super Smash Bros. Ultimate"
    },
    {
      title: "Among Us"
    },
    {
      title: "FIFA 21"
    },
    {
      title: "League of Legends"
    },
    {
      title: "Mortal Kombat 11"
    },
    {
      title: "Pokemon Sword and Shield"
    }
  ];
  
  const seedGames = () => Game.bulkCreate(gameSeedData);

  module.exports = seedGames;
  