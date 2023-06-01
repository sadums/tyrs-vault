const sendFriendRequest = async function(event, username){
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

addIcon.addEventListener('click', (event) => {
    sendFriendRequest(event, addIcon.id)
});

