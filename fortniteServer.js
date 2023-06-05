const express = require('express');
const expressHandlebars = require('express-handlebars');
const { Client, Language } = require('fnapicom');
const dotenv = require('dotenv');

const app = express();
const port = process.env.PORT || 3000;

dotenv.config();

// Initialize the Fortnite API wrapper to more easily display and access data
const client = new Client({
    language: Language.English,
    apiKey: process.env.FORTNITE_API_KEY,
  });
  

const handlebars = expressHandlebars.create({});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

// Middleware to pass the Fortnite API wrapper to routes
app.use((req, res, next) => {
    req.fortniteAPI = client;
    next();
  });

// Routes for home and profile pages
app.get('/', (req, res) => {
  res.render('fortnite');
});

app.get('/profile/:username', async (req, res) => {
  const { username } = req.params;

  try {
    // Get player stats using wrapper
    const playerStats = await req.fortniteAPI.playerStats(username);

    // Get item shop information
    const itemShop = await req.fortniteAPI.itemShop();

    // Get challenges information
    const challenges = await req.fortniteAPI.challenges();

    res.render('profile', { username, playerStats, itemShop, challenges });
  } catch (error) {
    console.error('Error retrieving player stats:', error);
    res.status(500).send('Error retrieving player stats');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});