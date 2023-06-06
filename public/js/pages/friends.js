
const searchBar = document.getElementById('searchBar');
const searchButton = document.getElementById('searchButton');

const friendRequests = document.getElementById('friendRequests');

const acceptButtons = document.querySelectorAll('.accept-button');
const rejectButtons = document.querySelectorAll('.reject-button');

const friendRequestsContainer = document.getElementById('friendRequestContainer');
const mainFriendRequestContainer = document.getElementById('mainFriendRequestCard');

// acceptButtons.forEach(button => {
//   button.addEventListener('click', function(event) {
//     const username = this.closest('section').querySelector('.friendRequestTitle').textContent.trim();
//     acceptFriendRequest(username);
//   });
// });

// rejectButtons.forEach(button => {
//   button.addEventListener('click', function(event) {
//     const username = this.closest('section').querySelector('.friendRequestTitle').textContent.trim();
//     deleteFriendRequest(username);
//   });
// });

const deleteFriendRequest = async function (username) {
    document.getElementById(username).remove();
    await fetch(`/api/userfriends/delete-request/${username}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
        });
    if (friendRequestsContainer.children.length == 0) {
        mainFriendRequestContainer.setAttribute('style', 'display: none;');
    }
}

const acceptFriendRequest = async function (username) {
    document.getElementById(username).remove();
    await fetch(`/api/userfriends/accept-friend/${username}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
        });
    if (friendRequestsContainer.children.length == 0) {
        mainFriendRequestContainer.setAttribute('style', 'display: none;');
    }
}




// const createFriendRequest = function (username, pfpSrc) {
//     const friendRequestContainer = document.createElement('div');
//     friendRequestContainer.setAttribute('class', 'friendRequestCard');

//     const acceptButton = document.createElement('button');
//     const denyButton = document.createElement('button');
//     acceptButton.setAttribute('class', 'ui button green');
//     denyButton.setAttribute('class', 'ui button red');
//     acceptButton.innerHTML = `<i class="fa-solid fa-check fa-lg" id=${username}></i>`;
//     denyButton.innerHTML = `<i class="fa-solid fa-xmark fa-lg" id=${username}></i>`;
//     acceptButton.setAttribute('id', username);
//     denyButton.setAttribute('id', username);

//     const profilePictureLink = document.createElement('a');
//     const profilePicture = document.createElement('img');
//     profilePicture.setAttribute('src', pfpSrc);
//     profilePictureLink.setAttribute('href', `/profile/${username}`);
//     profilePicture.setAttribute('class', 'friendRequestProfilePicture');
//     profilePictureLink.appendChild(profilePicture);

//     const friendRequestTitle = document.createElement('div');
//     friendRequestTitle.setAttribute('class', 'friendRequestTitle');
//     friendRequestTitle.textContent = `Friend request from ${username}`;

//     //get these to work
//     acceptButton.addEventListener('click', acceptFriendRequest);
//     denyButton.addEventListener('click', deleteFriendRequest);

//     friendRequestContainer.appendChild(profilePictureLink);
//     friendRequestContainer.appendChild(friendRequestTitle);
//     friendRequestContainer.appendChild(acceptButton);
//     friendRequestContainer.appendChild(denyButton);

//     friendRequests.appendChild(friendRequestContainer)
// }



// const getFriendRequests = function () {
//     fetch(`/api/userfriends/get-requests`)
//         .then((response) => response.json())
//         .then((data) => {
//             console.log(data)
//             data.forEach((request) => {
//                 let name = request.user.username
//                 let pfp = request.user.pfp
//                 createFriendRequest(name, pfp)
//             });
//         });
// }

const getFriends = function () {
    fetch(`/api/userfriends/friends`)
        .then((response) => response.json())
        .then((data) => {
            data.forEach((friend) => {
                createFriendEl(friend.id, friend.username);
            })
        });
}

// const removeFriend = function (event) {
//     let id = event.target.id;
//     fetch(`/api/userfriends/remove-friend/${id}`, {
//         method: "DELETE",
//     })
//         .then((response) => response.json())
//         .then((data) => {
//             console.log(data);
//         });
// }








// getFriendRequests();









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


const generateRandomValues = (min, max) => {
    const availableValues = max - min;
    const randomValues = new Set();

    while (randomValues.size < 3 && randomValues.size < availableValues) {
        const randomValue = Math.floor(Math.random() * availableValues) + min;
        randomValues.add(randomValue);
    }

    return Array.from(randomValues);
};



