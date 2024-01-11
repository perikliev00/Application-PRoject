import { getData } from "./fetch.js";
import { appendItemHomePage } from "./edit.js";
async function loadLastRecipies() {
    let data=await getData();
    let keys = Object.keys(data);
    let obj = data[keys[1]];
    let objKeys = Object.keys(obj);
    for(let i=objKeys.length;i>objKeys.length-3;i--) {
        appendItemHomePage(obj,objKeys,i)
    }
}
loadLastRecipies();