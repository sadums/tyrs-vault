const friendsList = document.getElementById('friends-list');
const friendRequestList = document.getElementById('friends-request-list');
const friendRequestSendButton = document.getElementById('friend-search-button');
const friendRequestSearchText = document.getElementById('friend-search-text');

const createFriendRequestEl = function(id, name, pfpSrc){
    const friendRequestEl = document.createElement('div');
    friendRequestEl.setAttribute("class", "col-md-12");


    const cardElement = document.createElement('div');
    cardElement.setAttribute('class', 'card text-white bg-dark');
    cardElement.setAttribute('id', id);

    const cardBody = document.createElement('div');
    cardBody.setAttribute('class', 'card-body');
    cardBody.setAttribute('id', id);

    const pfp = document.createElement('img');
    pfp.setAttribute('class', 'card-img-top');
    pfp.setAttribute('style', 'width: 200px; height: 200px');
    pfp.setAttribute('alt', 'Profile');
    pfp.setAttribute('id', id);
    pfp.addEventListener('click', viewProfile);

    const title = document.createElement('h4');
    title.setAttribute('id', id);
    title.setAttribute('class', 'card-title');
    title.textContent = `Friend request from ${name}`

    const form = document.createElement('form');

    const acceptButton = document.createElement('button');
    acceptButton.textContent = "Accept";
    acceptButton.addEventListener('click', acceptFriendRequest);
    acceptButton.setAttribute('id', id);
    
    const deleteButton = document.createElement('button');
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener('click', deleteFriendRequest);
    deleteButton.setAttribute('id', id);

    form.appendChild(acceptButton);
    form.appendChild(deleteButton);

    cardBody.appendChild(pfp);
    cardBody.appendChild(title);
    cardBody.appendChild(form)


    cardElement.appendChild(cardBody);

    friendRequestEl.appendChild(cardElement);

    friendRequestList.appendChild(friendRequestEl);
}

const createFriendEl = function(id, name, pfpSrc){
    if(!pfpSrc){
        const random = Math.floor(Math.random() * 3)
        switch(random){
            case 0:
                pfpSrc = "https://p16.resso.me/img/tos-alisg-v-2102/5697a1925c104cfe990eaf89eb7ca8e5~c5_200x200.jpg"
                break;
            case 1:
                pfpSrc = "https://i.kym-cdn.com/photos/images/original/002/301/351/ecc.png";
                break;
            case 2:
                pfpSrc = "https://e0.pxfuel.com/wallpapers/251/27/desktop-wallpaper-giga-chad-ideas-chad-memes-muscle-men.jpg";
                break;         
        }
    }

    const friendEl = document.createElement('div');
    friendEl.setAttribute("class", "col-md-12");


    const cardElement = document.createElement('div');
    cardElement.setAttribute('class', 'card text-white bg-dark');
    cardElement.setAttribute('id', id);

    const cardBody = document.createElement('div');
    cardBody.setAttribute('class', 'card-body');
    cardBody.setAttribute('id', id);

    const pfp = document.createElement('img');
    pfp.setAttribute('class', 'card-img-top');
    pfp.setAttribute('style', 'width: 200px; height: 200px');
    pfp.setAttribute('alt', 'Profile');
    pfp.setAttribute('src', pfpSrc);
    pfp.setAttribute('id', id);
    pfp.addEventListener('click', viewProfile);

    const title = document.createElement('h4');
    title.setAttribute('class', 'card-title');
    title.textContent = name;
    title.setAttribute('id', id);

    const form = document.createElement('form');

    const removeFriendButton = document.createElement('button');
    removeFriendButton.setAttribute('id', id);
    removeFriendButton.textContent = "Remove Friend";
    removeFriendButton.addEventListener("click", removeFriend);

    form.appendChild(removeFriendButton);

    cardBody.appendChild(pfp);
    cardBody.appendChild(title);
    cardBody.appendChild(form);

    cardElement.appendChild(cardBody);

    friendEl.appendChild(cardElement);

    friendsList.appendChild(friendEl);
}

friendRequestSendButton.addEventListener('click', function(event){
    event.preventDefault();
    const getUsername = friendRequestSearchText.value;
    fetch(`/api/userfriends/friend-request/${getUsername}`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
    });
});


const deleteFriendRequest = async function(event){
    let id = event.target.id;
    console.log(id);
    await fetch(`/api/userfriends/delete-request/${id}`,{
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

const acceptFriendRequest = async function(event){
    let id = event.target.id;
    await fetch(`/api/userfriends/accept-friend/${id}`,{
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


const getFriendRequests = function(){
    fetch(`/api/userfriends/get-requests`)
    .then((response) => response.json())
    .then((data) => {
        data.forEach((request) => {
            let id = request.user.id
            let name = request.user.username
            createFriendRequestEl(id, name)
        });
    });
}

const getFriends = function(){
    fetch(`/api/userfriends/friends`)
    .then((response) => response.json())
    .then((data) => {
        data.forEach((friend) => {
            createFriendEl(friend.id, friend.username);
        })
    });
}

const removeFriend = function(event){
    let id = event.target.id;
    fetch(`/api/userfriends/remove-friend/${id}`,{
        method: "DELETE",
    })
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
    });
}

const viewProfile = function(event){
    let id = event.target.id;
    location.href = `/profile/${id}`;
}

getFriends();
getFriendRequests();