function appendFriendData(data) {
    console.log(data);

    for (i = 0; i < data.length; i++) {
        console.log(data[i]);

        let friendSlide = document.createElement("li");
        let friendDiv = document.createElement("div");
        let friendHeader = document.createElement("div");
        let friendUsername = document.createElement("a");
        let friendPFP = document.createElement("img");
        let friendGameDiv = document.createElement("div");
        let friendGameTitle = document.createElement("h2");
        let friendGameList = document.createElement("div");
        let friendGameImg = document.createElement("img");
        let friendPlatformTitle = document.createElement("h2");
        let friendPlatformList = document.createElement("ul");

        friendSlide.className = "splide__slide";
        friendDiv.className = "friendCard";
        friendHeader.className = "friendCardHeader";
        friendPFP.className = "homePFP";
        friendGameImg.className = "homeGameImg";
        friendUsername.className = "newFriendLink";
        friendGameDiv.className = "friendGameDiv";
        friendPlatformList.className = "ui horizontal list friendPlatformList";
        friendGameList.className = "newFriendGames";

        mainFriendSplide.appendChild(friendSlide);
        friendSlide.appendChild(friendDiv);
        friendDiv.appendChild(friendHeader);
        friendHeader.appendChild(friendPFP);
        friendHeader.appendChild(friendUsername);
        friendDiv.appendChild(friendGameDiv);
        friendGameDiv.appendChild(friendPlatformTitle);
        friendGameDiv.appendChild(friendPlatformList);
        friendPlatformTitle.innerHTML = "Platforms:";
        friendGameDiv.appendChild(friendGameTitle);
        friendGameTitle.innerHTML = "Some Games:"
        friendGameDiv.appendChild(friendGameList);

        // friendGameDiv.appendChild(friendGameTitle);
        // friendGameDiv.appendChild(friendGameImg);

        if (data[i].pfp === null) {
            friendPFP.src = 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2F736x%2F85%2F9a%2Ff7%2F859af748d1eed0d67d5801a6df188a89.jpg&f=1&nofb=1&ipt=133308f7c0b60381e5aea6111f39b9eb5ba8077a2c3f6f247b5895fd1a4363e4&ipo=images';
        } else {
            friendPFP.src = data[i].pfp;
        }
        friendUsername.innerHTML = data[i].username;
        const index = i
        friendUsername.addEventListener('click', () => {
            let profLocation = data[index].username
            location.href = `/profile/${profLocation}`
        })

        let noGamesErr = document.createElement("h2");
        noGamesErr.innerHTML = "This user hasn't added any games!";

        if (data[i].userGames.length === 0) {
            friendGameList.appendChild(noGamesErr);
        }
        else if (data[i].userGames.length <= 3) {
            for (let j = 0; j < data[i].userGames.length; j++) {
                let newGameImgLink = data[i].userGames[j].image;
                let newGameImg = document.createElement("img");
                newGameImg.className = "newFriendGameImg";
                newGameImg.setAttribute("src", newGameImgLink);
                friendGameList.appendChild(newGameImg);
            }
        } else {
            const indexArray = generateRandomValues(0, data[i].userGames.length)
            for (let j = 0; j < indexArray.length; j++) {
                let newGameImgLink = data[i].userGames[indexArray[j]].image;
                let newGameImg = document.createElement("img");
                newGameImg.className = "newFriendGameImg";
                newGameImg.setAttribute("src", newGameImgLink);
                friendGameList.appendChild(newGameImg);
            }
        }


        if (data[i].platforms.length === 0) {
            console.log(data[i].platforms.length);
            //Works
            let noPlatforms = document.createElement("li");
            friendPlatformList.appendChild(noPlatforms);
            noPlatforms.textContent = "This User hasn't added any platforms!";
        } else {
            for (j = 0; j < data[i].platforms.length; j++) {
                if (data[i].platforms[j].platform_name === "steam") {
                    let steamPlatformDiv = document.createElement("div");
                    steamPlatformDiv.className = "item";
                    let steamIcon = document.createElement("i");
                    steamIcon.className = "ui large steam icon";
                    steamIcon.setAttribute("style", "color: white;");
                    let steamUser = document.createElement("div");
                    steamUser.setAttribute("style", "color: white; font-size: 15px;");
                    steamUser.className = "content";
                    steamUser.innerHTML = data[i].platforms[j].platform_username;

                    friendPlatformList.appendChild(steamPlatformDiv);
                    steamPlatformDiv.appendChild(steamIcon);
                    steamPlatformDiv.appendChild(steamUser);
                } else if (data[i].platforms[j].platform_name === "xbox") {
                    let steamPlatformDiv = document.createElement("div");
                    steamPlatformDiv.className = "item";
                    let steamIcon = document.createElement("i");
                    steamIcon.className = "ui large xbox icon";
                    steamIcon.setAttribute("style", "color: white;");
                    let steamUser = document.createElement("div");
                    steamUser.setAttribute("style", "color: white; font-size: 15px;");
                    steamUser.className = "content";
                    steamUser.innerHTML = data[i].platforms[j].platform_username;

                    friendPlatformList.appendChild(steamPlatformDiv);
                    steamPlatformDiv.appendChild(steamIcon);
                    steamPlatformDiv.appendChild(steamUser);
                } else if (data[i].platforms[j].platform_name === "playstation") {
                    let steamPlatformDiv = document.createElement("div");
                    steamPlatformDiv.className = "item";
                    let steamIcon = document.createElement("i");
                    steamIcon.className = "ui large playstation icon";
                    steamIcon.setAttribute("style", "color: white;");
                    let steamUser = document.createElement("div");
                    steamUser.setAttribute("style", "color: white; font-size: 15px;");
                    steamUser.className = "content";
                    steamUser.innerHTML = data[i].platforms[j].platform_username;

                    friendPlatformList.appendChild(steamPlatformDiv);
                    steamPlatformDiv.appendChild(steamIcon);
                    steamPlatformDiv.appendChild(steamUser);
                }
            }
        }

    };


    let splide1 = document.querySelector("#splide1");
    new Splide(splide1, {
        focus: 'center',
    }).mount();
};


fetchUserData();






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

const searchFriend = function () {
    const username = searchBar.value;
    location.href = `/profile/${username}`;
}

searchButton.addEventListener('click', searchFriend);
