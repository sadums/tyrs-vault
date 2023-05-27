const router = require('express').Router();
// TODO: import required models

// TODO: create required routes

router.get('/', (req, res) => {
    try{
        console.log(req.session.loggedIn)
        res.render('home', {
            loggedIn: req.session.loggedIn
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
    
        res.render('login');
    }catch(e){
        console.error(e);
        res.status(500).json(e);
    }
});

router.get('/friends', (req, res) => {
    try{
        if(req.session.loggedIn){
            res.render('friends');
            return;
        }

        res.redirect('/');
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