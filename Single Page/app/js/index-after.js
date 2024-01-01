if(localStorage.length==0) {
    window.location.href="index.html";
}
let logOut=document.getElementById('log-out');
logOut.addEventListener('click',()=> {
    localStorage.clear();
    window.location.href="index.html"
})