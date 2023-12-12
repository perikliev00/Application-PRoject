let form=document.getElementsByTagName('form')[0];
form.addEventListener('submit',async (evet)=> {
    evet.preventDefault();
    let data=new FormData(event.target);
    data=Object.fromEntries(data.entries());
    console.log(data);
    let ingredientArr=document.getElementsByClassName('larger')[0].value;
    let preperationArr=document.getElementsByClassName('larger')[1].value;
    ingredientArr=ingredientArr.split('\n');
    preperationArr=preperationArr.split('\n');
    data.ingredients=ingredientArr;
    data.preperation=preperationArr;
    const response=await fetch('http://localhost:3030/jsonstore/cookbook/recipes',{
        method:'post',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(data)
    })
    window.location.href="after-login.html";
}
) 

