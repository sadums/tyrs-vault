const router = require('express').Router();
// TODO: import required models

// TODO: create required routes

router.get('/login', (req, res) => {
    if(req.session.loggedIn){
        res.redirect('/');
        return
    }

    res.render('login')
});

module.exports = router