/* LOGIN/SIGNUP MODAL LOGIC */ 
// Modal Title
const modalHeader = document.getElementById('modal-title');

// Form inputs
const emailInput = document.getElementById('email');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirm-password');

const usernameSection = document.getElementById('username-div');
const confirmPasswordSection = document.getElementById('confirm-password-div');

// Buttons
const signUpButton = document.getElementById('signUpBtn');
const loginButton = document.getElementById('loginBtn');
const submitButton = document.getElementById('submit-button');

// Check if user is in login or signup modal
let loginModal = true;


// Switch to sign up modal
const switchSignUp = (event) => {
    loginModal = false;

    modalHeader.textContent = "Sign up"

    usernameSection.setAttribute('style', 'display: block');
    confirmPasswordSection.setAttribute('style', 'display: block');

    emailInput.value = '';
    passwordInput.value = '';
}

// Switch to login modal
const switchLogin = (event) => {
    loginModal = true;

    modalHeader.textContent = "Login"

    usernameSection.setAttribute('style', 'display: none');
    confirmPasswordSection.setAttribute('style', 'display: none');

    emailInput.value = '';
    usernameInput.value = '';
    passwordInput.value = '';
    confirmPasswordInput.value = '';
}

// Submit sign up form
const submitSignup = async () => {

    const email = emailInput.value.trim()
    const username = usernameInput.value.trim()
    const password = passwordInput.value.trim()
    const confirmPassword = confirmPasswordInput.value.trim()

    if(password !== confirmPassword){
        alert('Passwords do not match!');
        return;
    }
    if(username && email && password){
        const response = await fetch('/api/user/signup', {
            method: 'POST',
            body: JSON.stringify({ email, username, password }),
            headers: { 'Content-Type': 'application/json' }
        });

        if(response.ok){
            document.location.replace('/');
        }else{
            alert('Sign up failed');
        }
        console.log(response);
    }else{
        alert('Please fill in all fields')
    }
}

// Submit login form
const submitLogin = async() => {

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    if(email && password){
        const response = await fetch('/api/user/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' }
        });

        if(response.ok){
            document.location.replace('/');
        }else{
            alert('Login failed')
        }
    }else{
        alert('Please fill in all fields');
    }
}

// Determine which form to submit
const submitForm = async(event) => {
    event.preventDefault();
    if(loginModal){
        submitLogin();
        return;
    }
    submitSignup();
}


// Event listeners
signUpButton.addEventListener('click', switchSignUp);
loginButton.addEventListener('click', switchLogin);
submitButton.addEventListener('click', submitForm);






/* FULL LOGIN PAGE */
// For dynamic landing page 

// For login/signup modal 


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
