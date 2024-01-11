import { addButtons } from './edit.js';
import { getData } from './fetch.js';
import { deleteElement } from './fetch.js';
import { editData } from './fetch.js';
import { appendItemCatalog } from './edit.js';
loadData();
addButtons();
const main = document.getElementsByTagName('main')[0];
async function loadData() {
    let data=await getData();
    let keys = Object.keys(data);
    let obj = data[keys[1]];
    let objKeys = Object.keys(obj);
    let i = 0;
    for (let item of objKeys) {
        appendItemCatalog(obj,item,i);
}
}