
const UserFriends = require('../models/Friend'); // Adjust the path if needed

const seedUserFriendsData = [
  {
    user_id1: 1,
    user_id2: 2,
  },
  {
    user_id1: 2,
    user_id2: 3,
  },
  // Add more userFriends seed data here
];

const userFriendRequest = () => UserFriends.bulkCreate(seedUserFriendsData)

module.exports = userFriendRequest
