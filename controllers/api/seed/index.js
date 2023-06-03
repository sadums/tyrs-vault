const express = require('express');
const router = express.Router();

// const userFriend = require('../../../seeds/userfriends-seeds')
// const seedFriendRequest = require('../../../seeds/friendRequest-seeds')
// const seedPlatform = require('../../../seeds/platform-seeds')
// const seedUsers = require('../../../seeds/user-seeds')
// const seedUserGames = require('../../../seeds/userGames-seeds')

const User = require('../../../models/User');
const seedUserData = require('../../../seeds/user-seeds');

const UserFriends = require('../../../models/Friend')
const seedUserFriendsData = require('../../../seeds/userfriends-seeds')

const UserGames = require('../../../models/Game')
const seedUserGamesData = require('../../../seeds/userGames-seeds')

const FriendRequest = require('../../../models/FriendRequest')
const seedFriendRequestData = require('../../../seeds/friendRequest-seeds')

const Platform = require('../../../models/Platform')
const seedPlatformData = require('../../../seeds/platform-seeds')



router.post('/all', async (req, res) => {
    await User.bulkCreate(seedUserData)
    await UserGames.bulkCreate(seedUserGamesData)
    await Platform.bulkCreate(seedPlatformData)
    await FriendRequest.bulkCreate(seedFriendRequestData)
    await UserFriends.bulkCreate(seedUserFriendsData)
    res.json('all seeded')
})
router.post('/user', async (req, res) => {
    // console.log(seedUserData)
    await User.bulkCreate(seedUserData)
    res.json('seeded')
    
})

router.post('/usergames', async (req, res) => {
    await UserGames.bulkCreate(seedUserGamesData)
    res.json('seeded')
})

//err
router.post('/platform', async (req, res) => {
    await Platform.bulkCreate(seedPlatformData)
    res.json('seeded')
})

router.post('/friendrequest', async (req, res) => {
    await FriendRequest.bulkCreate(seedFriendRequestData)
    res.json('seeded')
})



router.post('/userfriend', async (req, res) => {
    await UserFriends.bulkCreate(seedUserFriendsData)
    res.json('seeded')
})


module.exports = router;