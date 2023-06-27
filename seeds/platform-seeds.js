const Platform = require('../models/Platform'); // Adjust the path if needed

const seedPlatformData = [
  {
    user_id: 1,
    platform_name: 'steam',
    platform_username: 'user1',
  },
  {
    user_id: 1,
    platform_name: 'xbox',
    platform_username: 'user1',
  },
  {
    user_id: 2,
    platform_name: 'steam',
    platform_username: 'user2',
  },
  {
    user_id: 2,
    platform_name: 'xbox',
    platform_username: 'user2',
  },
  // Add more Platform seed data here
  {
    user_id: 3,
    platform_name: 'xbox',
    platform_username: 'user3',
  },
  {
    user_id: 3,
    platform_name: 'playstation',
    platform_username: 'user3',
  },
  {
    user_id: 4,
    platform_name: 'xbox',
    platform_username: 'user4',
  },
  {
    user_id: 4,
    platform_name: 'steam',
    platform_username: 'user4',
  },
  {
    user_id: 5,
    platform_name: 'xbox',
    platform_username: 'user5',
  },
  {
    user_id: 5,
    platform_name: 'playstation',
    platform_username: 'user5',
  },
  {
    user_id: 6,
    platform_name: 'playstation',
    platform_username: 'user6',
  },
  {
    user_id: 6,
    platform_name: 'steam',
    platform_username: 'user6',
  },
  {
    user_id: 7,
    platform_name: 'xbox',
    platform_username: 'user7',
  },
  {
    user_id: 7,
    platform_name: 'playstation',
    platform_username: 'user7',
  },
  {
    user_id: 8,
    platform_name: 'steam',
    platform_username: 'user8',
  },
  {
    user_id: 8,
    platform_name: 'playstation',
    platform_username: 'user8',
  },
  {
    user_id: 9,
    platform_name: 'xbox',
    platform_username: 'user9',
  },
  {
    user_id: 9,
    platform_name: 'steam',
    platform_username: 'user9',
  },
  {
    user_id: 10,
    platform_name: 'steam',
    platform_username: 'user10',
  },
  {
    user_id: 10,
    platform_name: 'xbox',
    platform_username: 'user10',
  },
];

// const seedPlatform = () => Platform.bulkCreate(seedPlatformData);

// module.exports = seedPlatform;

module.exports = seedPlatformData;
