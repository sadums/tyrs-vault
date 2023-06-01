const sendFriendRequest = async function(event, username){
    event.target.setAttribute('class', 'fa-solid fa-check fa-3x');
    await fetch(`/api/userfriends/friend-request/${username}`,{
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



const addIconContainer = document.getElementById("addIconContainer");
const addIcon = addIconContainer.children[0];

const checkFriend = async function(username){
    await fetch(`/api/userfriends/check-request/${username}`)
    .then((response) => response.json())
    .then((data) => {
        console.log(username);
        console.log(data);
        switch(data.message){
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

checkFriend(addIcon.id);



