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







let mainFriendSplide = document.querySelector('#friendDisplay');


        function fetchUserData () {
    
        fetch('/api/user', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            return response.json()
        }).then((data) => {
            appendFriendData(data);
        });
        };
    
        function appendFriendData(data) {
            console.log(data);

            for(i=0; i<data.length; i++) {
            console.log(data[i]);

            let friendSlide = document.createElement("li");
            let friendDiv = document.createElement("div");
            let friendUsername = document.createElement("h2");
            
            friendSlide.className = "splide__slide";
            friendDiv.className = "friendCard";

            mainFriendSplide.appendChild(friendSlide);
            friendSlide.appendChild(friendDiv);
            friendDiv.appendChild(friendUsername);

            friendUsername.innerHTML = data[i].username;
            };

            let splide1 = document.querySelector("#splide1");
            new Splide( splide1, {
                focus: 'center',
               } ).mount();
        };


    fetchUserData();
    

  
    