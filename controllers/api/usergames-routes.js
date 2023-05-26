const router = require('express').Router();
const UserGames = require('../../models/UserGames');

//sends all data in the usergames table
router.get('/', async (req, res) => {
    try {
      const response = await UserGames.findAll();
      res.status(200).json(response);
    } catch (error) {
      res.status(404).json(error);
    }
  });
  
  //sends the data of 1 usergames by id
  router.get('/:id', async (req, res) => {
    try {
      const response = await UserGames.findOne({
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