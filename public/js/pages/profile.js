

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
});



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
const platformDropdown = document.getElementById('platformDropdown');
const platformDropdownValues = document.getElementById('platformDropdownValues')
const dropdownValues = document.querySelector('input[name="platform"]');

const platformEditSections = document.getElementById('platformEdits');
const currentPlatforms = {};
const submittedPlatforms = {};

fetch(`/api/user-profile/get-platforms`)
.then((response) => response.json())
.then((data) => {
    console.log(data)
    for(let i = 0; i < data.length; i++){
        currentPlatforms[data[i].platform_name] = data[i].platform_username;
        addPlatformEditElement(data[i].platform_name, data[i].platform_username);
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



const deletePlatformElement = function(event){
    console.log(event.target.getAttribute('class'));
    let targetID = event.target.id;
    if(event.target.getAttribute('class') == 'fa-solid fa-xmark fa-lg'){
        event.target.parentElement.parentElement.remove()
    }else{
        event.target.parentElement.remove()
    }
    delete submittedPlatforms[targetID];
}

const addPlatformEditElement = function(currentPlatform, defaultInput){
    const platformContainer = document.createElement('div');
    platformContainer.setAttribute('class', 'six wide field platformContainer');
    platformContainer.setAttribute('id', currentPlatform);

    const platformIcon = document.createElement("i");
    platformIcon.setAttribute('class', platformData[currentPlatform].icon);

    const platformInput = document.createElement('input');
    platformInput.setAttribute('type', 'text');
    platformInput.setAttribute('value', defaultInput);
    platformInput.setAttribute('placeholder', platformData[currentPlatform].placeholder);


    const denyButton = document.createElement('button');
    denyButton.setAttribute('class', 'ui button red');
    denyButton.innerHTML = `<i class="fa-solid fa-xmark fa-lg" id=${currentPlatform}></i>`;
    denyButton.setAttribute('id', currentPlatform);
    denyButton.addEventListener('click', (event) => { deletePlatformElement(event) });

    platformContainer.appendChild(platformIcon);
    platformContainer.appendChild(platformInput);
    platformContainer.appendChild(denyButton);

    platformEditSections.appendChild(platformContainer);
}

platformDropdown.addEventListener('change', (event) => {
    const currentPlatform = dropdownValues.value;
    addPlatformEditElement(currentPlatform, "");
});

const deletePlatform = function(username, platform){
    fetch(`/api/user-profile/delete-platform`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: username,
            platform: platform
        })
    })
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
    });
}
const addPlatform = function(username, platform){
    fetch(`/api/user-profile/add-platform`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: username,
            platform: platform
        })
    })
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
    });
}
const updatePlatform = function(username, platform){
    fetch(`/api/user-profile/edit-platform`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: username,
            platform: platform
        })
    })
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
    });
}



// Save profile changes
const submitFormButton = document.getElementById("submit-form-button");

const submitChanges = function (event) {
    event.preventDefault();
    for(let i = 0; i < platformEditSections.children.length; i++){
        submittedPlatforms[platformEditSections.children[i].id] = platformEditSections.children[i].children[1].value;
    }

    for(const key in submittedPlatforms){
        let currentPlatformTest = currentPlatforms[key];

        if(currentPlatformTest != undefined){
            if(currentPlatformTest != submittedPlatforms[key]){
                updatePlatform(submittedPlatforms[key], key);
            }
        }else{
            addPlatform(submittedPlatforms[key], key)
        }
    }
    for(const key in currentPlatforms){
        let submittedPlatformTest = submittedPlatforms[key];

        if(submittedPlatformTest == undefined){
            deletePlatform(currentPlatforms[key], key)
        }
    }


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
