const getElement = function(className){
    return document.getElementsByClassName(className);
}

const gameListChildren = [getElement("gameCard1"),getElement("gameCard2"),getElement("gameCard3"),getElement("gameCard4"),getElement("gameCard5"),getElement("gameCard6"),getElement("gameCard7"),getElement("gameCard8"),getElement("gameCard9"),getElement("gameCard10"),getElement("gameCard11"),getElement("gameCard12"),getElement("gameCard13"),getElement("gameCard14"),getElement("gameCard15"),];


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
                image.setAttribute('style', 'width: 200px; height: 200px');
    
                const title = document.createElement('h2');
                title.textContent = data.results[i].name
    
                currentClone.appendChild(title);
                currentClone.appendChild(image);
            }
        }
    });
}

setCards();