const loginHeader = document.getElementById('login-header');

const emailInput = document.getElementById('email');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirm-password');

const submitSignupButton = document.getElementById('submit-signup');
const submitLoginButton = document.getElementById('submit-login');
const switchSignupButton = document.getElementById('switch-signup');
const switchLoginButton = document.getElementById('switch-login');

const usernameDiv = document.getElementById('username-div');
const confirmPasswordDiv = document.getElementById('confirm-password-div');


const switchSignUp = (event) => {
    loginHeader.textContent = "Sign-up:"

    usernameDiv.setAttribute('style', 'display: block');
    confirmPasswordDiv.setAttribute('style', 'display: block');
    submitSignupButton.setAttribute('style', 'display: block');
    switchLoginButton.setAttribute('style', 'display: block');

    submitLoginButton.setAttribute('style', 'display: none');
    switchSignupButton.setAttribute('style', 'display: none');

    emailInput.value = '';
    passwordInput.value = '';
}

const switchLogin = (event) => {
    loginHeader.textContent = "Login:"

    usernameDiv.setAttribute('style', 'display: none');
    confirmPasswordDiv.setAttribute('style', 'display: none');
    submitSignupButton.setAttribute('style', 'display: none');
    switchLoginButton.setAttribute('style', 'display: none');

    submitLoginButton.setAttribute('style', 'display: block');
    switchSignupButton.setAttribute('style', 'display: block');

    emailInput.value = '';
    usernameInput.value = '';
    passwordInput.value = '';
    confirmPasswordInput.value = '';
}

const submitSignup = async (event) => {
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

const submitLogin = async(event) => {
    console.log(emailInput.value.trim());
    console.log(passwordInput.value.trim());
}

submitSignupButton.addEventListener('click', submitSignup);
submitLoginButton.addEventListener('click', submitLogin);
switchSignupButton.addEventListener('click', switchSignUp);
switchLoginButton.addEventListener('click', switchLogin);