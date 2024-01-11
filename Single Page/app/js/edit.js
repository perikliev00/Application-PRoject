import { editData } from "./fetch.js";
import { deleteData } from "./fetch.js";
export function addButtons() {
    let container=document.createElement('div');
    let element = document.getElementById('replace');
    element=element.getElementsByClassName('preparation')[0];
    let firstButton = document.createElement('button');
    let secondButton = document.createElement('button');
    firstButton.textContent = 'Edit';
    secondButton.textContent = 'Delete';
    container.appendChild(firstButton);
    container.appendChild(secondButton);
    element.appendChild(container);
    container.style.display='inline-block';
    firstButton.style.marginRight='10px';
    container.style.position='relative';
    container.style.float='right';
    container.style.marginTop='40px';
    container.style.marginRight='20px'
    firstButton.style.width='100px';
    secondButton.style.width='100px';
    firstButton.style.height='50px';
    secondButton.style.height='50px';
    firstButton.style.fontSize='25px';
    secondButton.style.fontSize='25px';
    firstButton.style.cursor='pointer';
    secondButton.style.cursor='pointer';
    firstButton.style.border='2px solid black';
    secondButton.style.border='2px solid black';
    firstButton.setAttribute('id','first-button');
    secondButton.setAttribute('id','second-button');
}
export function appendItemCatalog(obj,item,i) {
    let myObj = obj[item];
    let container = document.getElementById('clone-container').cloneNode(true);
    container.removeAttribute('id', 'clone-container');
    container.classList.add('container');
    container.style.display = "flex";
    document.getElementsByTagName('main')[0].appendChild(container);
    let spans = document.getElementsByClassName('recipe-number');
    let imgs = document.getElementsByClassName('first-img')
    spans[i + 1].textContent = myObj.name;
    imgs[i + 1].setAttribute('src', myObj.img)
    let clone=document.getElementById('replace').cloneNode(true);
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
            let formSection=document.getElementsByTagName('section')[0];
            let form=document.getElementsByTagName('form')[0];
            document.getElementsByTagName('main')[0].style.display='none';
            formSection.style.display='flex';
            formSection.style.justifyContent='center';
            form.addEventListener('submit',async (evet)=> {
                event.preventDefault();
                let myData=new FormData(event.target);
                myData=Object.fromEntries(myData.entries());
                let ingredientArr=document.getElementsByClassName('larger')[0].value;
                let preperationArr=document.getElementsByClassName('larger')[1].value;
                ingredientArr=ingredientArr.split('\n');
                preperationArr=preperationArr.split('\n');
                myData.ingredients=ingredientArr;
                myData.steps=preperationArr;
                myData._id=myObj._id;
                await editData(myData._id,myData);
                window.location.href='after-login.html';
            }
            ) 
        })
        temp.getElementsByTagName('button')[1].addEventListener('click', async () => {
            let deleted = document.getElementsByClassName('delete')[0].cloneNode(true);
            (temp.getElementsByTagName('button')[1].parentElement).parentElement.parentElement.replaceWith(deleted);
            deleted.style.display = 'block';
            console.log(myObj._id);
            await deleteData(myObj._id);
        })
    })
    i++;
}
export async function appendItemHomePage(obj,i,objKeys) {
    let myObj = obj[objKeys[i]];
    let container = document.getElementById('clone-item').cloneNode(true);
    container.removeAttribute('id', 'clone-item');
    container.style.display = "flex";
    document.getElementsByTagName('div')[2].appendChild(container);
    // let spans = document.getElementsByClassName('text');
    // let imgs = document.getElementsByTagName('img')
    // spans[i].textContent = myObj.name;
    // imgs[i].setAttribute('src', myObj.img)
}