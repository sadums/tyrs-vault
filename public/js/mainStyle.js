const logoutButton = document.getElementById('logout');


const logout = async() => {
    const response = await fetch('/api/user/logout', {
        method: 'POST'
    });

    if(response.ok){
        document.location.replace('/login');
    }else{
        alert('Something went wrong, please try again');
    }
}

logoutButton.addEventListener('click', logout);


// const renderUserList = async() => {
//     const status = await fetch('/', {
//         method: 'GET'
//     });
//     if(status.ok) {
//         let users = document.querySelector('.userListItems');
//         users.classList.add("splide__slide");
//         console.log("SDFSDFDSFSDFsd");
//     }
// }

// window.addEventListener('load', renderUserList, console.log("Im reached"));

