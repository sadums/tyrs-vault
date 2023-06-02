require('dotenv').config();
const express = require('express');
const app = express();
const axios = require('axios');
const { Client, Events, GatewayIntentBits } = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
    ],
});

client.once(Events.ClientReady, () => {
    console.log(`Bot is ready!`);
});

app.use(express.static('public'));

app.get('/bot/stats', (req, res) => {
    const stats = {
        username: client.user.username,
        guilds: client.guilds.cache.size,
        members: client.guilds.cache.reduce((total, guild) => total + guild.memberCount, 0),
    };

    res.json(stats);
});

client.login(process.env.DISCORD_TOKEN);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
