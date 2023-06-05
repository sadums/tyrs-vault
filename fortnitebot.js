let nameInputArr = m.content.split("*");
const fortniteAPIkey = process.env.API_KEY_FORTNITE;
let requestUrl = 'https://fortnite-api.com/v2/stats/br/v2/?name=' + nameInputArr[0]; // Include 'name=' before the username
axios
    .get(requestUrl, {
        headers: {
            'x-api-key': fortniteAPIkey
        }
    })
    .then(response => response.data)
    .then(data => {
        if (data.data.stats.all[nameInputArr[1].toString()][nameInputArr[2].toString()] === undefined) {
            m.channel.send("Invalid request, structure should be like this: name*yourFortniteUsername*gamemode*stat");
            m.channel.send("Gamemodes: solo, duo, squad, ltm, overall");
            m.channel.send("Stats: deaths, kd, kills, killsPerMatch, killsPerMin, matches, minutesPlayed, playersOutlived, score, scorePerMatch, scorePerMin, winRate, wins");
        } else {
            m.channel.send(data.data.stats.all[nameInputArr[1]][nameInputArr[2]].toString());
        }
    })
    .catch(error => {
        console.error(error);
        m.channel.send("Invalid request, structure should be like this: name*yourFortniteUsername*gamemode*stat");
        m.channel.send("Gamemodes: solo, duo, squad, ltm, overall");
        m.channel.send("Stats: deaths, kd, kills, killsPerMatch, killsPerMin, matches, minutesPlayed, playersOutlived, score, scorePerMatch, scorePerMin, winRate, wins");
    });

if (m.content.indexOf("--news") !== -1) {
    let requestUrl = 'https://fortnite-api.com/v2/news/br';
    let nameInputArr = m.content.split(" ");
    axios
        .get(requestUrl)
        .then(response => response.data)
        .then(data => {
            if (data.data.motds[nameInputArr[1] - 1] !== undefined) {
                m.channel.send(data.data.motds[nameInputArr[1] - 1].title);
                m.channel.send(data.data.motds[nameInputArr[1] - 1].image);
                m.channel.send(data.data.motds[nameInputArr[1] - 1].body);
            } else {
                m.channel.send("Enter which Fortnite news you want to view. Provide a number between 1-" + data.data.motds.length + " after --news");
            }
        })
        .catch(error => {
            console.error(error);
            m.channel.send("Enter which Fortnite news you want to view. Provide a number between 1-" + data.data.motds.length);
        });
}

if (m.content.indexOf("--canBuy") !== -1) {
    let requestUrl = 'https://fortnite-api.com/v2/shop/br';
    let nameInputArr = m.content.split(" ");
    let count = 0;
    let itemList = [];
    axios
        .get(requestUrl)
        .then(response => response.data)
        .then(data => {
            if (nameInputArr[1] !== undefined) {
                for (let i = 0; i < data.data.featured.entries.length; i++) {
                    if (data.data.featured.entries[i].finalPrice < parseInt(nameInputArr[1])) {
                        count++;
                        itemList.push(data.data.featured.entries[i].items[0].name);
                    }
                }
                for (let i = 0; i < data.data.specialFeatured.entries.length; i++) {
                    if (data.data.specialFeatured.entries[i].finalPrice < parseInt(nameInputArr[1])) {
                        count++;
                        itemList.push(data.data.specialFeatured.entries[i].items[0].name);
                    }
                }
                m.channel.send("You can buy " + count + " items");
            } else {
                m.channel.send("Enter the amount of Vbucks you have after --canBuy");
            }
        })
        .catch(error => {
            console.error(error);
        });
}

client.login(process.env.DISCORD_TOKEN);

