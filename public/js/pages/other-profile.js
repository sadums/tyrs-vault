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

    const friendPfp = document.createElement('img');
    friendPfp.setAttribute('src', pfpSource);
    friendPfp.setAttribute('style', 'width: 100px; height: 100px');

    const friendUsername = document.createElement('h4');
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

