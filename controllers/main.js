const router = require('express').Router();
const { User, Game, Platform, Friend, FriendRequest } = require('../models');


// Endpoint: '/'
// Renders the main page
router.get('/', async (req, res) => {
    try {
        const userData = await User.findAll().catch((err) => {
            res.json(err);
            
        });
        //console.log(userData)
        const users = userData.map((user) => user.get({ plain: true }));
        if (req.session.loggedIn) {
            res.render('games', {
                games: true,
                home: true,
                loggedIn: req.session.loggedIn,
                users
            });
        } else {
            res.redirect('/login')
        }
    } catch (e) {
        console.error(e);
        res.status(500).json(e);
    }
});

// Endpoint: '/login'
// Renders the login page
router.get('/login', (req, res) => {
    try {
        if (req.session.loggedIn) {
            res.redirect('/');
            return;
        }

        res.render('login', {
            login: true
        });
    } catch (e) {
        console.error(e);
        res.status(500).json(e);
    }
});

// Endpoint: '/friends'
// Renders the friends page
router.get('/friends', async (req, res) => {
    try {
        const friendRequests = await FriendRequest.findAll({
            where: {
              targetUserID: req.session.userid
            },
          });
          const data = []
      
          for (let i = 0; i < friendRequests.length; i++) {
            let currentRequest = friendRequests[i];
            let sentUser = await User.findByPk(currentRequest.dataValues.sentUserID, {
              attributes: { exclude: ['password', 'email'] }
            })
            data.push({
              request: currentRequest.dataValues,
              user: sentUser.dataValues
            });
          }
          
        //console.log(userData.dataValues)
        //const userFriendRequest = userData.dataValues.friendRequests
        if (!req.session.loggedIn) {
            res.redirect('/');
            return;
        }
        res.render('friends', {
            friends: true,
            data,
        });
    } catch (e) {
        console.error(e);
        res.status(500).json(e);
    }
});

const generateRandomValues = (min, max) => {
    const availableValues = max - min;
    const randomValues = new Set();

    while (randomValues.size < 5 && randomValues.size < availableValues) {
        const randomValue = Math.floor(Math.random() * availableValues) + min;
        randomValues.add(randomValue);
    }

    return Array.from(randomValues);
};




// Endpoint: '/profile'
// Renders the users profile
router.get('/profile', async (req, res) => {
    if (!req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    const user = await User.findByPk(req.session.userid, {
        attributes: { exclude: ['password', 'email'] },
        include: [{ model: Platform }, { model: Game }]
    });
    if (!user) {
        res.status(404).json({ message: "Something went wrong, please try again" });
        return;
    }
    const data = user.dataValues;
    console.log(data);

    const userGames = data.userGames.map((game) => game.get({ plain: true }));
    sendDataList = []
    const indexOfGames = generateRandomValues(0, userGames.length)
    for (let i = 0; i < indexOfGames.length; i++) {
        sendDataList.push(userGames[indexOfGames[i]])
    }
    console.log(sendDataList)
    res.render('profile', {
        data,
        sendDataList,
        platforms: false, // change to actually send platforms
        favorites: false, //change to actually send favorites
        profile: true,
        ownPage: true
    });
});

// Endpoint: '/profile/:username'
// Renders a specific users profile
router.get('/profile/:username', async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                username: req.params.username
            },
            attributes: { exclude: ['password', 'email'] },
            include: [{ model: Game }]
        });

        if (!user) {
            res.status(400).json({ message: "No user found!" });
            return;
        }

        if (user.dataValues.id === req.session.userid) {
            res.redirect('/profile');
            return;
        }

        const data = user.dataValues;
        const userGames = data.userGames.map((game) => game.get({ plain: true }));
        sendDataList = []
        const indexOfGames = generateRandomValues(0, userGames.length)
        for (let i = 0; i < indexOfGames.length; i++) {
            sendDataList.push(userGames[indexOfGames[i]])
        }
        console.log(sendDataList)
        res.render('profile', {
            data,
            sendDataList,
            platforms: false, // change to actually send platforms
            favorites: false, //change to actually send favorites
            profile: true,
            ownPage: false
        });
    } catch (e) {
        console.error(e);
        res.status(500).json(e);
        return;
    }
});

// Endpoint: '/games'
// Renders the games page




module.exports = router