

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
    chess: {
        icon: "fas fa-chess-knight fa-2x",
        placeholder: "Chess.com username"
    },
    fortnite: {
        icon: "fa-solid fa-person-rifle fa-2x",
        placeholder: "Fortnite username"
    },
}


const platformDropdown = document.getElementById('platformDropdown');
const dropdownValues = document.querySelector('input[name="platform"]');

const platformEditSections = document.getElementById('platformEdits');

const deletePlatform = function(event){
    fetch(`/api/user-profile/delete-platform`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            platform:
            username: 
        })
    })
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
    });
    if(event.target.parentElement.id != 'platformContainer'){
        event.target.parentElement.parentElement.remove();
    }else{
        event.target.parentElement.remove();
    }
}


platformDropdown.addEventListener('change', (event) => {
    const currentPlatform = dropdownValues.value;

    const platformContainer = document.createElement('div');
    platformContainer.setAttribute('class', 'six wide field platformContainer');
    platformContainer.setAttribute('id', 'platformContainer');

    const platformIcon = document.createElement("i");
    platformIcon.setAttribute('class', platformData[currentPlatform].icon);

    const platformInput = document.createElement('input');
    platformInput.setAttribute('type', 'text');
    platformInput.setAttribute('placeholder', platformData[currentPlatform].placeholder);


    const denyButton = document.createElement('button');
    denyButton.setAttribute('class', 'ui button red');
    denyButton.innerHTML = `<i class="fa-solid fa-xmark fa-lg" id=${currentPlatform}></i>`;
    denyButton.setAttribute('id', currentPlatform);
    denyButton.addEventListener('click', deletePlatform);

    platformContainer.appendChild(platformIcon);
    platformContainer.appendChild(platformInput);
    platformContainer.appendChild(denyButton);

    platformEditSections.appendChild(platformContainer);
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
