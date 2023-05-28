const friendsList = document.getElementById('friends-list');

const createFriendEl = function(id, name, pfpSrc){
    if(!pfpSrc){
        const random = Math.floor(Math.random() * 3)
        switch(random){
            case 0:
                pfpSrc = "https://p16.resso.me/img/tos-alisg-v-2102/5697a1925c104cfe990eaf89eb7ca8e5~c5_200x200.jpg"
                break;
            case 1:
                pfpSrc = "https://i.kym-cdn.com/photos/images/original/002/301/351/ecc.png";
                break;
            case 2:
                pfpSrc = "https://e0.pxfuel.com/wallpapers/251/27/desktop-wallpaper-giga-chad-ideas-chad-memes-muscle-men.jpg";
                break;
                    
        }
    }

    const friendEl = document.createElement('div');
    friendEl.setAttribute("class", "col-md-12");
    friendEl.setAttribute("id", id);
    friendEl.innerHTML = `
        <div class="card text-white bg-dark">
          <div class="card-body">
            <img class="card-img-top" src="${pfpSrc}" style="width: 200px; height: 200px" alt="Profile">
            <h4 class="card-title">${name}</h4>
          </div>
        </div>
    `;

    friendsList.appendChild(friendEl);
}



fetch('/api/userfriends/friend-request/<username>', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    }
})
.then((response) => response.json())
.then((data) => {
    console.log(data);
});




