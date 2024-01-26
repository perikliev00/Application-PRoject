export async function login(event,link){
    event.preventDefault();
    let data=new FormData(event.target);
    data=Object.fromEntries(data.entries())
    console.log(data)
    if(data.email==''||data.password=='') {
        window.alert('Enter all fields');
        return;
    }
    const response=await fetch('http://localhost:3030/users/login',{
        method:'post',
        headers: {'Content-Type':'application/json' },
        body:JSON.stringify(data)
    });
    console.log(response.status);
    if(response.status=="200") {
    let token=response.accsessToken;
    localStorage.setItem('authToken',token)
    localStorage.setItem('email',data.email);
    console.log(sessionStorage);
    console.log(token);
    window.location.href=link;
    }
    else {
        window.alert('Incorect Email or Password');
    }
    return response;
}
export async function register(event,link) {
    event.preventDefault();
    let data=new FormData(event.target);
    data=Object.fromEntries(data.entries());
    console.log(data);
    let email=document.getElementById('email').value;
    let pass=document.getElementById('pass').value;
    let rePass=document.getElementById('re-pass').value;
    if(email==''||pass==''||rePass=='') {
        window.alert('Enter all fields');
        return
    }
    if(pass!=rePass) {
        window.alert('The password do not match');
        return
    }
    const response=await fetch('http://localhost:3030/users/register',{
        method:'post',
        headers: {'Content-Type':'application/json'},
        body:JSON.stringify(data)
    })
    if(response.status=="409") {
        window.alert("There is user with that username");
    } else {
    window.location.href=link;
    }
}
export async function logOut(link) {
    if(localStorage.length==0) {
        window.location.href=link;
    }
    let logOut=document.getElementById('log-out');
    logOut.addEventListener('click',()=> {
        localStorage.clear();
        window.location.href=link
    })
}