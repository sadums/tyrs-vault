'use strict';

const { FriendRequest } = require('../models'); // Adjust the path if needed

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Seed data for FriendRequest model
    await queryInterface.bulkInsert('friendRequests', [
      {
        targetUserID: 1,
        sentUserID: 2,
      },
      {
        targetUserID: 1,
        sentUserID: 3,
      },
      {
        targetUserID: 1,
        sentUserID: 4,
      },
      {
        targetUserID: 2,
        sentUserID: 3,
      },
      {
        targetUserID: 2,
        sentUserID: 4,
      },
      {
        targetUserID: 2,
        sentUserID: 5,
      },
      {
        targetUserID: 3,
        sentUserID: 4,
      },
      {
        targetUserID: 3,
        sentUserID: 5,
      },
      {
        targetUserID: 3,
        sentUserID: 6,
      },
      {
        targetUserID: 4,
        sentUserID: 5,
      },
      {
        targetUserID: 4,
        sentUserID: 6,
      },
      {
        targetUserID: 4,
        sentUserID: 7,
      },
      {
        targetUserID: 5,
        sentUserID: 6,
      },
      {
        targetUserID: 5,
        sentUserID: 7,
      },
      {
        targetUserID: 5,
        sentUserID: 8,
      },
      {
        targetUserID: 6,
        sentUserID: 7,
      },
      {
        targetUserID: 6,
        sentUserID: 8,
      },
      {
        targetUserID: 6,
        sentUserID: 9,
      },
      {
        targetUserID: 7,
        sentUserID: 8,
      },
      {
        targetUserID: 7,
        sentUserID: 9,
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    // Remove all seed data
    await queryInterface.bulkDelete('friendRequests', null, {});
  },
};
