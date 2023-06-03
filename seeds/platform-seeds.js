const Platform = require('../models/Platform'); // Adjust the path if needed

const seedPlatformData = [
  {
    user_id: 1,
    link: 'https://platform1.com',
    platform_username: 'user1',
  },
  {
    user_id: 1,
    link: 'https://platform2.com',
    platform_username: 'user1',
  },
  {
    user_id: 2,
    link: 'https://platform3.com',
    platform_username: 'user2',
  },
  {
    user_id: 2,
    link: 'https://platform4.com',
    platform_username: 'user2',
  },
  // Add more Platform seed data here
  {
    user_id: 3,
    link: 'https://platform5.com',
    platform_username: 'user3',
  },
  {
    user_id: 3,
    link: 'https://platform6.com',
    platform_username: 'user3',
  },
  {
    user_id: 4,
    link: 'https://platform7.com',
    platform_username: 'user4',
  },
  {
    user_id: 4,
    link: 'https://platform8.com',
    platform_username: 'user4',
  },
  {
    user_id: 5,
    link: 'https://platform9.com',
    platform_username: 'user5',
  },
  {
    user_id: 5,
    link: 'https://platform10.com',
    platform_username: 'user5',
  },
  {
    user_id: 6,
    link: 'https://platform11.com',
    platform_username: 'user6',
  },
  {
    user_id: 6,
    link: 'https://platform12.com',
    platform_username: 'user6',
  },
  {
    user_id: 7,
    link: 'https://platform13.com',
    platform_username: 'user7',
  },
  {
    user_id: 7,
    link: 'https://platform14.com',
    platform_username: 'user7',
  },
  {
    user_id: 8,
    link: 'https://platform15.com',
    platform_username: 'user8',
  },
  {
    user_id: 8,
    link: 'https://platform16.com',
    platform_username: 'user8',
  },
  {
    user_id: 9,
    link: 'https://platform17.com',
    platform_username: 'user9',
  },
  {
    user_id: 9,
    link: 'https://platform18.com',
    platform_username: 'user9',
  },
  {
    user_id: 10,
    link: 'https://platform19.com',
    platform_username: 'user10',
  },
  {
    user_id: 10,
    link: 'https://platform20.com',
    platform_username: 'user10',
  },
];

// const seedPlatform = () => Platform.bulkCreate(seedPlatformData);

// module.exports = seedPlatform;

module.exports = seedPlatformData;
