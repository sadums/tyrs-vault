const router = require('express').Router();
// TODO: import required models

// TODO: create required routes

//For Handlebars if logged in on load 
const User = require('../models/User');
const UserFriends = require('../models/Friend');
const FriendRequest = require('../models/FriendRequest');
const Game = require('../models/Game')

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
      
      
      
          const data = []
      
          for(let i = 0; i < friends1.length; i++){
            let currentFriend = friends1[i];
      
            if(currentFriend.dataValues.user_id1 === req.session.userid){
              // the friend is user_id2
              const friend = await User.findByPk(currentFriend.dataValues.user_id2, {
                attributes: { exclude: ['password', 'email']}
              });
              data.push(friend.dataValues);
            }else{
              // the friend is user_id1
              const friend = await User.findByPk(currentFriend.dataValues.user_id1, {
                attributes: { exclude: ['password', 'email']}
              });
              data.push(friend.dataValues);
            }
          }
      
          for(let i = 0; i < friends2.length; i++){
            let currentFriend = friends2[i];
      
            if(currentFriend.dataValues.user_id1 === req.session.userid){
              // the friend is user_id2
              const friend = await User.findByPk(currentFriend.dataValues.user_id2, {
                attributes: { exclude: ['password', 'email']}
              });
              data.push(friend.dataValues);
            }else{
              // the friend is user_id1
              const friend = await User.findByPk(currentFriend.dataValues.user_id1, {
                attributes: { exclude: ['password', 'email']}
              });
              data.push(friend.dataValues);
            }
          }
          
        res.render('friends', {
            loggedIn: req.session.loggedIn,
            friends: true,
            data: data
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
    const loggedIn = req.session.loggedIn;
    // const loggedInUser = req.session.userid;
    // const requestUser = req.params.username;
    //res.send('profile-login')
    try {
        if (loggedIn){ //change the validation here because if loggedIn = ture then you can login to all profiles
            console.log(user.dataValues)
            res.render('profile-login', {
                user: user.dataValues
            })
            //res.json(user)
        }else{
            res.render('profile-not-login', {
                user
            })
        }
    }
    catch (err){
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
        const selectUser = await User.findOne({ where: { username: requestUser}})
        console.log(selectUser)
        console.log(requestUser)
        console.log(loggedInUser)
        res.json(selectUser)
        if (selectUser.username === loggedInUser){
            res.send('profile-login')
        }else{
            console.log('it got to not login')
            res.send('profile-not-login')
        }
    }
    catch (err) {
        console.log(err)
        res.status(500).json('err')
    }
});

router.get('/games', async (req, res) => {
    res.render('games', {
        games: true
    })
})



module.exports = router