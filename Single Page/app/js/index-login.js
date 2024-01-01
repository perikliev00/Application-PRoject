let loginForm=document.querySelectorAll('form')[0];
loginForm.addEventListener('submit',async(event)=> {
    event.preventDefault();
    let data=new FormData(event.target);
    data=Object.fromEntries(data.entries())
    console.log(data)
    if(data.email==''||data.passord=='') {
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
    console.log(sessionStorage);
    console.log(token);
    window.location.href="after-login.html";
    }
    else {
        window.alert('Incorect Email or Password');
    }
    return response;
})