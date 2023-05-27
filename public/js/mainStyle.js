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





// Handlebars.registerPartial('friendCard-details', function() {
//     for (i = 0; i < 10; i++) {

//     }
// });