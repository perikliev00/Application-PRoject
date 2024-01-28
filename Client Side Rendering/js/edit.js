import { editData } from "./fetch.js";
import { deleteData } from "./fetch.js";
import { html,render } from "../node_modules/lit-html/lit-html.js"
import { postDataComment } from "./fetch.js";
import { getData } from './fetch.js';
import { getDataComments } from "./fetch.js";

export function addButtons() {
    const element = document.getElementById('replace');
    const preparationElement = element.querySelector('.preparation');
  
    const template = html`
      <div style="display: inline-block; position: relative; float: right; margin-top: 40px; margin-right: 20px;">
        <button id="first-button" style="width: 100px; height: 50px; font-size: 25px; cursor: pointer; border: 2px solid black; margin-right: 10px;">Edit</button>
        <button id="second-button" style="width: 100px; height: 50px; font-size: 25px; cursor: pointer; border: 2px solid black;">Delete</button>
      </div>
    `;
    render(template,preparationElement);
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
}
export async function appendItemHomePage(obj,item,i) {
    let myObj = obj[item];
    let container = document.getElementById('clone-item').cloneNode(true);
    container.removeAttribute('id', 'clone-item');
    container.style.display = "flex";
    document.getElementsByTagName('div')[2].appendChild(container);
    container.getElementsByTagName('span')[0].textContent=myObj.name;
    container.getElementsByTagName('img')[0].src=myObj.img;
    i++
} 
export async function addComments(main) {
    function openForm(event) {
        let tagetElement=event.target;
        let parentContainer=(tagetElement.parentNode).parentNode;
        let elementId=parentContainer.id;
        if(localStorage.length===0) {
            alert('You have to log in to add  comments');
        }
        else {
            let main=document.getElementsByTagName('main')[0];
            main.style.display='none';
            let body=document.getElementsByTagName('body')[0];
        let formTameplate=html`
        <form id=add-comment-section @submit=${(event)=>postDataComment(event,elementId,`http://localhost:3030/jsonstore/cookbook/data/comments`)}>
                <div id="add-comment-after">
                <div id="add-comment-header">New Coment</div>
                <textarea name="content" id="" cols="30" rows="10" placeholder="Type Coment">
                </textarea>
                 <button @click=${()=>{main.style.display='flex';document.getElementById('add-comment-section').style.display='none',window.location.href='after-login.html'}} id="add-coment-button">Add </button>
            </div>
            </form>`
            render(formTameplate,body);
            if(document.getElementById('add-comment-section').style.display='none') {
                document.getElementById('add-comment-section').style.display='flex'
            }
        }
    }
    let containers = document.getElementsByClassName('container');
    const addCommentTemplate= html`
        <div id="add-comment">
            <button @click=${(event)=>openForm(event)} id="add-comment-button">Add Comment</button>
        </div>
    `;
    let coommentForTemplate=(name)=> html `
    <div id="comments-for">
                Coments for ${name}
            </div>
    `
    let commnetContainer= html `
    <div class='container-for-commnets'>
    </div>
    `
    let data=await getData();
    let keys = Object.keys(data);
    let obj = data[keys[1]];
    let objKeys = Object.keys(obj);
    for(let item of containers) {
        let containerForElements = document.createElement('div');
        main.appendChild(containerForElements);
        containerForElements.appendChild(containers[0]);
        containerForElements.classList.add('container-for-elements');
}
    let parentContainers=document.getElementsByClassName('container-for-elements');
    for(let i=0;i<objKeys.length;i++) {
        parentContainers[i].setAttribute('id',objKeys[i]);
        let recipeName=document.getElementsByClassName('container');
        recipeName=recipeName[i].getElementsByClassName('recipe-number')[0].textContent;
        let temeplate=html `
    ${addCommentTemplate}
    ${coommentForTemplate(recipeName)}
    ${commnetContainer}
    `
        render(temeplate,parentContainers[i]);

    }
    for(let i=0;i<parentContainers.length;i++) {
        let key=parentContainers[i].id;
        let containerComments=parentContainers[i].getElementsByClassName('container-for-commnets')[0];
        let dataComments=await getDataComments(`${key}`);
        let keys=Object.keys(dataComments);
        for(let x=0;x<keys.length;x++) {
            if(dataComments[keys[x]].commentId==parentContainers[i].id) {
                let commentsVissible=(document.getElementById('comments-hidden')).cloneNode(true);
                commentsVissible.removeAttribute('id','commnet-hidden');
                commentsVissible.setAttribute('id','comments');
                commentsVissible.getElementsByClassName('comments-content')[0].textContent=dataComments[keys[x]].content;
                commentsVissible.getElementsByClassName('comments-author')[0].textContent=dataComments[keys[x]].author;
                commentsVissible.style.display='block';
                containerComments.appendChild(commentsVissible);
                
            }
        }
    }
}