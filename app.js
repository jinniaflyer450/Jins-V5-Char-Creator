//This app randomly generates player characters or Storyteller player characters for Vampire: the Masquerade version 5.

/*The function that, given an array of dot values, chooses a random index within that array, takes the value at that index, 
removes the value at that index, and returns the value that was at that index.*/
function randomizeAttributeDots(dotsGroup){
    const currDotsIndex = Math.floor(Math.random()*(dotsGroup.length));
    const currDots = dotsGroup[currDotsIndex];
    dotsGroup.splice(currDotsIndex, 1);
    return currDots;
}

//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/values Recalled how to use Object.values() here.


/*The function that, given an array of dot values, an array of corresponding labels for those dot values, and a recipient object,
selects a random value in the array of dot values for each label in the array of labels and creates a key-value pair in the recipient
object with a key of the label and a value of the dot value. It returns the recipient object when complete.*/
function assignAttributeDots(dotsGroup, attributeGroup, block){
    for(let attribute of attributeGroup){
        let attributeDots = randomizeAttributeDots(dotsGroup);
        block[attribute] = attributeDots;
    }
    return block;
}

/*The function that, given a selected or randomized clan, returns an object with key-value pairs where each key is a clan discipline
and each value is the randomly-assigned number of dots a character has in that discipline.*/
function distributeClanDisciplines(clan, disBlock){
    let clanDisDots = null;
    if(clan === 'caitiff'){
        clanDisDots = [2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    }
    else if(clan === 'thin-blood'){
        clanDisDots = [0]
    }
    else{
        clanDisDots = [2, 1, 0];
    }
    assignAttributeDots(clanDisDots, clanDisciplines[clan], disBlock);
}

/*The function that capitalizes/title-cases a string.*/
function capitalizeString(string){
    let capitalizedString = '';
    for(let index = 0; index < string.length; index++){
        if(index === 0 || string[index - 1] === ' ' || string[index - 1] === '-'){
            capitalizedString += string[index].toUpperCase()
        }
        else{
            capitalizedString+= string[index]
        }
    }
    return capitalizedString;
}

/*The function that, given a selected or randomized clan, populates the object where each key is a discipline and each value is the number
of dots the character has in that discipline with the remaining disciplines after clan disciplines are accounted for.*/
function distributeRestDisciplines(disBlock){
    for(discipline of ['Thin-Blood Alchemy', ...allNormalDisciplines]){
        if(Object.keys(disBlock).includes(discipline)){
            continue;
        }
        else{
            disBlock[discipline] = 0;
        }
    }
}

//The function that resets the generator after each use so that it may be used again.
function resetGenerator(){
    character = null;
    randomClan.innerText = '';
    randomDist.innerText = '';
    randomGen.innerText = '';
}


//The function that shows a conflict in generation and clan status if it exists.
function generationConflictAlert(){
    alert('Thin-bloods are always of 14th gen or higher. Characters of 14th gen or higher are typically thin-bloods.');
    resetGenerator();
    return;
}


//The function that extracts the checked value from a list of DOM elements and returns it, accounting for random values.
function pickValueFromDom(domValues, staticValues){
    let usableDomValues = [...domValues];
    let possibleStorageVariable = null;
    let isRandom = null;
    for(item of usableDomValues){
        if(item.checked && item.value !== 'random'){
            possibleStorageVariable = item.value;
            isRandom = false;
        }
        else if(item.checked){
            possibleStorageVariable = staticValues[Math.floor(Math.random()*staticValues.length)];
            isRandom = true;
        }
        else{
            continue;
        }
    }
    return {possibleStorageVariable, isRandom}; 
}

/*The function that randomly generates a character's clan, generation, basic attributes, skills, and disciplines based on selected options
and displays them in the DOM.*/
function createCharacter(attributes){
    if(nameDom.value !==''){
        charName = nameDom.value;
    }
    else{
        charName = 'Character';
    }
    let possCharClanAndRandom = pickValueFromDom(document.getElementsByName('clan'), clanList);
    let charClan = possCharClanAndRandom['possibleStorageVariable'];
    let isRandomClan = possCharClanAndRandom['isRandom'];
    let possCharGenAndRandom = pickValueFromDom(document.getElementsByName('generation'), generations);
    let charGen = possCharGenAndRandom['possibleStorageVariable'];
    let isRandomGen = possCharGenAndRandom['isRandom'];
    if((charGen !== 'fourteenthEtc' && charClan === 'thin-blood') || (charGen === 'fourteenthEtc' && charClan !== 'thin-blood')){
        if(isRandomClan && isRandomGen && charGen === 'fourteenthEtc'){
            while(charGen === 'fourteenthEtc'){
                charGen = pickValueFromDom(document.getElementsByName('generation'), generations)['possibleStorageVariable'];
            }
        }
        else if(isRandomClan && isRandomGen){
            charGen = 'fourteenthEtc';
        }
        else if(isRandomClan && isRandomGen === false && charGen !== 'fourteenthEtc'){
            while(charClan === 'thin-blood'){
                charClan = pickValueFromDom(document.getElementsByName('clan'), clanList)['possibleStorageVariable'];
            }
        }
        else if(isRandomClan && isRandomGen === false){
            charClan = 'thin-blood';
        }
        else if(isRandomGen && isRandomClan === false && charClan === 'thin-blood'){
            charGen = 'fourteenthEtc';
        }
        else if(isRandomGen && isRandomClan === false){
            charGen = pickValueFromDom(document.getElementsByName('generation'), generations)['possibleStorageVariable'];
        }
        else{
            generationConflictAlert();
            return;
        }
    }
    if(isRandomClan){
        randomClan.innerText = `(picked ${charClan})`;
    }
    if(isRandomGen){
        randomGen.innerText = `(picked ${charGen})`;
    }
    let attributeDots = [4, 3, 3, 3, 2, 2, 2, 2, 1];
    let attrBlock = {};
    let skillBlock = {};
    let skillDots = [];
    let disBlock = {};
    distributeClanDisciplines(charClan, disBlock);
    distributeRestDisciplines(disBlock);
    assignAttributeDots(attributeDots, attributes, attrBlock);
    let distribution = null;
    let distDom = [...document.getElementsByName('distribution')]
    for(distOption of distDom){
        if(distOption.checked === true){
            distribution = distOption.value;
        }
        else{
            continue;
        }
    }
    if(distribution === 'specialist'){
        skillDots = [4, 3, 3, 3, 2, 2, 2, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    }
    else if(distribution === 'balanced'){
        skillDots = [3, 3, 3, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    }
    else if(distribution === 'jack'){
        skillDots = [3, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0];
    }
    else{
        let allDist = [[4, 3, 3, 3, 2, 2, 2, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [3, 3, 3, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [3, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0]]
        const currValIndex = Math.floor(Math.random()*(allDist.length))
        if(currValIndex === 0){
            distribution = 'specialist';
            randomDist.innerText = `(picked ${capitalizeString(distribution)})`;
            skillDots = allDist[0];
        }
        else if(currValIndex === 1){
            distribution = 'balanced';
            randomDist.innerText = `(picked ${capitalizeString(distribution)})`;
            skillDots = allDist[1];
        }
        else{
            distribution = 'jack'
            randomDist.innerText = '(picked Jack-of-all-Trades)';
            skillDots = allDist[2];
        }
    }
    assignAttributeDots(skillDots, skills, skillBlock);
    let character = new Character(charClan, charGen, attrBlock, skillBlock, disBlock, charName);
    const charAttr = character.attributes;
    const charSkills = character.skills;
    const charDis = character.disciplines;

    if(character.generation === 'fourteenthEtc'){
        character.bloodPotency = 0;
    }

    strDom.innerText = charAttr['Strength'];
    dexDom.innerText = charAttr['Dexterity'];
    stmDom.innerText = charAttr['Stamina'];
    chaDom.innerText = charAttr['Charisma'];
    mnpDom.innerText = charAttr['Manipulation'];
    cmpDom.innerText = charAttr['Composure'];
    intDom.innerText = charAttr['Intelligence'];
    witDom.innerText = charAttr['Wits'];
    rsvDom.innerText = charAttr['Resolve'];

    atDom.innerText = charSkills['Athletics'];
    akDom.innerText = charSkills['Animal Ken'];
    acDom.innerText = charSkills['Academics'];
    brDom.innerText = charSkills['Brawl'];
    eqDom.innerText = charSkills['Etiquette'];
    awDom.innerText = charSkills['Awareness'];
    crDom.innerText = charSkills['Craft'];
    isDom.innerText = charSkills['Insight'];
    fcDom.innerText = charSkills['Finance'];
    drDom.innerText = charSkills['Drive'];
    itDom.innerText = charSkills['Intimidation'];
    ivDom.innerText = charSkills['Investigation'];
    faDom.innerText = charSkills['Firearms'];
    ldDom.innerText = charSkills['Leadership'];
    mdDom.innerText = charSkills['Medicine'];
    lcDom.innerText = charSkills['Larceny'];
    pfDom.innerText = charSkills['Performance'];
    ocDom.innerText = charSkills['Occult'];
    mlDom.innerText = charSkills['Melee'];
    psDom.innerText = charSkills['Persuasion'];
    poDom.innerText = charSkills['Politics'];
    shDom.innerText = charSkills['Stealth'];
    swDom.innerText = charSkills['Streetwise'];
    scDom.innerText = charSkills['Science'];
    svDom.innerText = charSkills['Survival'];
    sbDom.innerText = charSkills['Subterfuge'];
    tcDom.innerText = charSkills['Technology'];

    animDom.innerText = charDis['Animalism'];
    auspDom.innerText = charDis['Auspex'];
    celeDom.innerText = charDis['Celerity'];
    domiDom.innerText = charDis['Dominate'];
    fortDom.innerText = charDis['Fortitude'];
    obfuDom.innerText = charDis['Obfuscate'];
    obliDom.innerText = charDis['Oblivion'];
    poteDom.innerText = charDis['Potence'];
    presDom.innerText = charDis['Presence'];
    protDom.innerText = charDis['Protean'];
    blooDom.innerText = charDis['Blood Sorcery'];
    thinAlchDom.innerText = charDis['Thin-Blood Alchemy'];

    return character;
}

//The function that runs every time a user presses the 'Go' button in the app.
document.querySelector('#create-character').addEventListener('click', function(e){
    e.preventDefault();
    resetGenerator();
    character = createCharacter(attributes);
})


//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys Was reminded of how to name pairs here.
/*The function that creates a div containing all relevant information for the character for later use and appends it to the DOM.*/
function saveStats(){
    const savedStats = document.createElement('div');
    const savedStatsName = document.createElement('h3');
    const savedStatsClanAndGen = document.createElement('h4')
    const savedStatsAttr = document.createElement('p');
    const savedStatsSkills = document.createElement('p');
    const savedStatsDisciplines = document.createElement('p');
    savedStatsName.innerText = `${character.name}: `
    if(character.generation === 'fourteenthEtc'){
        savedStatsClanAndGen.innerText = `Thin-Blood (Fourteenth, Fifteenth, or Sixteenth Generation)`
    }
    else{
        savedStatsClanAndGen.innerText = `${capitalizeString(character.generation)} Generation ${capitalizeString(character.clan)}`
    }
    savedStatsAttr.innerText = `Attributes: `
    savedStatsSkills.innerText = `Skills: `
    savedStatsDisciplines.innerText = `Disciplines: `
    for(let [key, value] of Object.entries(character.attributes)){
        savedStatsAttr.innerText += `${key} ${value} `
    }
    for(let [key, value] of Object.entries(character.skills)){
        if(value !== 0){
            savedStatsSkills.innerText += `${key} ${value} `
        }
        else{
            continue;
        }
    }
    for(let [key, value] of Object.entries(character.disciplines)){
        if(value !== 0){
            savedStatsDisciplines.innerText += `${key} ${value} `
        }
        else{
            continue;
        }
    }
    savedStatsSkills.innerText.length--;
    savedStatsAttr.innerText.length--;
    savedStatsDisciplines.innerText.length--;
    savedStats.classList.add('saved-stats');
    savedStats.append(savedStatsName);
    savedStats.append(savedStatsClanAndGen);
    savedStats.append(savedStatsAttr);
    savedStats.append(savedStatsSkills);
    savedStats.append(savedStatsDisciplines);
    document.querySelector('#saved-sheets').append(savedStats);
}

//The function that runs every time a user clicks the 'save' button in the app.
document.querySelector('#save-character').addEventListener('click', function(e){
    e.preventDefault();
    saveStats();
})