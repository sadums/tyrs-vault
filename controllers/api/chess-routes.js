const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/:username', (req, res) => {
  const chessUsername = req.params.username;
  const requestURL = `https://api.chess.com/pub/player/${chessUsername}`;

  axios.get(requestURL)
    .then(response => {
      res.json(response.data);
    })
    .catch(err => res.status(500).json(err));
});

module.exports = router;
