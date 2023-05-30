const chessButton = document.querySelector('#chess-button')
const chessInput = document.querySelector('#chess-input')

const steamButton = document.querySelector('#steam-button')
const steamInput = document.querySelector('#steam-input')

const fortniteButton = document.querySelector('#fortnite-button')
const fortniteInput = document.querySelector('#fortnite-input')

chessButton.addEventListener('click', () =>{
    const username = chessInput.value
    const requestUrl = `http://localhost:3001/api/chess/${username}` //will have to change once its deployed

    fetch(requestUrl)
    .then((data) => data.json())
    .then((data => {
        console.log(data)
    }))
    .catch(err => console.log(err))
})

steamButton.addEventListener('click', () =>{
    const steamid = steamInput.value
    const requestUrl = `http://localhost:3001/api/steam/user/${steamid}` //will have to change once its deployed

    fetch(requestUrl)
    .then((data) => data.json())
    .then((data => {
        console.log(data.response.players[0])
    }))
    .catch(err => console.log(err))
})

fortniteButton.addEventListener('click', () =>{
    const account = fortniteInput.value
    const requestUrl = `http://localhost:3001/api/fortnite/${account}` //will have to change once its deployed

    fetch(requestUrl)
    .then((data) => data.json())
    .then((data => {
        console.log(data.data)
    }))
    .catch(err => console.log(err))
})