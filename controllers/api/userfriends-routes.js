const router = require('express').Router();
const UserFriends = require('../../models/Friend');
const User = require('../../models/User')
const FriendRequest = require('../../models/FriendRequest');

// ENDPOINT: "/api/userfriends/"




//sends all data in the userfriends table
router.get('/', async (req, res) => {
  try {
    const response = await UserFriends.findAll();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Get all of a users friends
// ENDPOINT: "/api/userfriends/friends"
router.get('/friends', async (req, res) => {
  try{
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

    res.status(200).json(data);
  }catch(e){
    console.error(e);
    res.status(500).json(e);
  }
});

// Send a friend request
// ENDPOINT: "/api/userfriends/friend-request/:username"
router.post('/friend-request/:username', async(req, res) => {
  try {
    const user = await User.findByPk(req.session.userid);
    if(!user){
        res.status(404).json({ message : "Something went wrong, please try again"});
        return;
    }
    
    const requestedUser = await User.findOne({ where: { username: req.params.username}});
    if(!requestedUser){
        res.status(404).json({ message : "No user found!"});
        return;
    }
    
    const alreadyFriendRequest = await FriendRequest.findOne({
      where: {
        targetUserID: requestedUser.dataValues.id,
        sentUserID: user.dataValues.id
      }
    });

    if(alreadyFriendRequest){
      res.status(400).json({ message : "You have already sent this user a friend request"});
      return;
    }

    if(requestedUser.dataValues.username == user.dataValues.username){
      res.status(400).json({ message : "You cannot add yourself as a friend."});
      return;
    }
  
    const friendRequest = await FriendRequest.create({
      sentUserID: user.dataValues.id,
      targetUserID: requestedUser.dataValues.id,
    });
  
    if(!friendRequest){
      res.status(400).json({ message: "Failed to send friend request"});
      return
    }
  
    res.status(200).json({
        friendRequest: friendRequest,
        message: "Friend request sent successfully"
    });
  } catch (e) {
    console.error(e);
    res.status(500).json(e);
  }
});

// receive all of a users friend requests
// ENDPOINT: "/api/userfriends/get-requests/"
router.get('/get-requests', async(req, res) => {
  try {
    const friendRequests = await FriendRequest.findAll({
      where: {
        targetUserID: req.session.userid
      },
    });
    const data = []

    for(let i = 0; i < friendRequests.length; i++){
      let currentRequest = friendRequests[i];
      let sentUser = await User.findByPk(currentRequest.dataValues.sentUserID, {
        attributes: { exclude: ['password', 'email']}
      })
      data.push({
        request: currentRequest.dataValues,
        user: sentUser.dataValues
      });
    }

    if(!friendRequests){
      res.status(400).json({message: "Nobody wants to be your friend! LOL!"});
      return;
    }

    res.status(200).json(data);
  } catch (e) {
    console.error(e);
    res.status(500).json(e);
  }
});

// Delete a friend request
// ENDPOINT: "/api/userfriends/delete-request/:id"
router.delete('/delete-request/:username', async(req, res) => {
  try{
    const sentUser = await User.findOne({
      where: {
        username: req.params.username
      }
    });

    if(!sentUser){
      res.status(400).json({ message: "Could not find that user"});
    }

    const friendRequest = await FriendRequest.findOne({
      where: {
        sentUserID: sentUser.dataValues.id
      }
    });

    if(!friendRequest){
      res.status(404).json({message: "Could not find specified friend request"});
      return;
    }

    const deleted = await friendRequest.destroy();

    if(!deleted){
      res.status(400).json({message: "Failed to delete friend request"});
      return;
    }

    res.status(200).json({
      message: "Friend request has been deleted",
      deleted: deleted
    });

  }catch(e){
    console.error(e);
    res.status(500).json(e);
  }
});

// Accept a users friend request
// ENDPOINT: "/api/userfriends/accept-friend/:id"
router.post('/accept-friend/:username', async(req, res) => {
  try{
    const user = await User.findByPk(req.session.userid);
    if(!user){
        res.status(404).json({ message : "Something went wrong, please try again"});
        return;
    }

    const sentUser = await User.findOne({
      where: {
        username: req.params.username
      }
    });

    if(!sentUser){
      res.status(400).json({ message: "Could not find that user"});
    }
    
    const friendRequest = await FriendRequest.findOne({
      where: {
        sentUserID: sentUser.dataValues.id
      }
    });

    if(!friendRequest){
        res.status(404).json({ message : "Friend request not found"});
        return;
    }
    
    const addedUser = await User.findByPk(friendRequest.dataValues.sentUserID);
    if(!addedUser){
        res.status(404).json({ message : "User you are trying to add was not found!"});
        return;
    }

    await friendRequest.destroy();

    const friendship = await UserFriends.create({
      user_id1: user.dataValues.id,
      user_id2: addedUser.dataValues.id
    });

    res.status(200).json({
      friend: friendship,
      message: "Friend added successfully"
    });

  }catch(e){
      console.error(e);
      res.status(500).json(e)
  }
});

// Remove a friend
// ENDPOINT: "/api/userfriends/remove-friend/:username"
router.delete('/remove-friend/:id', async(req, res) => {
  try {
    const user = await User.findByPk(req.session.userid);
    if(!user){
      res.status(404).json({ message : "Something went wrong, please try again"});
      return;
    }
    
    const addedUser = await User.findByPk(req.params.id);

    const friendshipTest1 = await UserFriends.findOne({
      where: {
        user_id1: user.dataValues.id,
        user_id2: addedUser.dataValues.id
      }
    });
    const friendshipTest2 = await UserFriends.findOne({
      where: {
        user_id1: addedUser.dataValues.id,
        user_id2: user.dataValues.id
      }
    });

    if(!friendshipTest1 && !friendshipTest2){
      res.status(404).json({ message : "Friend you are trying to remove is already not your friend!"});
      return;
    }

    if(friendshipTest1){
      // 😔
      friendshipTest1.destroy();
      return;
    }
    if(friendshipTest2){
      // 😔
      friendshipTest2.destroy();
      return;
    }

    res.status(200).json({message: "Friend has been removed."});
  } catch (e) {
    console.error(e);
    res.status(500).json(e);
  }
});

// This route is literally a virus and makes half the other routes break
// //sends the data of 1 userfriends by id
// router.get('/:id', async (req, res) => {
//   try {
//     const response = await UserFriends.findOne({
//       where: {
//         id: req.params.id
//       },
//     });
//     res.status(200).json(response);
//   } catch (error) {
//     res.status(500).json(error);
//   }
// });

module.exports = router;