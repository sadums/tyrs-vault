

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



// Profile picture code
let pfpForm = document.getElementById('imageUploadForm');
const pfp = document.getElementById('profilePicture');
const pfpInput = document.getElementById('imageInput');
pfpInput.addEventListener('change', (event) => {
    pfp.src = URL.createObjectURL(event.target.files[0]);
});

pfpForm.addEventListener('submit', function(event){
    event.preventDefault();
    fetch(`/api/user-profile/edit-picture`, {
        method: "POST",
        body: new FormData(pfpForm)
    })
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
    });
})






// Description code
const descriptionText = document.getElementById('descriptionTextArea');

const submitDescription = function(description){
    fetch(`/api/user-profile/edit-description`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({description: description })
    })
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
    });
}

// Username code
const usernameText = document.getElementById('usernameText');

const submitUsername = function(username){
    fetch(`/api/user-profile/edit-username`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({username: username })
    })
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
    });
}

// Platform code

// const platformData = {
//     xbox: ,
//     fortnite: ,

// }


const platformDropdown = document.getElementById('platformDropdown');
const dropdownValues = document.querySelector('input[name="platform"]');

platformDropdown.addEventListener('change', (event) => {
    console.log(dropdownValues.value);
});

// Save profile changes
const submitFormButton = document.getElementById("submit-form-button");

const submitChanges = function (event) {
    event.preventDefault();
    submitUsername(usernameText.value);
    submitDescription(descriptionText.value);
    pfpForm.requestSubmit();
    location.reload();
}


submitFormButton.addEventListener('click', (event) => {
    submitChanges(event);
});
