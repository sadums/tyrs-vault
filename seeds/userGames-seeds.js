const UserGames = require('../models/Game'); // Adjust the path if needed

const seedUserGamesData = [
  // Add your seed data here
  // Example:
  {
    title: "Assassin's Creed Valhalla",
    image: 'assassins-creed-valhalla.jpg',
    apiUrl: 'https://api.game1.com',
    user_id: 1,
  },
  {
    title: 'The Witcher 3: Wild Hunt',
    image: 'the-witcher-3-wild-hunt.jpg',
    apiUrl: 'https://api.game2.com',
    user_id: 1,
  },
  {
    title: 'Red Dead Redemption 2',
    image: 'red-dead-redemption-2.jpg',
    apiUrl: 'https://api.game3.com',
    user_id: 2,
  },
  {
    title: 'Fortnite',
    image: 'fortnite.jpg',
    apiUrl: 'https://api.game4.com',
    user_id: 2,
  },
  // Add more UserGames seed data here
  {
    title: 'Cyberpunk 2077',
    image: 'cyberpunk-2077.jpg',
    apiUrl: 'https://api.game5.com',
    user_id: 3,
  },
  {
    title: 'Minecraft',
    image: 'minecraft.jpg',
    apiUrl: 'https://api.game6.com',
    user_id: 3,
  },
  {
    title: 'The Last of Us Part II',
    image: 'the-last-of-us-part-ii.jpg',
    apiUrl: 'https://api.game7.com',
    user_id: 4,
  },
  {
    title: 'Call of Duty: Modern Warfare',
    image: 'call-of-duty-modern-warfare.jpg',
    apiUrl: 'https://api.game8.com',
    user_id: 4,
  },
  {
    title: 'Grand Theft Auto V',
    image: 'grand-theft-auto-v.jpg',
    apiUrl: 'https://api.game9.com',
    user_id: 5,
  },
  {
    title: 'Super Smash Bros. Ultimate',
    image: 'super-smash-bros-ultimate.jpg',
    apiUrl: 'https://api.game10.com',
    user_id: 5,
  },
  {
    title: 'The Legend of Zelda: Breath of the Wild',
    image: 'the-legend-of-zelda-breath-of-the-wild.jpg',
    apiUrl: 'https://api.game11.com',
    user_id: 6,
  },
  {
    title: 'FIFA 22',
    image: 'fifa-22.jpg',
    apiUrl: 'https://api.game12.com',
    user_id: 6,
  },
  {
    title: 'Overwatch',
    image: 'overwatch.jpg',
    apiUrl: 'https://api.game13.com',
    user_id: 7,
  },
  {
    title: 'League of Legends',
    image: 'league-of-legends.jpg',
    apiUrl: 'https://api.game14.com',
    user_id: 7,
  },
  {
    title: 'God of War',
    image: 'god-of-war.jpg',
    apiUrl: 'https://api.game15.com',
    user_id: 8,
  },
  // Add more UserGames seed data here
];

const seedUserGames = () => UserGames.bulkCreate(seedUserGamesData);

module.exports = seedUserGames;
