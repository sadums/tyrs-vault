const router = require('express').Router();
const Game = require('../../models/Game');

//sends all data in the game table
router.get('/', async (req, res) => {
    try {
      const response = await Game.findAll();
      res.status(200).json(response);
    } catch (error) {
      res.status(404).json(error);
    }
  });
  
  //sends the data of 1 game by id
  router.get('/:id', async (req, res) => {
    try {
      const response = await Game.findOne({
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