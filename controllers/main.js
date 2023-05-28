const router = require('express').Router();
// TODO: import required models

// TODO: create required routes

//For Handlebars if logged in on load 
const User = require('../models/User');

// router.get('/',  (req, res) => {
//     try{

//         const users = User.findAll({});

//         res.render('home', {
//             // loggedIn: req.session.loggedIn,
//             users
//         });

//     }catch(e){
//         console.error(e);
//         res.status(500).json(e);
//     }
// });


router.get('/', async (req, res) => {
    const userData = await User.findAll().catch((err) => {
        res.json(err);
    });
    const users = userData.map((user) => user.get({ plain: true}));
    res.render('home', { users });
});



router.get('/login', (req, res) => {
    try{
        if(req.session.loggedIn){
            res.redirect('/');
            return;
        }
    
        res.render('login');
    }catch(e){
        console.error(e);
        res.status(500).json(e);
    }
});

router.get('/test', async(req, res) => {
    try{
        res.render('test',{
            testing: true
        });
    }catch(e){
        console.error(e);
        res.status(500).json(e);
    }
});

module.exports = router