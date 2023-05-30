const router = require('express').Router();
require('dotenv').config();
const axios = require('axios')


const apiKey = process.env.API_KEY_STEAM;



//gets all games 700,000 lines of code
router.get('/games', async(req, res) => {
    try {
        const response = await axios.get(`http://api.steampowered.com/ISteamApps/GetAppList/v0002/?key=${apiKey}&format=json&appids=10`);
    
        const originalData = response.data; 

        res.json(originalData)
    
  } catch (error) {
    console.error(error);
    res.status(500).send('Error pushing data.');
  }
});

//sends news based on the paramiters
router.get('/news', async(req, res) => {
    try {
        const response = await axios.get(`http://api.steampowered.com/ISteamNews/GetNewsForApp/v0002/?appid=440&count=5&maxlength=300&format=json`);
    
        const originalData = response.data; 

        res.json(originalData)
    
  } catch (error) {
    console.error(error);
    res.status(500).send('Error pushing data.');
  }
});

//example steam id
//76561197960435530

router.get('/user/:steamid', async(req, res) => {
    const steamid = req.params.steamid
    try {
        const response = await axios.get(`http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${apiKey}&steamids=${steamid}`);
    
        const originalData = response.data; 

        res.json(originalData)
    
  } catch (error) {
    console.error(error);
    res.status(500).send('Error pushing data.');
  }
});




module.exports = router;