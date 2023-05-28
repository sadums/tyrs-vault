const router = require('express').Router();
// TODO: import required models

// TODO: create required routes

//For Handlebars if logged in on load 
const User = require('../models/User');

router.get('/', async (req, res) => {
    try{

    const userData = await User.findAll().catch((err) => {
        res.json(err);
    });
    const users = userData.map((user) => user.get({ plain: true }));

    res.render('home', {
        home: true,
        loggedIn: req.session.loggedIn,
        users
    });

    }catch(e){
        console.error(e);
        res.status(500).json(e);
    }
});



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

router.get('/friends', async (req, res) => {
    try{
        if(!req.session.loggedIn){
            res.redirect('/');
            return;
        }

        res.render('friends', {
            loggedIn: req.session.loggedIn,
            friends: true
        });
    }catch(e){
        console.error(e);
        res.status(500).json(e);
    }
});

// Renders the users profile
router.get('/profile', async (req, res) => {
    if(!req.session.loggedIn){
        res.redirect('/');
        return;
    }

    const user = await User.findByPk(req.session.userid);
    if(!user){
        res.status(404).json({ message : "Something went wrong, please try again"});
        return;
    }
    res.render('profile', {
        user: user.dataValues
    });
});

// Render a specific users profile
router.get('/profile/:id', async (req, res) => {
    const user = await User.findByPk(req.params.id);

    if(!user){
        res.status(404).json({ message : "Something went wrong, please try again"});
        return;
    }
    res.render('profile', {
        user: user.dataValues
    });
});

//Need a button that takes you to a custom url based on the user session
router.get('/profile/:username', async (req, res) => {
    try {
        const loggedIn = req.session.loggedIn;
        const loggedInUser = req.session.userid;
        const requestUser = req.params.username
        const selectUser = await User.findOne({ where: { username: requestUser}})
        if (selectUser.username === loggedInUser){
            res.render('profile-login', {
                selectUser
            })
        }else{
            res.render('profile-not-login', {
                selectUser
            })
        }
    }
    catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
});



module.exports = router