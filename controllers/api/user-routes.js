const router = require('express').Router();
const User = require('../../models/User');
const Friend = require('../../models/Friend');
const Game = require('../../models/Game');

/* ENDPOINT: "/api/user/" */
// How I fixed the "EagerLoadingError"
User.hasMany(Game, {
    foreignKey: 'user_id'
});
Game.belongsTo(User, {
    foreignKey: 'user_id'
});
//sends all data in the users table
// ENDPOINT: "/api/user/"
router.get('/', async (req, res) => {
    try {
        const response = await User.findAll({
            include: [Game]
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(404).json(error);
    }
});

//sends the data of 1 user by id
router.get('/:id', async (req, res) => {
    try {
        const response = await User.findOne({
            where: {
                id: req.params.id
            },
            //we should include the users friends
            //include: [Friend]
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(404).json(error);
    }
});

// Create a new user with signup
// ENDPOINT: "/api/user/signup"
router.post('/signup', async (req, res) => {
    try {
        const newUserData = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        });
        req.session.save(() => {
            req.session.loggedIn = true;
            req.session.userid = newUserData.dataValues.id
            res.status(200).json(newUserData);
        });
    } catch (e) {
        console.error(e);
        res.status(500).json(e);
    }
});

// login a user
// ENDPOINT: "/api/user/login"
router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({
            where: {
                email: req.body.email
            }
        });

        if (!userData) {
            res.status(400).json({ message: 'Incorrect email or password.' });
            return;
        }

        const password = await userData.checkPassword(req.body.password);

        if (!password) {
            res.status(400).json({ message: 'Incorrect email or password.' });
            return;
        }

        req.session.save(() => {
            req.session.loggedIn = true;
            req.session.userid = userData.dataValues.id
            res.status(200).json({ user: userData, message: "Log in successful" });
        });
    } catch (e) {
        console.error(e);
        res.status(500).json(e);
    }
});

// Logout a user
// ENDPOINT: "/api/user/logout"
router.post('/logout', async (req, res) => {
    try {
        if (req.session.loggedIn) {
            req.session.destroy(() => {
                res.status(200).end();
            });
        } else {
            res.status(404).end();
        }
    } catch (e) {
        console.error(e);
        res.status(500).json(e);
    }
});

module.exports = router;