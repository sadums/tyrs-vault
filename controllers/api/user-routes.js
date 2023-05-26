const router = require('express').Router();
const User = require('../../models/User');
const bcrypt = require('bcrypt');
const sequelize = require('../../config/connection');

router.post('/signup', async(req, res) => {
    try{
        const newUserData = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        });

        req.session.save(() => {
            req.session.loggedIn = true;

            res.status(200).json(newUserData);
        });
    }catch(e){
        console.error(e);
        res.status(500).json(e);
    }
});
router.post('/login', async(req, res) => {
    try{
        const userData = await User.findOne({
            where:{
                email: req.body.email
            }
        });

        if(!userData){
            res.status(400).json({message: 'Incorrect email or password.'});
            return;
        }

        const password = await userData.checkPassword(req.body.password);

        if(!password){
            res.status(400).json({message: 'Incorrect email or password.'});
            return;
        }

        req.session.save(() => {
            req.session.loggedIn = true;
            res.status(200).json({ user: userData, message: "Log in successful"});
        });
    }catch(e){
        console.error(e);
        res.status(500).json(e);
    }
});
router.post('/logout', async(req, res) => {
    try{
        // TODO: Add functionality to route
    }catch(e){
        console.error(e);
        res.status(500).json(e);
    }
});


module.exports = router;