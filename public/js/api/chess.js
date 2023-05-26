const chessInput = document.querySelector('#chess-input')
const chessButton = document.querySelector('#chess-button')

chessButton.addEventListener('click', () => {
    let chessUsername = chessInput.value
    let requestURL = `https://api.chess.com/pub/player/${chessUsername}`
    fetch(requestURL)
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      console.log(data)
    });
})