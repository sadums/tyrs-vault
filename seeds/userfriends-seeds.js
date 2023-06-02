'use strict';

const UserFriends = require('../models/Friend'); // Adjust the path if needed

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Seed data for UserFriends model
    await queryInterface.bulkInsert('userFriends', [
      {
        user_id1: 1,
        user_id2: 2,
      },
      {
        user_id1: 2,
        user_id2: 3,
      },
      // Add more userFriends seed data here
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    // Remove all seed data
    await queryInterface.bulkDelete('userFriends', null, {});
  },
};
