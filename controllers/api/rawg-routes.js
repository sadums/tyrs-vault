const router = require('express').Router();
const axios = require('axios');

require('dotenv').config();

// ENDPOINT: "/api/rawg/"

const apiKey = process.env.API_KEY_RAWG;


// Receive a list of games
// ENDPOINT: "/api/rawg/games"
router.get('/games', async(req, res) => {
    const url = `https://api.rawg.io/api/games?key=${apiKey}"`;
    axios.get(url)
    .then((response) => {
        console.log(response.data);
        res.json(response.data);
    });
});

// Search for a specific game
// ENDPOINT: '/api/rawg/search/:game"
router.get('/search/:game', async(req, res) => {
    const url = `https://api.rawg.io/api/games?key=${apiKey}&search="${req.params.game}"`;
    axios.get(url)
    .then((response) => {
        console.log(response.data);
        res.json(response.data);
    });
});

module.exports = router;