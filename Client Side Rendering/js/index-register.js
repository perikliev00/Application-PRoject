import { register } from "./authentication.js";
let registerForm=document.querySelectorAll('form')[0];
registerForm.addEventListener('submit',(event) => {
    register(event, 'login.html');
});