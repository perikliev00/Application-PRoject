let registerForm=document.querySelectorAll('form')[0];
registerForm.addEventListener('submit',async(event)=> {
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
    window.location.href="login.html";
    }
})