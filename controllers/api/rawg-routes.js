const router = require('express').Router();
const axios = require('axios');

require('dotenv').config();

const apiKey = process.env.API_KEY_RAWG;

// ENDPOINT: "/api/rawg/"



// Receive a list of games
// ENDPOINT: "/api/rawg/games"
router.get('/games', async(req, res) => {
    try{
        const url = `https://api.rawg.io/api/games?key=${apiKey}"`;
        axios.get(url)
        .then((response) => {
            console.log(response.data);
            res.json(response.data);
        });
    }catch(e){
        res.status(500).json({
            message: "Something went wrong.",
            error: e
        });
    }
});

// Search for a specific game
// ENDPOINT: '/api/rawg/search/:game"
router.get('/search/:game', async(req, res) => {
    try{
        const url = `https://api.rawg.io/api/games?key=${apiKey}&search="${req.params.game}"`;
        axios.get(url)
        .then((response) => {
            console.log(response.data);
            res.json(response.data);
        });
    }catch(e){
        res.status(500).json({
            message: "Something went wrong.",
            error: e
        });
    }
});

module.exports = router;