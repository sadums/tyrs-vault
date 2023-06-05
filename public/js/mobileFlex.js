// For "friends page" flex (FIND FRIENDS)

let fancyHeader = document.querySelector("#headerMain")
let fancyHeaderLinks = document.querySelector("#headerLink")
let searchBarMain = document.querySelector("#searchBarMain");
let splide1 = document.querySelector("#splide1");
let splide1flex = document.querySelector("#splide1flex");

function resizeFriends() {
    if(this.window.innerWidth <= 750) {
        fancyHeader.className = "ui stackable secondary  menu";
        searchBarMain.setAttribute("style", "padding-top: 40%");
        splide1.setAttribute("data-splide", '{"type":"loop", "padding":"0rem", "perPage":"2", "perMove":"1", "focus":"0" }');
        new Splide(splide1flex, {
            focus: 'center',
        }).mount();
    } else if (this.window.innerWidth > 750) {
        fancyHeader.className = "ui secondary  menu";
        searchBarMain.setAttribute("style", "padding-top: 0%");
        splide1.setAttribute("data-splide", '{"type":"loop", "padding":"5rem", "perPage":"4", "perMove":"1", "focus":"0" }');
        new Splide(splide1, {
            focus: 'center',
        }).mount();
    }
    
}











let checkView = function() {
    if(window.location.pathname === '/friends') {
        resizeFriends();
    } else if (window.location.pathname === '/profile') {
        console.log("at profile");
    } else {

    }
}

window.addEventListener('load', checkView);
window.addEventListener('resize', checkView);

