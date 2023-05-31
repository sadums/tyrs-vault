const path = require('path');
const express = require('express');
const cors = require('cors');

const session = require('express-session');
const expressHandlebars = require('express-handlebars');

const SequelizeStore = require('connect-session-sequelize')(session.Store);
const routes = require('./controllers');
const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

require('dotenv').config();
const axios = require('axios');
const { Client, Events, GatewayIntentBits } = require('discord.js');
const fs = require("fs");
// const { fnClient, Language } = require('fnapicom');

// const fnclient = new fnClient({
//   language: Language.English,
//   apiKey: 'API_KEY_FORTNITE',
// });

// fnclient.aesKeys()
//   .then(console.log);

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
    ],
});

client.once(Events.ClientReady, c => {
    console.log(c)
    console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.on(Events.MessageCreate, m => {
    if(m.author.bot === false){
    if (m.content === "--") {
        m.channel.send("Options: --news, --canBuy, name=")
    }
    if (m.content.indexOf("name=") !== -1) {
        let nameInputArr = m.content.split("*")
        const fortniteAPIkey = process.env.API_KEY_FORTNITE;
        let requestUrl = 'https://fortnite-api.com/v2/stats/br/v2/?' + nameInputArr[0]
        return fetch(requestUrl, {
            headers: {
                'x-api-key': fortniteAPIkey
            }
        })
            .then(response => response.json())
            .then(data => {
                if (data.data.stats.all[nameInputArr[1].toString()][nameInputArr[2].toString()] === undefined) {
                    m.channel.send("Invalid request, structure like this: name=yourFortniteUsername gamemode stat")
                    m.channel.send("Gamemodes: solo, duo, squad, ltm, overall")
                    m.channel.send("Stats: deaths, kd, kills, killsPerMatch, killsPerMin, matches, minutesPlayed, playersOutlived, score, scorePerMatch, scorePerMin, winRate, wins")
                } else {
                    m.channel.send((data.data.stats.all[nameInputArr[1]][nameInputArr[2]]).toString())
                }
            })
            .catch(error => {
                console.error(error)
                m.channel.send("Invalid request, structure like this: name=yourFortniteUsername gamemode stat")
                m.channel.send("Gamemodes: solo, duo, squad, ltm, overall")
                m.channel.send("Stats: deaths, kd, kills, killsPerMatch, killsPerMin, matches, minutesPlayed, playersOutlived, score, scorePerMatch, scorePerMin, winRate, wins")
            });
    }
    if (m.content.indexOf("--news") !== -1) {
        let requestUrl = 'https://fortnite-api.com/v2/news/br'
        let nameInputArr = m.content.split(" ")
        fetch(requestUrl)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                if (data.data.motds[nameInputArr[1] - 1] !== undefined) {
                    m.channel.send(data.data.motds[nameInputArr[1] - 1].title)
                    m.channel.send(data.data.motds[nameInputArr[1] - 1].image)
                    m.channel.send(data.data.motds[nameInputArr[1] - 1].body)
                } else {
                    m.channel.send("Enter what fortnite news you want to view, enter a number between 1-" + data.data.motds.length + " after --news")
                }
            })
            .catch(error => {
                console.error(error)
                m.channel.send("Enter what fortnite news you want to view, enter a number between 1-" + data.data.motds.length)
            });
    }
    if (m.content.indexOf("--canBuy") !== -1) {
        let requestUrl = 'https://fortnite-api.com/v2/shop/br'
        let nameInputArr = m.content.split(" ")
        let count = 0
        let itemList = []
        fetch(requestUrl)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                if (nameInputArr[1] !== undefined) {
                    for (let i = 0; i < data.data.featured.entries.length; i++) {
                        if (data.data.featured.entries[i].finalPrice < nameInputArr[1]) {
                            count++
                            itemList.push(data.data.featured.entries[i].items[0].name)
                        }
                    }
                    for (let i = 0; i < data.data.specialFeatured.entries.length; i++) {
                        if (data.data.specialFeatured.entries[i].finalPrice < nameInputArr[1]) {
                            count++
                            itemList.push(data.data.specialFeatured.entries[i].items[0].name)
                        }
                    }
                    m.channel.send("You can buy " + count + " items")
                } else {
                    m.channel.send("enter the amount of Vbucks you have after --canBuy")
                }
            })
            .catch(error => {
                console.error(error)
            });
    }
}
})

client.login(process.env.DISCORD_TOKEN);

const sessionInstance = {
    secret: 'zdMwutRaKNRGMemRwgUNaHIZv',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
      db: sequelize,
    }),
};

app.use(session(sessionInstance));

const handlebars = expressHandlebars.create({});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening on http://localhost:3001'));
});
