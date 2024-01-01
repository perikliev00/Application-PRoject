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