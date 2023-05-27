const router = require('express').Router();
const UserFriends = require('../../models/Friend');

//sends all data in the userfriends table
router.get('/', async (req, res) => {
  try {
    const response = await UserFriends.findAll();
    res.status(200).json(response);
  } catch (error) {
    res.status(404).json(error);
  }
});
  
//sends the data of 1 useruriends by id
router.get('/:id', async (req, res) => {
  try {
    const response = await UserFriends.findOne({
      where: {
        id: req.params.id
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(404).json(error);
  }
});

// Send a friend request
// ENDPOINT: "/api/user/friend-request/:username"
router.post('/friend-request/:username', async(req, res) => {

});

// Add a friend
// ENDPOINT: "/api/user/add-friend/:username"
router.post('/add-friend/:username', async(req, res) => {
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

// Remove a friend
// ENDPOINT: "/api/user/remove-friend/:username"
router.post('/remove-friend/:username', async(req, res) => {
  
});

module.exports = router;