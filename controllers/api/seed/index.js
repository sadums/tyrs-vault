const express = require('express');
const router = express.Router();

const userFriend = require('../../../seeds/userfriends-seeds')
const seedFriendRequest = require('../../../seeds/friendRequest-seeds')
const seedPlatform = require('../../../seeds/platform-seeds')
const seedUsers = require('../../../seeds/user-seeds')
const seedUserGames = require('../../../seeds/userGames-seeds')

const User = require('../../../models/User')

router.post('/user', async (req, res) => {
    await seedUsers()
    const testUserData = await User.findAll()
    console.log(testUserData)
    res.json('seeded')
    
})

router.post('/usergames', async (req, res) => {
    seedUserGames()
    res.json('seeded')
})

//err
router.post('/platform', async (req, res) => {
    seedPlatform()
    res.json('seeded')
})

router.post('/friendrequest', async (req, res) => {
    seedFriendRequest()
    res.json('seeded')
})



router.post('/userfriend', async (req, res) => {
    userFriend()
    res.json('seeded')
})


module.exports = router;