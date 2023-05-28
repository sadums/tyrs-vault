// // For rendering Friend data
// // Splide doesnt work with regular handlebars
  


if(window.location.pathname === '/') {

    function fetchUserData () {

    var friendData =  fetch('/api/user', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((response) => {
        return response.json()
    }).then((data) => {
        console.log(data);
    });

    var friendGames =  fetch('/api/game', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((response) => {
        return response.json()
    }).then((data) => {
        console.log(data);
    });


    fetchUserData();

    function friendCardAppend () {       
        let mainFriendSplide = document.querySelector('#friendDisplay');
        for(i=0; i<friendData.length; i++) {


        var friendSlide = document.createElement('li');
        friendSlide.classList.add('splide__slide');
        var friendDiv = document.createElement('div');
        friendDiv.classList.add('friendCard');
        var friendUsername = document.createElement('h2');
        var friendGamesCard = document.createElement('h3')
        mainfriendSplide.appendChild(friendSlide);
        friendSlide.appendChild(friendDiv);
        friendDiv.appendChild(friendUsername);
        friendUsername.append(friendGamesCard);
        friendUsername.innerHTML = friendData[i].username;

    };
};
friendCardAppend();
};
};
