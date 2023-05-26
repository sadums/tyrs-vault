const loginHeader = document.getElementById('login-header');

const emailInput = document.getElementById('email');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirm-password');

const submitSignup = async (event) => {
    event.preventDefault();

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
    console.log(email);
    console.log(password);
    // event.preventDefault();

    // const email = emailInput.value.trim();
    // const password = passwordInput.value.trim();

    // if(email && password){
    //     const response = await fetch('/api/user/login', {
    //         method: 'POST',
    //         body: JSON.stringify({ email, password }),
    //         headers: { 'Content-Type': 'application/json' }
    //     });

    //     if(response.ok){
    //         document.location.replace('/');
    //     }else{
    //         alert('Login failed')
    //     }
    // }else{
    //     alert('Please fill in all fields');
    // }
}