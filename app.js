const attributes = ['Strength', 'Dexterity', 'Stamina', 'Charisma', 'Manipulation', 'Composure', 'Intelligence', 'Wits', 'Resolve'];
let attributeVals = [4, 3, 3, 3, 2, 2, 2, 2, 1];
let statBlock = {};

function randomizeAttributeVal(){
    const currValIndex = Math.floor(Math.random()*(attributeVals.length));
    const currVal = attributeVals[currValIndex];
    attributeVals.splice(currValIndex, 1);
    return currVal;
}

//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/values Recalled how to use Object.values() here.

function assignAttributeVals(){
    for(attribute of attributes){
        let attributeVal = randomizeAttributeVal();
        statBlock[attribute] = attributeVal;
    }
    return statBlock;
}

function resetGenerator(){
    attributeVals = [4, 3, 3, 3, 2, 2, 2, 2, 1];
    statBlock = {};
}

function createCharacter(){
    let stats = assignAttributeVals();
    let str = stats['Strength'];
    let dex = stats['Dexterity'];
    let stm = stats['Stamina'];
    let cha = stats['Charisma'];
    let mnp = stats['Manipulation'];
    let cmp = stats['Composure'];
    let int = stats['Intelligence'];
    let wit = stats['Wits'];
    let rsv = stats['Resolve'];
    document.querySelector('#str').innerText = str;
    document.querySelector('#dex').innerText = dex;
    document.querySelector('#stm').innerText = stm;
    document.querySelector('#cha').innerText = cha;
    document.querySelector('#mnp').innerText = mnp;
    document.querySelector('#cmp').innerText = cmp;
    document.querySelector('#int').innerText = int;
    document.querySelector('#wit').innerText = wit;
    document.querySelector('#rsv').innerText = rsv;
    resetGenerator();
}

document.querySelector('#create-character').addEventListener('click', function(e){
    e.preventDefault();
    createCharacter();
})