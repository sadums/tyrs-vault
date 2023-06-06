const sendFriendRequest = async function (event, username) {
    event.target.setAttribute('class', 'fa-solid fa-check fa-3x');
    await fetch(`/api/userfriends/friend-request/${username}`, {
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




const checkFriend = async function (username) {
    await fetch(`/api/userfriends/check-request/${username}`)
    .then((response) => response.json())
    .then((data) => {
        switch (data.message) {
            case "You are already friends with this user":
                addIcon.setAttribute('class', 'fas fa-user-friends fa-3x');
                break;
            case "No request found":
                addIcon.setAttribute('class', 'fa-solid fa-user-plus fa-3x');
                addIcon.addEventListener('click', (event) => {
                    sendFriendRequest(event, addIcon.id)
                });
                break;
            case "Friend request found":
                addIcon.setAttribute('class', 'fa-solid fa-check fa-3x');
        }
    });
}


let addIconContainer;
let addIcon;

try {
    addIconContainer = document.getElementById("addIconContainer");
    addIcon = addIconContainer.children[0];
    checkFriend(addIcon.id);
} catch (e) { }




const userFriendsContainer = document.getElementById('friendsListContainer');
const username = document.getElementById('profileUsername').textContent;

const appendFriendDiv = function(username, pfpSource){
    const friendContainer = document.createElement('div');
    friendContainer.setAttribute('style', 'display: flex; color: white; align-items: center; gap: 15px; background-color: #101434; padding: 0 10px 0; border-radius: 5px;')

    const friendPfp = document.createElement('img');
    friendPfp.setAttribute('src', pfpSource);
    friendPfp.setAttribute('class', 'profilePicture');

    const friendUsername = document.createElement('h4');
    friendUsername.setAttribute('style', 'align-self: center; flex-basis: 70%; margin-bottom: 26px;')
    friendUsername.textContent = username;

    friendContainer.appendChild(friendPfp);
    friendContainer.appendChild(friendUsername);

    userFriendsContainer.append(friendContainer);
}

const getUserFriends = function(username){
    fetch(`/api/userfriends/friends/${username}`)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        for(let i = 0; i < data.length; i++){
            const currentFriend = data[i];
            appendFriendDiv(currentFriend.username, currentFriend.pfp);
        }
    });
}

getUserFriends(username);











// Platforms

const profilePlatformsSection = document.getElementById('profilePlatformsDiv')

fetch(`/api/user-profile/get-platforms/${username}`)
.then((response) => response.json())
.then((data) => {
    console.log(data)
    for(let i = 0; i < data.length; i++){
        addPlatformElement(data[i].platform_name, data[i].platform_username);
    }
});

const platformData = {
    xbox: {
        icon: "fa-brands fa-xbox fa-2x",
        placeholder: "X-Box username"
    },
    steam: {
        icon: "fa-brands fa-steam fa-2x",
        placeholder: "Steam username"
    },
    playstation: {
        icon: "fab fa-playstation fa-2x",
        placeholder: "PlayStation username"
    },
    chesscom: {
        icon: "fas fa-chess-knight fa-2x",
        placeholder: "Chess.com username"
    },
    fortnite: {
        icon: "fa-solid fa-person-rifle fa-2x",
        placeholder: "Fortnite username"
    },
}

const addPlatformElement = function(platform, username){
    const currentPlatformContainer = document.createElement('div');
    currentPlatformContainer.setAttribute("style", 'display: flex; color: white; align-items: center; gap: 15px')

    const currentPlatformIcon = document.createElement('i');
    currentPlatformIcon.setAttribute('class', platformData[platform].icon);

    const currentPlatformUsername = document.createElement('h3');
    currentPlatformUsername.setAttribute('style', "align-self: center; flex-basis: 70%; margin-bottom: 26px;");
    currentPlatformUsername.textContent = username;

    currentPlatformContainer.appendChild(currentPlatformIcon);
    currentPlatformContainer.appendChild(currentPlatformUsername);

    profilePlatformsSection.appendChild(currentPlatformContainer);
}