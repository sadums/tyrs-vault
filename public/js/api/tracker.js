// api key for tracker.gg 063fd825-6975-4516-b254-9b134ef3999f

// api key for rawg.io 629d855face647848a3ba4386e8de706
const chessButtonLol = document.querySelector('#chess-button')

chessButtonLol.addEventListener('click', function() {
    fetch('https://api.rawg.io/api/platforms?key=629d855face647848a3ba4386e8de706')
    .then((response) => {
        return response.json
    })
    .then((data) => {
        console.log(data);
        
    });
})