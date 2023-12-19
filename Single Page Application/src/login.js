import {checkUserNav} from './auth.js';
import {showCatalogView} from './catalog.js';

document.getElementById('login-link').addEventListener('click',showLoginView);
document.getElementById('login-form').addEventListener('click',onLogin);

export function showLoginView() {
    [...document.querySelectorAll('section')].forEach(s => s.style.display='none');
    document.getElementById('login-form').addEventListener('submit',onLogin);

}

async function onLogin(event) {
    event.preventDefault();
    const formData= new FormData(event.target);
    const {email,password}= Object.fromEntries(formData);
    try {
        await onLogin(email,password);
        checkUserNav();
        showCatalogView();
    } catch(err) {
        alert(err.message);
    }
}
async function login(emil,passord) {
    const response= await fetch('http://localhost:3030/users/login', {
        method:'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({email,password})
    });
    if(response.ok!=true) {
        const error= await response.json();
        throw new Error(error.massage);
    }
    const data= await response.json();

    sessionStorage.setItem('user',data._id);
    sessionStorage.setItem('username',data.username);
    sessionStorage.setItem('accessToken', data.accessToken);
}