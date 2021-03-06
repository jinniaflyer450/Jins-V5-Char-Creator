//This app randomly generates player characters for Vampire: the Masquerade version 5.

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

//A function that assists in divvying up dots in advantages or flaws for predator types.
function chooseAdvantagesOrFlaws(optionsMenu, finalReceptacle){
    if(optionsMenu !== ''){
        let tally = Object.entries(optionsMenu)[0][1].length - 1;
        let nonSingleEntries = {};
        let choiceCount = {};
        let randomOption = null;
        let individualDotValue = null;
        for([advantage, dotValue] of Object.entries(optionsMenu)){
            if(dotValue.length === 1){
                finalReceptacle[advantage] = dotValue[0];
            }
            else{
                nonSingleEntries[advantage] = dotValue;
            }
        }
        if(Object.keys(nonSingleEntries).length !== 0){
            while(tally >= 0){
                randomOption = randomChoice(Object.keys(nonSingleEntries));
                individualDotValue = randomChoice(nonSingleEntries[randomOption]);
                if(tally === 0){
                    break;
                }
                else if(tally - individualDotValue < 0){
                    while(tally - individualDotValue < 0){
                        individualDotValue = randomChoice(optionsMenu[randomOption]);
                    }
                }
                if(Object.keys(choiceCount).includes(randomOption)){
                    choiceCount[randomOption]++
                }
                else{
                    choiceCount[randomOption] = 1;
                }
                if(['Fame', 'Herd', 'Resources'].includes(randomOption) && Object.keys(finalReceptacle).includes(randomOption)){
                    finalReceptacle[randomOption] += individualDotValue;
                    tally = tally - individualDotValue;
                }
                else if(['Fame', 'Herd', 'Resources'].includes(randomOption) && individualDotValue !== 0){
                    finalReceptacle[randomOption] = individualDotValue;
                    tally = tally - individualDotValue;
                }
                else if(individualDotValue === 0){
                    choiceCount[randomOption]--;
                    continue;
                }
                else{
                    finalReceptacle[`${randomOption} ${choiceCount[randomOption]}`] = individualDotValue;
                    tally = tally - individualDotValue;
                }
            }
        }
    }       
}

//The function that shows a conflict in predator type and clan if it exists.
function predTypeConflictAlert(){
    alert('Ventrue cannot have the Farmer or Bagger predator type.');
    resetGenerator();
    return;
}

