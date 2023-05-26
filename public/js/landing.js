// For dynamic landing page 

// For typing animation 
// Created by mattboldt.com

var typed = new Typed('#welcomeText', {
    strings: ["Connect With Friends...", "Discover New Titles...", "Explore Game Stats...",],
    typeSpeed: 50,
    backSpeed: 20,
    loop: true,
    loopCount: Infinity,
    backDelay: 3000,
  });

// For Changing Background Img

var i = 0;

function rotateLandingImg() { setInterval(function() {
    if(i === 4) {
        i = 0;
        $('#main').attr("style", "background-image: url('../imgs/fortnite\ dark\ v2.jpg')");
    } else if (i == 1){
        $('#main').attr("style", "background-image: url('../imgs/steam\ lib\ dark\ v2.jpg')");
    } else if (i == 2) {
        $('#main').attr("style", "background-image: url('../imgs/call\ of\ duty\ dark.jpg')");
    } 
    i++;
}, 6500);
};

// For Mobile Flex

let checkView = function() {
    if(this.window.innerWidth <= 600) {
        $('#welcomeText').attr("style", "font-size: 40px;");
    } else {
        $('#welcomeText').attr("style", "font-size: 70px;");
    }
}



window.addEventListener('load', rotateLandingImg(), checkView());
window.addEventListener('resize', checkView);
