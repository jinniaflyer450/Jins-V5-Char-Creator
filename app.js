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
    let clanDisDots = [2, 1, 0];
    assignAttributeDots(clanDisDots, clanDisciplines[clan], disBlock);
}

/*The function that, given a selected or randomized clan, populates the object where each key is a discipline and each value is the number
of dots the character has in that discipline with the remaining disciplines after clan disciplines are accounted for.*/
function distributeRestDisciplines(clan, disBlock){
    for(discipline of allNormalDisciplines){
        if(clanDisciplines[clan].includes(discipline)){
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
}

/*The function that randomly generates a character's clan, basic attributes, skills, and disciplines based on selected options.
and displays them in the DOM.*/
function createCharacter(attributes){
    const charName = nameDom.value;
    let clanDom = [...document.getElementsByName('clan')];
    let charClan = null;
    for(clan of clanDom){
        if(clan.checked === true && clan.value !== 'random'){
            charClan = clan.value;
        }
        else if(clan.checked === true){
            const currValIndex = Math.floor(Math.random()*(clanList.length))
            charClan = clanList[currValIndex];
            randomClan.innerText = charClan;
        }
        else{
            continue;
        }
    }
    let attributeDots = [4, 3, 3, 3, 2, 2, 2, 2, 1];
    let attrBlock = {};
    let skillBlock = {};
    let skillDots = [];
    let disBlock = {};
    distributeClanDisciplines(charClan, disBlock);
    distributeRestDisciplines(charClan, disBlock);
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
            randomDist.innerText = 'Specialist';
            skillDots = allDist[0];
        }
        else if(currValIndex === 1){
            distribution = 'balanced';
            randomDist.innerText = 'Balanced';
            skillDots = allDist[1];
        }
        else{
            distribution = 'jack'
            randomDist.innerText = 'Jack-of-all-Trades';
            skillDots = allDist[2];
        }
    }
    assignAttributeDots(skillDots, skills, skillBlock);
    let character = new Character(charName, charClan, attrBlock, skillBlock, disBlock);
    const charAttr = character.attributes;
    const charSkills = character.skills;
    const charDis = character.disciplines;

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
    const savedStatsAttr = document.createElement('p');
    const savedStatsSkills = document.createElement('p');
    const savedStatsDisciplines = document.createElement('p');
    savedStatsName.innerText = `${character.name}: `
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