const attributes = ['Strength', 'Dexterity', 'Stamina', 'Charisma', 'Manipulation', 'Composure', 'Intelligence', 'Wits', 'Resolve'];
let attributeVals = [4, 3, 3, 3, 2, 2, 2, 2, 1];
let statBlock = {};
let strDom = document.querySelector('#str');
let dexDom = document.querySelector('#dex');
let stmDom = document.querySelector('#stm');
let chaDom = document.querySelector('#cha');
let mnpDom = document.querySelector('#mnp');
let cmpDom = document.querySelector('#cmp');
let intDom = document.querySelector('#int');
let witDom = document.querySelector('#wit');
let rsvDom = document.querySelector('#rsv');

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
    strDom.innerText = str;
    dexDom.innerText = dex;
    stmDom.innerText = stm;
    chaDom.innerText = cha;
    mnpDom.innerText = mnp;
    cmpDom.innerText = cmp;
    intDom.innerText = int;
    witDom.innerText = wit;
    rsvDom.innerText = rsv;
    resetGenerator();
}

document.querySelector('#create-character').addEventListener('click', function(e){
    e.preventDefault();
    createCharacter();
})

function saveStats(){
    const savedStats = document.createElement('p');
    savedStats.innerText = `STR: ${strDom.innerText}, DEX: ${dexDom.innerText}, STM: ${stmDom.innerText}, CHA: ${chaDom.innerText}, MNP: ${mnpDom.innerText}, CMP: ${cmpDom.innerText}, INT: ${intDom.innerText}, WIT: ${witDom.innerText}, RSV: ${rsvDom.innerText}`
    savedStats.classList.add('saved-stats');
    document.querySelector('#saved-sheets').append(savedStats);
}

document.querySelector('#save-character').addEventListener('click', function(e){
    e.preventDefault();
    saveStats();
})