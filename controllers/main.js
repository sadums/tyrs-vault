const router = require('express').Router();

const User = require('../models/User');


// Endpoint: '/'
// Renders the main page
router.get('/', async (req, res) => {
    try {
<<<<<<< HEAD
        res.render('home', {
            home: true,
            loggedIn: req.session.loggedIn,
        });
=======
        const userData = await User.findAll().catch((err) => {
            res.json(err);
        });
        const users = userData.map((user) => user.get({ plain: true }));

        res.render('home', {
            home: true,
            loggedIn: req.session.loggedIn,
            users
        });

>>>>>>> a23a1a2e239ffce2525decc91b643322d59ee028
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

<<<<<<< HEAD
// Endpoint: '/friends'
// Renders the friends page
router.get('/friends', async (req, res) => {
    try {
=======
const generateRandomValues = (min, max) => {
    const availableValues = max - min;
    const randomValues = new Set();
  
    while (randomValues.size < 5 && randomValues.size < availableValues) {
      const randomValue = Math.floor(Math.random() * availableValues) + min;
      randomValues.add(randomValue);
    }
  
    return Array.from(randomValues);
  };

router.get('/friends', async (req, res) => {
    try {

>>>>>>> a23a1a2e239ffce2525decc91b643322d59ee028
        if (!req.session.loggedIn) {
            res.redirect('/');
            return;
        }
<<<<<<< HEAD

=======
        const friends1 = await UserFriends.findAll({
            where: {
                user_id1: req.session.userid,
            }
        });
        const friends2 = await UserFriends.findAll({
            where: {
                user_id2: req.session.userid
            }
        });
        //
        sendDataList = []
        const gameList = await Game.findAll({
            where: {
                user_id: req.session.userid
            }
        })
    
        const indexOfGames = generateRandomValues(0, gameList.length)
    
        for(let i=0; i<indexOfGames.length; i++){
            sendDataList.push(gameList[indexOfGames[i]].dataValues)
        }

        //

        const data = []

        for (let i = 0; i < friends1.length; i++) {
            let currentFriend = friends1[i];

            if (currentFriend.dataValues.user_id1 === req.session.userid) {
                // the friend is user_id2
                const friend = await User.findByPk(currentFriend.dataValues.user_id2, {
                    attributes: { exclude: ['password', 'email'] }
                });
                data.push(friend.dataValues);
            } else {
                // the friend is user_id1
                const friend = await User.findByPk(currentFriend.dataValues.user_id1, {
                    attributes: { exclude: ['password', 'email'] }
                });
                data.push(friend.dataValues);
            }
        }

        for (let i = 0; i < friends2.length; i++) {
            let currentFriend = friends2[i];

            if (currentFriend.dataValues.user_id1 === req.session.userid) {
                // the friend is user_id2
                const friend = await User.findByPk(currentFriend.dataValues.user_id2, {
                    attributes: { exclude: ['password', 'email'] }
                });
                data.push(friend.dataValues);
            } else {
                // the friend is user_id1
                const friend = await User.findByPk(currentFriend.dataValues.user_id1, {
                    attributes: { exclude: ['password', 'email'] }
                });
                data.push(friend.dataValues);
            }
        }
>>>>>>> a23a1a2e239ffce2525decc91b643322d59ee028
        res.render('friends', {
            friends: true,
<<<<<<< HEAD
=======
            data: data,
            favoriteGame: sendDataList
>>>>>>> a23a1a2e239ffce2525decc91b643322d59ee028
        });
    } catch (e) {
        console.error(e);
        res.status(500).json(e);
    }
});

// Endpoint: '/profile'
// Renders the users profile
router.get('/profile', async (req, res) => {
    if (!req.session.loggedIn) {
        res.redirect('/');
        return;
    }

<<<<<<< HEAD
    const user = await User.findByPk(req.session.userid, {
        attributes: { exclude: ['password', 'email'] }
    });
=======
    const user = await User.findByPk(req.session.userid);
>>>>>>> a23a1a2e239ffce2525decc91b643322d59ee028
    if (!user) {
        res.status(404).json({ message: "Something went wrong, please try again" });
        return;
    }
    const data = user.dataValues;
    res.render('profile', {
        data,
        platforms: false, // change to actually send platforms
        favorites: false, //change to actually send favorites
        profile: true,
        ownPage: true
    });
});

<<<<<<< HEAD
// Endpoint: '/profile/:username'
// Renders a specific users profile
router.get('/profile/:username', async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                username: req.params.username
            },
            attributes: { exclude: ['password', 'email'] }
        });

        if (!user) {
            res.status(400).json({ message: "No user found!" });
=======
// Render a specific users profile
router.get('/profile/:id', async (req, res) => {
    const user = await User.findByPk(req.params.id);
    if (!user) {
        res.status(404).json({ message: "Something went wrong, please try again" });
        return;
    }
    const loggedIn = req.session.loggedIn;
    // const loggedInUser = req.session.userid;
    // const requestUser = req.params.username;
    //res.send('profile-login')
    try {
        if (loggedIn) { //change the validation here because if loggedIn = ture then you can login to all profiles
            console.log(user.dataValues)
            res.render('profile-login', {
                user: user.dataValues
            })
            //res.json(user)
        } else {
            res.render('profile-not-login', {
                user
            })
        }
    }
    catch (err) {
        console.log(err)
        res.status(500).json()
    }
});

//Need a button that takes you to a custom url based on the user session


router.get('/profile/:username', async (req, res) => {
    try {
        const loggedIn = req.session.loggedIn;
        const loggedInUser = req.session.userid;
        const requestUser = req.params.username;
        const selectUser = await User.findOne({ where: { username: requestUser } })
        console.log(selectUser)
        console.log(requestUser)
        console.log(loggedInUser)
        res.json(selectUser)
        if (selectUser.username === loggedInUser) {
            res.send('profile-login')
        } else {
            console.log('it got to not login')
            res.send('profile-not-login')
>>>>>>> a23a1a2e239ffce2525decc91b643322d59ee028
        }

        if (user.dataValues.id === req.session.userid) {
            res.redirect('/profile');
        }

        const data = user.dataValues;
        console.log(data);
        res.render('profile', {
            data,
            platforms: false, // change to actually send platforms
            favorites: false, //change to actually send favorites
            profile: true,
            ownPage: false
        });
    } catch (e) {
        console.error(e);
        res.status(500).json(e);
    }
});

<<<<<<< HEAD
// Endpoint: '/games'
// Renders the games page
=======


>>>>>>> a23a1a2e239ffce2525decc91b643322d59ee028
router.get('/games', async (req, res) => {
    res.render('games', {
        games: true,
    })
})



module.exports = router