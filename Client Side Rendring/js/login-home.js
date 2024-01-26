import { login } from "./authentication.js";
let loginForm=document.querySelectorAll('form')[0];
loginForm.addEventListener('submit',(event) => {
    login(event, 'after-login-home.html');
});