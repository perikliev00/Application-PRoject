export async function showDetailsView(id) {
    [...document.querySelectorAll('section')].forEach(s=>s.style.diplay='none');

    const recpie=await getById(id);

    document.getElementById('details-view').style.display='block';

    displayRecipe(recipe);
}
async function getById(id) {
    const response= await fetch('http://localhost:3030/data/recipes/' + id);
    const recipe=await response.json();

    return recipe;
}
function displayRecipe(recipe) {
    document.getElementById('recipe-name').textContent= recipe.name;

    const ingrediantsFragment= document.createDocumentFragment();
    for(let item of recipe.ingrediants) {
        const element=document.createElement('li');
        element.textContent= item;
        ingrediantsFragment.appendChild(element);
    }
    document.getElementById('recipe-ingrediants').replaceChildren(ingrediantsFragment);

    const stepsFragment =document.createDocumentFragment();
    for(let item of recipe.steps) {
        const element =document.createElement('li');
        element.textContent=item;
        stepsFragment.appendChild(element);
    }
    document.getElementById('recipe-steps').replaceChildren(stepsFragment);
}