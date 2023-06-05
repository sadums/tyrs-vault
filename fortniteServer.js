const express = require('express');
const expressHandlebars = require('express-handlebars');
const Fortnite = require('fortnite-api-io');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Initialize the Fortnite API wrapper to more easily display and access data
const fortniteAPI = new Fortnite({
  apiKey: process.env.FORTNITE_API_KEY,
});

const handlebars = expressHandlebars.create({});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

// Middleware to pass the Fortnite API wrapper to routes
app.use((req, res, next) => {
  req.fortniteAPI = fortniteAPI;
  next();
});

// Routes for home and profile pages
app.get('/', (req, res) => {
  res.render('fortnite');
});

app.get('/profile/:username', async (req, res) => {
  const { username } = req.params;

  try {
    // Get player stats
    const playerStats = await req.fortniteAPI.getStatsBR(username);

    // Get item shop information
    const itemShop = await req.fortniteAPI.getItemShop();

    // Get challenges information
    const challenges = await req.fortniteAPI.getChallenges();

    res.render('profile', {
      username,
      stats: playerStats.data,
      itemShop: itemShop.data,
      challenges: challenges.data,
    });
  } catch (error) {
    console.log(error);
    res.render('error', { error: 'Failed to retrieve player data' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});