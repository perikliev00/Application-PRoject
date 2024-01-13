import { getData } from "./fetch.js";
import { appendItemHomePage } from "./edit.js";
async function loadLastRecipies() {
    let data=await getData();
    let keys = Object.keys(data);
    let obj = data[keys[1]];
    let objKeys = Object.keys(obj);
    objKeys.reverse();
    let i=0;
    for(let item of objKeys) {
        if(i>2) {
            break;
        }
        appendItemHomePage(obj,item,i)
    }
}
loadLastRecipies();