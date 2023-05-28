// For rendering Friend data
// Splide doesnt work with regular handlebars

let friendData = '';
let friendGames = '';  

if (window.location.pathname === '/') {  

let appendMain = function () {
    for(i=0; i < 15; i++) {

        let friendSplide = document.querySelector('#friendDisplay');
    
        let friendSlide = document.createElement('li');
        friendSlide.classList.add('splide__slide');
    
        let friendDiv = document.createElement('div');
        friendDiv.classList.add('friendCard');
    
        let friendUsername = document.createElement('h2');
        
        let friendGamesCard = document.createElement('h3');
    
    
        friendSplide.appendChild(friendSlide);
        friendSlide.appendChild(friendDiv);
        friendDiv.appendChild(friendUsername);
        friendUsername.append(friendGamesCard);


        //Temp append games for styling

        friendUsername.innerHTML = friendData[i].username;

        if (friendGames[i].title === undefined) {
            console.log("undefined game title");
        } else {
            friendGamesCard.innerHTML = friendGames[i].title;
        }
        
        };
        new Splide( '#splide1' ).mount();
};

const pullMain = async function () {

    friendData = await fetch('/api/user', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((response) => {
        return response.json()
    });

    
    friendGames = await fetch('/api/game', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((response) => {
        return response.json()
    });

    appendMain();

    console.log(friendData);
    console.log(friendGames);

};

pullMain();

};