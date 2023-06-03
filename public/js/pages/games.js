const getElement = function(className){
    return document.getElementsByClassName(className);
}

const searchBar = document.getElementById('searchBar');
const searchButton = document.getElementById('searchButton');

const gameListChildren = [getElement("gameCard1"),getElement("gameCard2"),getElement("gameCard3"),getElement("gameCard4"),getElement("gameCard5"),getElement("gameCard6"),getElement("gameCard7"),getElement("gameCard8"),getElement("gameCard9"),getElement("gameCard10"),getElement("gameCard11"),getElement("gameCard12"),getElement("gameCard13"),getElement("gameCard14"),getElement("gameCard15"),];

const sendData = (favGame) => {
    fetch('/api/game/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ favGame }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Array added successfully:', data);
        })
        .catch((error) => {
          console.error('Error adding array:', error);
        });
}

console.log(gameListChildren);

const setCards = function(){
    fetch(`/api/rawg/games`)
    .then((response) => response.json())
    .then((data) => {
        console.log(data.results);
        for(let i = 0; i < gameListChildren.length; i++){
            const currentCard = gameListChildren[i];
            for(let j = 0; j < currentCard.length; j++){
                const currentClone = currentCard[j];
                const image = document.createElement('img');
                image.setAttribute('src', data.results[i].background_image);
    
                // image.setAttribute("style", "width: 100%;");

                const title = document.createElement('h2');
                title.textContent = data.results[i].name;

                const addButton = document.createElement('button');
                addButton.textContent = 'Add';
                addButton.className = "addGame";
                addButton.addEventListener('click', () => {
                    const favGame = {
                        title: title.textContent, 
                        image: image.src,
                    }
                    sendData(favGame)
                })
    
                currentClone.appendChild(addButton);
                currentClone.appendChild(title);
                currentClone.appendChild(image);
            }
       
        }
    });
}

setCards();

// var i = 0;

// function rotateLandingImg() { setInterval(function() {
//     if(i === 4) {
//         i = 0;
//         $('#gamesMain').attr("style", "background-image: url('../imgs/fortnite\ dark\ v2.jpg')");
//     } else if (i == 1){
//         $('#gamesMain').attr("style", "background-image: url('../imgs/steam\ lib\ dark\ v2.jpg')");
//     } else if (i == 2) {
//         $('#gamesMain').attr("style", "background-image: url('../imgs/call\ of\ duty\ dark.jpg')");
//     } 
//     i++;
// }, 6500);
// };

// window.addEventListener('load', rotateLandingImg());

const searchFriend = function(){
  const username = searchBar.value;
  location.href = `/profile/${username}`;
}

searchButton.addEventListener('click', searchFriend);


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