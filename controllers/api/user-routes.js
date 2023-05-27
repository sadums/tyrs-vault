const router = require('express').Router();
const User = require('../../models/User');
const Friend = require('../../models/Friend');
const bcrypt = require('bcrypt');
const sequelize = require('../../config/connection');

//sends all data in the users table
router.get('/', async (req, res) => {
    try {
      const response = await User.findAll({
        //we should include the users friends
        //include: [Friend]
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
  

router.post('/signup', async(req, res) => {
    try{
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
            req.session.userid = userData.dataValues.id
            res.status(200).json({ user: userData, message: "Log in successful"});
        });
    }catch(e){
        console.error(e);
        res.status(500).json(e);
    }
});
router.post('/logout', async(req, res) => {
    try{
        if(req.session.loggedIn){
            req.session.destroy(() => {
                res.status(200).end();
            });
        } else {
            res.status(404).end();
        }
    }catch(e){
        console.error(e);
        res.status(500).json(e);
    }
});

router.get('/add-friend/:username', async(req, res) => {
    try{
        const user = await User.findByPk(req.session.userid);
        if(!user){
            res.status(404).json({ message : "Something went wrong, please try again"});
            return;
        }

        const addedUser = await User.findOne({ where: { username: req.params.username}});
        if(!addedUser){
            res.status(404).json({ message : "No user found!"});
            return;
        }

        if(addedUser.dataValues.username == user.dataValues.username){
            res.status(400).json({ message : "You cannot add yourself as a friend."});
            return;
        }
        const friendship = await Friend.create({
            user_id1: user.dataValues.id,
            user_id2: addedUser.dataValues.id
        });

        if(!friendship){
            res.status(400).json({ message: "Failed to add friend"});
            return
        }

        res.status(200).json({
            friend: friendship,
            message: "Friend added successfully"
        })
    }catch(e){
        console.error(e);
        res.status(500).json(e)
    }
});

module.exports = router;