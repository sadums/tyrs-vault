const chessInput = document.querySelector('#chess-input')
const steamInput = document.querySelector('#steam-input')
const fortniteInput = document.querySelector('#fortnite-input')

const formSubmitButton = document.querySelector('#submit-form-button')


formSubmitButton.addEventListener('click', () => {
  if(steamInput.value !== ''){
    const steamid = steamInput.value
    const requestUrl = `http://localhost:3001/api/steam/user/${steamid}` //will have to change once its deployed

    fetch(requestUrl)
    .then((data) => data.json())
    .then((data => {
        console.log(data.response.players[0])
    }))
    .catch(err => console.log(err))
  }
  if(chessInput.value !== ''){
    const username = chessInput.value
    const requestUrl = `http://localhost:3001/api/chess/${username}` //will have to change once its deployed

    fetch(requestUrl)
    .then((data) => data.json())
    .then((data => {
        console.log(data)
    }))
    .catch(err => console.log(err))
  }
  if(fortniteInput.value.value !== ''){
    const account = fortniteInput.value
    const requestUrl = `http://localhost:3001/api/fortnite/${account}` //will have to change once its deployed

    fetch(requestUrl)
    .then((data) => data.json())
    .then((data => {
        console.log(data.data)
    }))
    .catch(err => console.log(err))
  }

})




//FILE UPLOAD
const imageUploadForm = document.getElementById('imageUploadForm');
        const imageInput = document.getElementById('imageInput');
        const preview = document.getElementById('preview');

        imageUploadForm.addEventListener('submit', (e) => {
          preview.innerHTML = ''
          e.preventDefault();
          const file = imageInput.files[0];
          if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
              const imageUrl = event.target.result;
              const imageElement = document.createElement('img');
              imageElement.src = imageUrl;
              preview.appendChild(imageElement);
            };
            reader.readAsDataURL(file);
          }
        });


