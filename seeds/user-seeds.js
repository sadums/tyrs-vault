const User = require('../models/User')

const userSeedData = [
    {
      username: "JohnDoe",
      email: "johndoe@example.com",
      password: "Password123"
    },
    {
      username: "JaneSmith",
      email: "janesmith@example.com",
      password: "Password456"
    },
    {
      username: "MichaelJohnson",
      email: "michaeljohnson@example.com",
      password: "Password789"
    },
    {
      username: "EmilyWilson",
      email: "emilywilson@example.com",
      password: "Password123"
    },
    {
      username: "WilliamDavis",
      email: "williamdavis@example.com",
      password: "Password456"
    },
    {
      username: "OliviaAnderson",
      email: "oliviaanderson@example.com",
      password: "Password789"
    },
    {
      username: "JamesBrown",
      email: "jamesbrown@example.com",
      password: "Password123"
    },
    {
      username: "SophiaMiller",
      email: "sophiamiller@example.com",
      password: "Password456"
    },
    {
      username: "BenjaminWilson",
      email: "benjaminwilson@example.com",
      password: "Password789"
    },
    {
      username: "AvaTaylor",
      email: "avataylor@example.com",
      password: "Password123"
    },
    {
      username: "DanielMartinez",
      email: "danielmartinez@example.com",
      password: "Password456"
    },
    {
      username: "MiaThompson",
      email: "miathompson@example.com",
      password: "Password789"
    },
    {
      username: "AlexanderJohnson",
      email: "alexanderjohnson@example.com",
      password: "Password123"
    },
    {
      username: "AbigailDavis",
      email: "abigaildavis@example.com",
      password: "Password456"
    },
    {
      username: "EthanAnderson",
      email: "ethananderson@example.com",
      password: "Password789"
    },
    {
      username: "CharlotteMartinez",
      email: "charlottemartinez@example.com",
      password: "Password123"
    },
    {
      username: "LiamWilson",
      email: "liamwilson@example.com",
      password: "Password456"
    },
    {
      username: "HarperTaylor",
      email: "harpertaylor@example.com",
      password: "Password789"
    },
    {
      username: "LucasJohnson",
      email: "lucasjohnson@example.com",
      password: "Password123"
    },
    {
      username: "LilyDavis",
      email: "lilydavis@example.com",
      password: "Password456"
    },
    {
      username: "Carreejoh",
      email: "carreejoh4637@mailbox.org",
      password: "Password123"
    }
  ];
  
  const seedUsers = () => User.bulkCreate(userSeedData);

  module.exports = seedUsers;
  