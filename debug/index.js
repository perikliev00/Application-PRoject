loadData();
const first=document.getElementsByClassName('container')[0];
const second=document.getElementsByClassName('container')[1];
const third=document.getElementsByClassName('container')[2];
async function loadData() {
    let response=await fetch('http://localhost:3030/jsonstore/cookbook');
    let data=await response.json();
    console.log(data);
    let keys=Object.keys(data);
    let obj=data[keys[0]];
    console.log(obj);
    let objKeys=Object.keys(obj);
    let i=0;
    let spans=document.getElementsByClassName('recipe-number');
    let imgs=document.getElementsByClassName('first-img')
    for(let item of objKeys) {
        let myObj=obj[item];
        console.log(myObj);
        spans[i].textContent=myObj.name;
        imgs[i].setAttribute('src',myObj.img)
        i++;
    }
}
first.addEventListener('click',changeItemsFirst)
second.addEventListener('click',changeItemsSecond);
third.addEventListener('click',changeItemsThird);
async function changeItemsFirst() {
    let replace=document.getElementsByClassName('replace')[0];
    let cloneReplace=replace.cloneNode(true);
    let response=await fetch('http://localhost:3030/jsonstore/cookbook');
    let data=await response.json();
    console.log(data);
    let keys=Object.keys(data);
    let obj=data[keys[1]];
    console.log(obj);
    let objKeys=Object.keys(obj);
    let myObj=obj[objKeys[0]];
    console.log(myObj);
    document.getElementById('replace-img').src=myObj.img; 
    first.replaceWith(cloneReplace);
    cloneReplace.style.display='flex';
    
}
async function changeItemsSecond() {
    let replace=document.getElementsByClassName('replace')[0];
    let cloneReplace=replace.cloneNode(true);
    second.replaceWith(cloneReplace);
    cloneReplace.style.display='flex';
    let response=await fetch('http://localhost:3030/jsonstore/cookbook');
    let data=await response.json();
    console.log(data);
    let keys=Object.keys(data);
    let obj=data[keys[1]];
    console.log(obj);
    let objKeys=Object.keys(obj);
    let i=0;
    for(let item of objKeys) {
        let myObj=obj[item];
        console.log(myObj);
        i++;
    }
}
async function changeItemsThird() {
    let replace=document.getElementsByClassName('replace')[0];
    let cloneReplace=replace.cloneNode(true);
    third.replaceWith(cloneReplace);
    cloneReplace.style.display='flex';
    let response=await fetch('http://localhost:3030/jsonstore/cookbook');
    let data=await response.json();
    console.log(data);
    let keys=Object.keys(data);
    let obj=data[keys[1]];
    console.log(obj);
    let objKeys=Object.keys(obj);
    let i=0;
    for(let item of objKeys) {
        let myObj=obj[item];
        console.log(myObj);
        i++;
    }
}
