
const searchBar = document.getElementById('searchBar');
const searchButton = document.getElementById('searchButton');

const friendRequests = document.getElementById('friendRequests');


const deleteFriendRequest = async function (event) {
    let name = event.target.id;
    console.log(name);
    await fetch(`/api/userfriends/delete-request/${name}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
        });
}

const acceptFriendRequest = async function (event) {
    let name = event.target.id;
    await fetch(`/api/userfriends/accept-friend/${name}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
        });
}


const getFriendRequests = function () {
    fetch(`/api/userfriends/get-requests`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            data.forEach((request) => {
                let name = request.user.username
                let pfp = request.user.pfp
                createFriendRequest(name, pfp)
            });
        });
}

const getFriends = function () {
    fetch(`/api/userfriends/friends`)
        .then((response) => response.json())
        .then((data) => {
            data.forEach((friend) => {
                createFriendEl(friend.id, friend.username);
            })
        });
}

const removeFriend = function (event) {
    let id = event.target.id;
    fetch(`/api/userfriends/remove-friend/${id}`, {
        method: "DELETE",
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
        });
}



const createFriendRequest = function (username, pfpSrc) {
    const friendRequestContainer = document.createElement('div');
    friendRequestContainer.setAttribute('class', 'friendRequestCard');

    const acceptButton = document.createElement('button');
    const denyButton = document.createElement('button');
    acceptButton.setAttribute('class', 'ui button green');
    denyButton.setAttribute('class', 'ui button red');
    acceptButton.innerHTML = `<i class="fa-solid fa-check fa-lg" id=${username}></i>`;
    denyButton.innerHTML = `<i class="fa-solid fa-xmark fa-lg" id=${username}></i>`;
    acceptButton.setAttribute('id', username);
    denyButton.setAttribute('id', username);

    const profilePictureLink = document.createElement('a');
    const profilePicture = document.createElement('img');
    profilePicture.setAttribute('src', pfpSrc);
    profilePictureLink.setAttribute('href', `/profile/${username}`);
    profilePicture.setAttribute('class', 'friendRequestProfilePicture');
    profilePictureLink.appendChild(profilePicture);

    const friendRequestTitle = document.createElement('div');
    friendRequestTitle.setAttribute('class', 'friendRequestTitle');
    friendRequestTitle.textContent = `Friend request from ${username}`;


    acceptButton.addEventListener('click', acceptFriendRequest);
    denyButton.addEventListener('click', deleteFriendRequest);

    friendRequestContainer.appendChild(profilePictureLink);
    friendRequestContainer.appendChild(friendRequestTitle);
    friendRequestContainer.appendChild(acceptButton);
    friendRequestContainer.appendChild(denyButton);

    friendRequests.appendChild(friendRequestContainer)
}




getFriendRequests();

//All logout logic
const logoutButton = document.getElementById('logout');
const logout = async () => {
    const response = await fetch('/api/user/logout', {
        method: 'POST'
    });

    if (response.ok) {
        document.location.replace('/login');
    } else {
        alert('Something went wrong, please try again');
    }
}

logoutButton.addEventListener('click', logout);







let mainFriendSplide = document.querySelector('#friendDisplay');


function fetchUserData() {
    fetch('/api/user', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((response) => {
        return response.json()
    }).then((data) => {
        appendFriendData(data);
    });
};

function appendFriendData(data) {
    console.log(data);

    for (i = 0; i < data.length; i++) {
        console.log(data[i]);

        let friendSlide = document.createElement("li");
        let friendDiv = document.createElement("div");
        let friendHeader = document.createElement("div");
        let friendUsername = document.createElement("h2");
        let friendPFP = document.createElement("img");
        let friendGameDiv = document.createElement("div");
        let friendGameTitle = document.createElement("h3");
        let friendGameImg = document.createElement("img");

        friendSlide.className = "splide__slide";
        friendDiv.className = "friendCard";
        friendHeader.className = "friendCardHeader";
        friendPFP.className = "homePFP";
        friendGameImg.className = "homeGameImg";

        mainFriendSplide.appendChild(friendSlide);
        friendSlide.appendChild(friendDiv);
        friendDiv.appendChild(friendHeader);
        friendHeader.appendChild(friendPFP);
        friendHeader.appendChild(friendUsername);
        friendDiv.appendChild(friendGameDiv);
        friendGameDiv.appendChild(friendGameTitle);
        friendGameDiv.appendChild(friendGameImg);

        if (data[i].pfp === null) {
            friendPFP.src = 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2F736x%2F85%2F9a%2Ff7%2F859af748d1eed0d67d5801a6df188a89.jpg&f=1&nofb=1&ipt=133308f7c0b60381e5aea6111f39b9eb5ba8077a2c3f6f247b5895fd1a4363e4&ipo=images';
        } else {
            friendPFP.src = data[i].pfp;
        }
        friendUsername.innerHTML = data[i].username;


        if (data[i].userGames.length === null) {

        } else {
            if (data[i].userGames.length === 0) {

            } else {
                tempGameNumber = Math.floor(Math.random() * data[i].userGames.length);
                friendGameTitle.innerHTML = data[i].userGames[tempGameNumber].title;
                console.log(friendGameTitle.innerHTML = data[i].userGames[tempGameNumber].title);
            }
        }



    };

    let splide1 = document.querySelector("#splide1");
    new Splide(splide1, {
        focus: 'center',
    }).mount();
};


fetchUserData();


const searchFriend = function(){
    const username = searchBar.value;
    location.href = `/profile/${username}`;
}

searchButton.addEventListener('click', searchFriend);

