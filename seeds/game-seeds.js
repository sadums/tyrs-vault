const Game = require('../models/Game')

const gameSeedData = [
  {
    title: 'The Legend of Zelda: Breath of the Wild',
    description: 'Embark on an epic adventure in the kingdom of Hyrule.'
  },
  {
    title: 'Red Dead Redemption 2',
    description: 'Experience the harsh life of an outlaw in the Wild West.'
  },
  {
    title: 'The Witcher 3: Wild Hunt',
    description: 'Step into the shoes of Geralt of Rivia, a monster hunter.'
  },
  {
    title: 'Grand Theft Auto V',
    description: 'Explore the vast open world of Los Santos and Blaine County.'
  },
  {
    title: 'Minecraft',
    description: 'Build and explore your own virtual world filled with endless possibilities.'
  },
  {
    title: 'Super Mario Odyssey',
    description: 'Join Mario on a globe-trotting adventure to rescue Princess Peach.'
  },
  {
    title: 'Fallout 4',
    description: 'Survive and thrive in the post-apocalyptic wasteland of Boston.'
  },
  {
    title: 'Overwatch',
    description: 'Engage in fast-paced team-based multiplayer battles in a futuristic world.'
  },
  {
    title: 'The Elder Scrolls V: Skyrim',
    description: 'Uncover the secrets of the ancient land of Skyrim as the Dragonborn.'
  },
  {
    title: 'Fortnite',
    description: 'Battle against other players in a massive online survival competition.'
  },
  {
    title: 'Assassin\'s Creed Valhalla',
    description: 'Play as a Viking warrior and lead your clan to conquer new lands.'
  },
  {
    title: 'League of Legends',
    description: 'Compete in intense multiplayer battles with a diverse roster of champions.'
  },
  {
    title: 'Call of Duty: Modern Warfare',
    description: 'Engage in realistic and intense first-person shooter combat.'
  },
  {
    title: 'FIFA 21',
    description: 'Experience the excitement of the worlds most popular football (soccer) game.'
  },
  {
    title: 'Animal Crossing: New Horizons',
    description: 'Create your own virtual paradise on a deserted island filled with adorable animal villagers.'
  },
  {
    title: 'Cyberpunk 2077',
    description: 'Immerse yourself in a dystopian future world filled with advanced technology and crime.'
  },
  {
    title: 'World of Warcraft',
    description: 'Enter the vast and immersive world of Azeroth in this legendary MMORPG.'
  },
  {
    title: 'Pokémon Sword and Shield',
    description: 'Embark on a journey to become a Pokémon Champion in the new Galar region.'
  },
  {
    title: 'BioShock Infinite',
    description: 'Uncover the mysteries of the floating city of Columbia in this thrilling first-person shooter.'
  },
  {
    title: 'Apex Legends',
    description: 'Join the battle royale phenomenon and compete to be the last team standing.'
  }
];

  
  const seedGames = () => Game.bulkCreate(gameSeedData);

  module.exports = seedGames;
  