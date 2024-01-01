import { addButtons } from './edit.js';
loadData();
addButtons();
const main = document.getElementsByTagName('main')[0];
async function loadData() {
    let response = await fetch('http://localhost:3030/jsonstore/cookbook');
    let data = await response.json();
    let keys = Object.keys(data);
    let obj = data[keys[1]];
    let objKeys = Object.keys(obj);
    let i = 0;
    for (let item of objKeys) {
        let myObj = obj[item];
        console.log(myObj);
        let container = document.getElementById('clone-container').cloneNode(true);
        container.removeAttribute('id', 'clone-container')
        container.classList.add('container');
        container.style.display = "flex";
        main.appendChild(container);
        let spans = document.getElementsByClassName('recipe-number');
        let imgs = document.getElementsByClassName('first-img')
        spans[i + 1].textContent = myObj.name;
        imgs[i + 1].setAttribute('src', myObj.img)
        let clone=document.getElementById('replace').cloneNode(true);
        console.log(clone);
        container.addEventListener('click', () => {
            container.replaceWith(clone);
            clone.style.display = 'flex';
            clone.setAttribute('id', 'clone');
            let temp = document.getElementById('clone');
            clone.removeAttribute('id', 'clone');
            temp.classList.add('change');
            let img = temp.getElementsByClassName('img')[0];
            img.setAttribute('src', myObj.img);
            temp.getElementsByClassName('header-span')[0].textContent = myObj.name;
            let ingrediant = temp.getElementsByTagName('ul')[0];
            let preperation = temp.getElementsByTagName('ul')[1];
            for (let item of myObj.ingredients) {
                let li = document.createElement('li');
                li.textContent = item;
                ingrediant.appendChild(li)
            }
            for (let item of myObj.steps) {
                let li = document.createElement('li');
                li.textContent = item;
                preperation.appendChild(li);
            }
            temp.getElementsByTagName('button')[0].addEventListener('click', () => {
                console.log(myObj)
                let formSection=document.getElementsByTagName('section')[0];
                let form=document.getElementsByTagName('form')[0];
                main.style.display='none';
                formSection.style.display='flex';
                formSection.style.justifyContent='center';
                form.addEventListener('submit',async (evet)=> {
                    evet.preventDefault();
                    let myData=new FormData(event.target);
                    myData=Object.fromEntries(myData.entries());
                    let ingredientArr=document.getElementsByClassName('larger')[0].value;
                    let preperationArr=document.getElementsByClassName('larger')[1].value;
                    ingredientArr=ingredientArr.split('\n');
                    preperationArr=preperationArr.split('\n');
                    myData.ingredients=ingredientArr;
                    myData.steps=preperationArr;
                    myData._id=myObj._id;
                    const response=await fetch(`http://localhost:3030/jsonstore/cookbook/details/${myObj._id}`,{
                        method:'put',
                        headers:{'Content-Type':'application/json'},
                        body:JSON.stringify(myData)
                    })
                    window.location.href='after-login.html';
                }
                ) 
            })
            temp.getElementsByTagName('button')[1].addEventListener('click', async () => {
                let deleted = document.getElementsByClassName('delete')[0].cloneNode(true);
                (temp.getElementsByTagName('button')[1].parentElement).parentElement.parentElement.replaceWith(deleted);
                deleted.style.display = 'block';
                console.log(myObj._id);
                await fetch(`http://localhost:3030/jsonstore/cookbook/details/${myObj._id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error(`HTTP error! Status: ${response.status}`);
                        }
                        console.log('Item deleted successfully');
                    })
                    .catch(error => {
                        console.error('Fetch error:', error);
                    });
            })
        })
        i++;
    }
}
