

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



let addIconContainer;
let addIcon;



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


try {
    addIconContainer = document.getElementById("addIconContainer");
    addIcon = addIconContainer.children[0];
    checkFriend(addIcon.id);
} catch (e) { }

const pfpChange = async function (event) {
    const image = event.target.files[0];

    
}

const pfpInput = document.getElementById('imageInput');
pfpInput.addEventListener('change', (event) => {
    pfpChange(event);
});
