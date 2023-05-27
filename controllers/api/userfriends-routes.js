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

module.exports = router;