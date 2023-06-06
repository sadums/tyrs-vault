const gameTitleInfo = document.getElementById('gameTitleInfo').textContent;

const gameCard = document.getElementById('gameCard');

const gameImage = document.getElementById('gameImage');
const gameTitle = document.getElementById('gameTitle');
const gameRating = document.getElementById('gameRating');
const gamePlatformContainer = document.getElementById('gamePlatforms');
const gameReleaseDate = document.getElementById('gameReleaseDate');
const gameTags = document.getElementById('gameTags');

const addGameButton = document.getElementById('addGameButton')




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


fetch(`/api/rawg/search/${gameTitleInfo}`)
.then(response => response.json())
.then(data => {
    const gameData = data.results[0];
    console.log(gameData);

    const imageSrc = gameData.short_screenshots[0].image;
    
    const selectedTags = [];
    let tagsCount = 0;
    let i = 0;
    const tagArray = gameData.tags
    while(tagsCount < 3){
        const currentTag = tagArray[i];
        if(currentTag.language == 'eng'){
            tagsCount++;
            selectedTags.push(currentTag.name);
        }
        i++;
    }

    const platforms = [];

    for(let i = 0; i < gameData.parent_platforms.length; i++){
        const currentPlatform = gameData.parent_platforms[i].platform;
        if(currentPlatform.name == 'PC' || currentPlatform.name == 'PlayStation' || currentPlatform.name == 'Xbox'){
            platforms.push(currentPlatform.name);
        }
    }

    const releaseDate = gameData.released;

    const title = gameData.name;

    const rating = gameData.metacritic;


    console.log(rating);
    console.log(title);
    console.log(imageSrc);
    console.log(selectedTags);
    console.log(platforms);
    console.log(releaseDate);
    
    gameRating.textContent = 'Game Rating: ' + rating;
    selectedTags.forEach((tag) => gameTags.textContent += tag + ' ');
    gameTitle.textContent = title;
    gameImage.setAttribute('src', imageSrc);

    let platformHtml = ''
    const platformsObject = {
        PlayStation: '<i class="fa-brands fa-playstation fa-lg"></i>',
        PC: '<i class="fa-brands fa-steam fa-lg"></i>',
        Xbox: '<i class="fa-brands fa-xbox fa-lg"></i>'
    }
    for(let i = 0; i< platforms.length; i++){
        if(platformsObject[platforms[i]]){
            platformHtml += platformsObject[platforms[i]];
        }
    }

    gamePlatformContainer.innerHTML = platformHtml;
    gameReleaseDate.textContent = 'Released on ' + releaseDate;

    gameCard.setAttribute('style', 'display: block');

    addGameButton.addEventListener('click', () => {
        const favGame = {
            title: title, 
            image: imageSrc,
        }
        sendData(favGame)
    })
});







