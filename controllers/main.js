const router = require('express').Router();
// TODO: import required models

// TODO: create required routes

router.get('/', (req, res) => {
    try{
        console.log(req.session.loggedIn)
        res.render('home', {
            loggedIn: req.session.loggedIn,
            home: true
        });
    }catch(e){
        console.error(e);
        res.status(500).json(e);
    }
});

router.get('/login', (req, res) => {
    try{
        if(req.session.loggedIn){
            res.redirect('/');
            return;
        }
    
        res.render('login', {
            login: true
        });
    }catch(e){
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



module.exports = router