/*The function that randomly generates a character's clan, generation, basic attributes, skills, and disciplines based on selected options
and displays them in the DOM.*/
function createCharacter(attributes){
    //Selects either the name given in the relevant input or names the character the placeholder "Character".
    if(nameDom.value !==''){
        charName = nameDom.value;
    }
    else{
        charName = 'Character';
    }
    //Selects a clan value and keeps a note of if it was generated randomly or not.
    let possCharClanAndRandom = pickValueFromDom(document.getElementsByName('clan'), clanList);
    //Stores the generated clan value and note of randomness in variables.
    let charClan = possCharClanAndRandom['possibleStorageVariable'];
    const isRandomClan = possCharClanAndRandom['isRandom'];
    //Selects a generation value and keeps a note of if it was generated randomly or not.
    let possCharGenAndRandom = pickValueFromDom(document.getElementsByName('generation'), generations);
    //Stores the generated generation value and note of randomness in variables.
    let charGen = possCharGenAndRandom['possibleStorageVariable'];
    const isRandomGen = possCharGenAndRandom['isRandom'];
    /*Accounts and modifies for possible generation and clan conflicts (thin-bloods are 14th+ gen and 14th+ gen are thin-bloods) unless 
    two conflicting options are both intentionally selected, in which case the app informs you of your mistake and stops character
    creation.*/
    if((charGen !== 'fourteenthEtc' && charClan === 'thin-blood') || (charGen === 'fourteenthEtc' && charClan !== 'thin-blood')){
        if(isRandomClan && isRandomGen && charGen === 'fourteenthEtc' || (isRandomGen && isRandomClan === false)){
            while(charGen === 'fourteenthEtc'){
                charGen = pickValueFromDom(document.getElementsByName('generation'), generations)['possibleStorageVariable'];
            }
        }
        else if(isRandomClan && isRandomGen || (isRandomGen && isRandomClan === false && charClan === 'thin-blood')){
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
        else{
            generationConflictAlert();
            return;
        }
    }
    //If clan or generation are randomly generated, shows the randomly generated value in the DOM.
    if(isRandomClan){
        randomClan.innerText = `(picked ${charClan})`;
    }
    if(isRandomGen){
        randomGen.innerText = `(picked ${charGen})`;
    }
    //Sets up needed global variables.
    let attributeDots = [4, 3, 3, 3, 2, 2, 2, 2, 1];
    let attrBlock = {};
    let skillBlock = {};
    let skillDots = [];
    let disBlock = {};
    //Distributes dots in disciplines.
    distributeClanDisciplines(charClan, disBlock);
    distributeRestDisciplines(disBlock);
    //Distributes attribute dots.
    assignAttributeDots(attributeDots, attributes, attrBlock);
    /*Retrieves selected or randomly-generated distribution, then selects skill dot pool based on that distribution 
    and updates selection in the DOM.*/
    let distributionAndRandom = pickValueFromDom(document.getElementsByName('distribution'), distributions);
    let distribution = distributionAndRandom['possibleStorageVariable'];
    let isRandomDistribution = distributionAndRandom['isRandom'];
    
    distributionList = [[4, 3, 3, 3, 2, 2, 2, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
    [3, 3, 3, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
    [3, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0]];

    if(distribution === 'specialist'){
        skillDots = distributionList[0]; 
    }
    else if(distribution === 'balanced'){
        skillDots = distributionList[1];
    }
    else{
        skillDots = distributionList[2];
    }
    if(isRandomDistribution && distribution === 'jack'){
        randomDist.innerText = 'picked Jack-of-all-Trades'
    }
    else if(isRandomDistribution){
        randomDist.innerText = `(picked ${capitalizeString(distribution)})`
    }
    /*Distributes skill dots*/
    assignAttributeDots(skillDots, skills, skillBlock);
    //Assigns predator type.
    charPred = capitalizeString(pickValueFromDom(document.getElementsByName('pred-type'), predTypes)['possibleStorageVariable']);
    isRandomPred = pickValueFromDom(document.getElementsByName('pred-type'), predTypes)['isRandom'];
    //Makes sure Ventrue do not wind up with Bagger or Farmer.
    if(isRandomPred){
        charPred = capitalizeString(checkAgainst(charPred, ['Bagger', 'Farmer'], charClan, ['ventrue'], predTypes));
    }
    else if(charClan === 'ventrue' && ['Bagger', 'Farmer'].includes(charPred) && isRandomClan){
        while(charClan === 'ventrue'){
            charClan = pickValueFromDom(document.getElementsByName('clan'), clanList)['possibleStorageVariable'];
        }
    }
    else if(charClan === 'ventrue' && ['Bagger', 'Farmer'].includes(charPred)){
        predTypeConflictAlert();
    }


    //Adjusts disciplines for various predator types, making sure that only Tremere and Banu Haqim get Blood Sorcery.
    charPredDiscipline = randomChoice(predDisciplines[charPred]);
    charPredDiscipline = checkFor(charPredDiscipline, ['Blood Sorcery'], charClan, ['tremere', 'banu-haqim'], 
    predDisciplines[charPred]);

    //Shows predator type if chosen randomly.
    if(isRandomPred){
        randomPred.innerText = `(picked ${charPred})`;
    }
    //Adjusts specialties for various predator types, making  sure to choose either a specialty or one dot in a skill.
    const possiblePredSpecialties = predSpecialties[charPred];
    const specialtyChoice = randomChoice(Object.keys(possiblePredSpecialties));
    let specialties = {};
    if(skillBlock[specialtyChoice] === 0){
        skillBlock[specialtyChoice]++
    }
    else{
        specialties[specialtyChoice] = [];
        specialties[specialtyChoice].push(possiblePredSpecialties[specialtyChoice]);
    }

    //Adjusts free specialties to Academics, Craft, Science, and Performance.
    if(skillBlock['Academics'] !== 0){
        specialties['Academics'] = [];
        specialties['Academics'].push(randomChoice(specialtiesToSkills['Academics']))
    }
    if(skillBlock['Craft' !== 0]){
        specialties['Craft'] = [];
        specialties['Craft'].push(randomChoice(specialtiesToSkills['Craft']));
    }
    if(skillBlock['Science'] !== 0){
        specialties['Science'] = [];
        specialties['Science'].push(randomChoice(specialtiesToSkills['Science']));
    }
    if(skillBlock['Performance'] !== 0 && specialties['Performance'] === undefined){
        specialties['Performance'] = [];
        specialties['Performance'].push(randomChoice(specialtiesToSkills['Performance']));
    }
    else if(skillBlock['Performance'] !== 0){
        specialties['Performance'].push(randomChoice(specialtiesToSkills['Performance']));
    }

    //Adds a career specialty.
    careerSkill = randomChoice(Object.keys(specialtiesToSkills));
    if(skillBlock[careerSkill] === 0 || (specialties[careerSkill] !== undefined && specialties[careerSkill].length >= skillBlock[careerSkill])){
        while(skillBlock[careerSkill] === 0 || (specialties[careerSkill] !== undefined && specialties[careerSkill].length >= skillBlock[careerSkill])){
            careerSkill = randomChoice(Object.keys(specialtiesToSkills));
        }
    }
    careerSpecialty = randomChoice(specialtiesToSkills[careerSkill]);
    if(specialties[careerSkill] === undefined){
        specialties[careerSkill] = [];
    }
    specialties[careerSkill].push(careerSpecialty);    
   
    //Fills in nonexistent specialties.
    for(skill of skills){
        if(Object.keys(specialties).includes(skill)){
            continue;
        }
        else{
            specialties[skill] = '';
        }
    }

    //Selects the correct groups of predator type advantages and flaws and sets advantages and flaws to empty objects.    
    let charPredAdvantagesMenu = predAdvantages[charPred];
    let charPredFlawsMenu = predFlaws[charPred];
    advantages = {};
    flaws = {};

    /*Stores data to a single character object.*/
    let character = new Character(charClan, charGen, attrBlock, skillBlock, disBlock, charPred, specialties, advantages, flaws, charName);
    /*Selects properties of the character object to shorten DOM selection later.*/
    const charAttr = character.attributes;
    const charSkills = character.skills;
    const charDis = character.disciplines;
    const charSpec = character.specialties;
    const charAdv = character.advantages;
    const charFlaws = character.flaws;

    //Increases the discipline selected for predator type by 1 if character is not a thin-blood.
    if(character.clan !== 'thin-blood'){
        charDis[charPredDiscipline]++;
    }

    //Adjusts humanity for ancilla-level characters.
    if(character.generation === 'tenth' || character.generation === 'eleventh'){
        character.humanity--;
    }
    //Adjusts humanity for various predator types.
    if(['Alleycat', 'Blood-Leech'].includes(character.predatorType)){
        character.humanity--;
    }
    else if(['Farmer', 'Consensualist'].includes(character.predatorType)){
        character.humanity++;
    }

    //Adjusts Blood Potency for various predator types.
    if(['Blood-Leech'].includes(character.predatorType)){
        character.bloodPotency++;
    }

    //Adjusts blood potency value for thin-blooded characters.
    if(character.generation === 'fourteenthEtc'){
        character.bloodPotency = 0;
    }

    //Adds advantages and flaws for predator type.
    chooseAdvantagesOrFlaws(charPredAdvantagesMenu, charAdv);
    chooseAdvantagesOrFlaws(charPredFlawsMenu, charFlaws);

    //Updates the DOM to reflect humanity, attribute, skill, specialty, and discipline values.
    humDom.innerText = character.humanity;

    strDom.innerText = charAttr['Strength'];
    dexDom.innerText = charAttr['Dexterity'];
    stmDom.innerText = charAttr['Stamina'];
    chaDom.innerText = charAttr['Charisma'];
    mnpDom.innerText = charAttr['Manipulation'];
    cmpDom.innerText = charAttr['Composure'];
    intDom.innerText = charAttr['Intelligence'];
    witDom.innerText = charAttr['Wits'];
    rsvDom.innerText = charAttr['Resolve'];

    atDom.innerText = `${charSkills['Athletics']} ${charSpec['Athletics']}`;
    akDom.innerText = `${charSkills['Animal Ken']} ${charSpec['Animal Ken']}`;
    acDom.innerText = `${charSkills['Academics']} ${charSpec['Academics']}`;
    brDom.innerText = `${charSkills['Brawl']} ${charSpec['Brawl']}`;
    eqDom.innerText = `${charSkills['Etiquette']} ${charSpec['Etiquette']}`;
    awDom.innerText = `${charSkills['Awareness']} ${charSpec['Awareness']}`;
    crDom.innerText = `${charSkills['Craft']} ${charSpec['Craft']}`;
    isDom.innerText = `${charSkills['Insight']} ${charSpec['Insight']}`;
    fcDom.innerText = `${charSkills['Finance']} ${charSpec['Finance']}`;
    drDom.innerText = `${charSkills['Drive']} ${charSpec['Drive']}`;
    itDom.innerText = `${charSkills['Intimidation']} ${charSpec['Intimidation']}`;
    ivDom.innerText = `${charSkills['Investigation']} ${charSpec['Investigation']}`;
    faDom.innerText = `${charSkills['Firearms']} ${charSpec['Firearms']}`;
    ldDom.innerText = `${charSkills['Leadership']} ${charSpec['Leadership']}`;
    mdDom.innerText = `${charSkills['Medicine']} ${charSpec['Medicine']}`;
    lcDom.innerText = `${charSkills['Larceny']} ${charSpec['Larceny']}`;
    pfDom.innerText = `${charSkills['Performance']} ${charSpec['Performance']}`;
    ocDom.innerText = `${charSkills['Occult']} ${charSpec['Occult']}`;
    mlDom.innerText = `${charSkills['Melee']} ${charSpec['Melee']}`;
    psDom.innerText = `${charSkills['Persuasion']} ${charSpec['Persuasion']}`;
    poDom.innerText = `${charSkills['Politics']} ${charSpec['Politics']}`;
    shDom.innerText = `${charSkills['Stealth']} ${charSpec['Stealth']}`;
    swDom.innerText = `${charSkills['Streetwise']} ${charSpec['Streetwise']}`;
    scDom.innerText = `${charSkills['Science']} ${charSpec['Science']}`;
    svDom.innerText = `${charSkills['Survival']} ${charSpec['Survival']}`;
    sbDom.innerText = `${charSkills['Subterfuge']} ${charSpec['Subterfuge']}`;
    tcDom.innerText = `${charSkills['Technology']} ${charSpec['Technology']}`;

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
    const savedStatsBasicInfo = document.createElement('h4')
    const savedStatsAttr = document.createElement('p');
    const savedStatsSkills = document.createElement('p');
    const savedStatsDisciplines = document.createElement('p');
    const savedStatsAdv = document.createElement('p');
    const savedStatsFlaw = document.createElement('p');
    savedStatsName.innerText = `${character.name}: `
    if(character.generation === 'fourteenthEtc'){
        savedStatsBasicInfo.innerText = `Thin-Blood (Fourteenth, Fifteenth, or Sixteenth Generation; Blood Potency 0)`
    }
    else{
        savedStatsBasicInfo.innerText = 
        `${capitalizeString(character.generation)} Generation ${capitalizeString(character.clan)}; Blood Potency ${character.bloodPotency}; Humanity ${character.humanity}`
    }
    savedStatsAttr.innerText = `Attributes: `
    savedStatsSkills.innerText = `Skills: `
    if(character.generation === 'fourteenthEtc'){
        savedStatsDisciplines.innerText = '';
    }
    else{
        savedStatsDisciplines.innerText = `Disciplines: `
    }
    fillDescription(character.attributes, savedStatsAttr);
    fillDescription(character.skills, savedStatsSkills);
    fillDescription(character.disciplines, savedStatsDisciplines);
    savedStatsAdv.innerText = 'Advantages: '
    fillDescription(character.advantages, savedStatsAdv);
    savedStatsFlaw.innerText += 'Flaws: '
    fillDescription(character.flaws, savedStatsFlaw);
    savedStatsSkills.innerText.length--;
    savedStatsAttr.innerText.length--;
    savedStatsDisciplines.innerText.length--;
    savedStatsAdv.innerText.length--;
    savedStatsFlaw.innerText.length--;
    savedStats.classList.add('saved-stats');
    savedStats.append(savedStatsName);
    savedStats.append(savedStatsBasicInfo);
    savedStats.append(savedStatsAttr);
    savedStats.append(savedStatsSkills);
    savedStats.append(savedStatsDisciplines);
    savedStats.append(savedStatsAdv);
    savedStats.append(savedStatsFlaw);
    document.querySelector('#saved-sheets').append(savedStats);
}

//The function that runs every time a user clicks the 'save' button in the app.
document.querySelector('#save-character').addEventListener('click', function(e){
    e.preventDefault();
    saveStats();
})