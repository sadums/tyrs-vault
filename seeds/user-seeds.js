const User = require('../models/User')

const userSeedData = [
    {
      username: "John Doe",
      email: "johndoe@example.com",
      password: "Password123"
    },
    {
      username: "Jane Smith",
      email: "janesmith@example.com",
      password: "Password456"
    },
    {
      username: "Michael Johnson",
      email: "michaeljohnson@example.com",
      password: "Password789"
    },
    {
      username: "Emily Wilson",
      email: "emilywilson@example.com",
      password: "Password123"
    },
    {
      username: "William Davis",
      email: "williamdavis@example.com",
      password: "Password456"
    },
    {
      username: "Olivia Anderson",
      email: "oliviaanderson@example.com",
      password: "Password789"
    },
    {
      username: "James Brown",
      email: "jamesbrown@example.com",
      password: "Password123"
    },
    {
      username: "Sophia Miller",
      email: "sophiamiller@example.com",
      password: "Password456"
    },
    {
      username: "Benjamin Wilson",
      email: "benjaminwilson@example.com",
      password: "Password789"
    },
    {
      username: "Ava Taylor",
      email: "avataylor@example.com",
      password: "Password123"
    },
    {
      username: "Daniel Martinez",
      email: "danielmartinez@example.com",
      password: "Password456"
    },
    {
      username: "Mia Thompson",
      email: "miathompson@example.com",
      password: "Password789"
    },
    {
      username: "Alexander Johnson",
      email: "alexanderjohnson@example.com",
      password: "Password123"
    },
    {
      username: "Abigail Davis",
      email: "abigaildavis@example.com",
      password: "Password456"
    },
    {
      username: "Ethan Anderson",
      email: "ethananderson@example.com",
      password: "Password789"
    },
    {
      username: "Charlotte Martinez",
      email: "charlottemartinez@example.com",
      password: "Password123"
    },
    {
      username: "Liam Wilson",
      email: "liamwilson@example.com",
      password: "Password456"
    },
    {
      username: "Harper Taylor",
      email: "harpertaylor@example.com",
      password: "Password789"
    },
    {
      username: "Lucas Johnson",
      email: "lucasjohnson@example.com",
      password: "Password123"
    },
    {
      username: "Lily Davis",
      email: "lilydavis@example.com",
      password: "Password456"
    }
  ];
  
  const seedUsers = () => User.bulkCreate(userSeedData);

  module.exports = seedUsers;
  