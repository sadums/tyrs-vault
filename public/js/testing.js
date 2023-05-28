// require('dotenv').config();
// const fetch = require("node-fetch");
// const { Client, Events, GatewayIntentBits } = require('discord.js');

// const client = new Client({
//     intents: [
//         GatewayIntentBits.Guilds,
//         GatewayIntentBits.GuildMessages,
//         GatewayIntentBits.MessageContent,
//         GatewayIntentBits.GuildMembers,
//     ],
// });

// client.once(Events.ClientReady, c => {
//     console.log(c)
//     console.log(`Ready! Logged in as ${c.user.tag}`);
// });

// client.on(Events.MessageCreate, m => {
//     if(m.author.bot === false){
//     if (m.content === "--") {
//         m.channel.send("Options: --news, --canBuy, name=")
//     }
//     if (m.content.indexOf("name=") !== -1) {
//         let nameInputArr = m.content.split("*")
//         const fortniteAPIkey = '41a7a00b-2a00-470f-8beb-6452a1cc3376'
//         let requestUrl = 'https://fortnite-api.com/v2/stats/br/v2/?' + nameInputArr[0]
//         return fetch(requestUrl, {
//             headers: {
//                 'x-api-key': fortniteAPIkey
//             }
//         })
//             .then(response => response.json())
//             .then(data => {
//                 if (data.data.stats.all[nameInputArr[1].toString()][nameInputArr[2].toString()] === undefined) {
//                     m.channel.send("Invalid request, structure like this: name=yourFortniteUsername gamemode stat")
//                     m.channel.send("Gamemodes: solo, duo, squad, ltm, overall")
//                     m.channel.send("Stats: deaths, kd, kills, killsPerMatch, killsPerMin, matches, minutesPlayed, playersOutlived, score, scorePerMatch, scorePerMin, winRate, wins")
//                 } else {
//                     m.channel.send((data.data.stats.all[nameInputArr[1]][nameInputArr[2]]).toString())
//                 }
//             })
//             .catch(error => {
//                 console.error(error)
//                 m.channel.send("Invalid request, structure like this: name=yourFortniteUsername gamemode stat")
//                 m.channel.send("Gamemodes: solo, duo, squad, ltm, overall")
//                 m.channel.send("Stats: deaths, kd, kills, killsPerMatch, killsPerMin, matches, minutesPlayed, playersOutlived, score, scorePerMatch, scorePerMin, winRate, wins")
//             });
//     }
//     if (m.content.indexOf("--news") !== -1) {
//         let requestUrl = 'https://fortnite-api.com/v2/news/br'
//         let nameInputArr = m.content.split(" ")
//         fetch(requestUrl)
//             .then(function (response) {
//                 return response.json();
//             })
//             .then(function (data) {
//                 if (data.data.motds[nameInputArr[1] - 1] !== undefined) {
//                     m.channel.send(data.data.motds[nameInputArr[1] - 1].title)
//                     m.channel.send(data.data.motds[nameInputArr[1] - 1].image)
//                     m.channel.send(data.data.motds[nameInputArr[1] - 1].body)
//                 } else {
//                     m.channel.send("Enter what fortnite news you want to view, enter a number between 1-" + data.data.motds.length + " after --news")
//                 }
//             })
//             .catch(error => {
//                 console.error(error)
//                 m.channel.send("Enter what fortnite news you want to view, enter a number between 1-" + data.data.motds.length)
//             });
//     }
//     if (m.content.indexOf("--canBuy") !== -1) {
//         let requestUrl = 'https://fortnite-api.com/v2/shop/br'
//         let nameInputArr = m.content.split(" ")
//         let count = 0
//         let itemList = []
//         fetch(requestUrl)
//             .then(function (response) {
//                 return response.json();
//             })
//             .then(function (data) {
//                 if (nameInputArr[1] !== undefined) {
//                     for (let i = 0; i < data.data.featured.entries.length; i++) {
//                         if (data.data.featured.entries[i].finalPrice < nameInputArr[1]) {
//                             count++
//                             itemList.push(data.data.featured.entries[i].items[0].name)
//                         }
//                     }
//                     for (let i = 0; i < data.data.specialFeatured.entries.length; i++) {
//                         if (data.data.specialFeatured.entries[i].finalPrice < nameInputArr[1]) {
//                             count++
//                             itemList.push(data.data.specialFeatured.entries[i].items[0].name)
//                         }
//                     }
//                     m.channel.send("You can buy " + count + " items")
//                 } else {
//                     m.channel.send("enter the amount of Vbucks you have after --canBuy")
//                 }
//             })
//             .catch(error => {
//                 console.error(error)
//             });
//     }
// }
// })


// client.login('MTA5MTQzOTk4NDAwNDgzMzMwMA.GmOn4T.CtekA33bwjjdzc7h_3Ox0rd4o5e1N1CmuecRVo');


