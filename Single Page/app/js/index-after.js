if(sessionStorage.length==0) {
    window.location.href="index.html";
}
let logOut=document.getElementById('log-out');
logOut.addEventListener('click',()=> {
    sessionStorage.clear();
    window.location.href="index.html"
})