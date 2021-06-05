//This section of the app randomly generates higher-level BBEG-style characters for VtM V5.

/*The function that, given a selected or randomized clan, returns an object with key-value pairs where each key is a clan discipline
and each value is the randomly-assigned number of dots a character has in that discipline.*/
function distributeClanDisciplines(clan, charGenBand, disBlock){
    let clanDisDots = null;
    if(charGenBand === 'fourteenthEtc'){
        clanDisDots = [randomChoice([1, 2, 3])];
    }
    else if(clan === 'caitiff'){
        if(charGenBand === 'twelfth-thirteenth'){
            clanDisDots = [3, 3, 2, 1, 1, 0, 0, 0, 0, 0, 0, 0];
        }
        else if(charGenBand === 'tenth-eleventh'){
            clanDisDots = [4, 3, 2, 2, 2, 1, 0, 0, 0, 0, 0, 0];
        }
        else if(charGenBand === 'sixth-ninth'){
            clanDisDots = [5, 4, 4, 3, 3, 2, 1, 1, 1, 0, 0, 0];
        }
        else{
            clanDisDots = [5, 5, 4, 4, 3, 3, 3, 2, 1, 1, 0, 0];
        }
    }
    else{
        if(charGenBand === 'twelfth-thirteenth'){
            clanDisDots = [3, 3, 2];
        }
        else if(charGenBand === 'tenth-eleventh'){
            clanDisDots = [4, 3, 3];
        }
        else if(charGenBand === 'sixth-ninth'){
            clanDisDots = [5, 4, 3];
        }
        else{
            clanDisDots = [5, 5, 4];
        }
    }
    assignAttributeDots(clanDisDots, clanDisciplines[clan], disBlock);
}

/*The function that, given a selected or randomized clan, populates the object where each key is a discipline and each value is the number
of dots the character has in that discipline with the remaining disciplines after clan disciplines are accounted for.*/
function distributeRestDisciplines(disBlock, charGenBand){
    let restDisDots = null;
    if(charGenBand === 'twelfth-thirteenth'){
        restDisDots = [1, 1, 0, 0, 0, 0, 0, 0, 0];
    }
    else if(charGenBand === 'tenth-eleventh'){
        restDisDots = [2, 2, 1, 0, 0, 0, 0, 0, 0];
    }
    else if(charGenBand === 'sixth-ninth'){
        restDisDots = [3, 3, 2, 1, 1, 1, 0, 0, 0];
    }
    else{
        restDisDots = [4, 3, 3, 3, 2, 1, 1, 1, 0];
    }
    for(discipline of ['Thin-Blood Alchemy', ...allNormalDisciplines]){
        if(Object.keys(disBlock).includes(discipline)){
            continue;
        }
        else if(discipline === 'Thin-Blood Alchemy' && charGenBand !== 'fourteenthEtc' ||
        (discipline !== 'Thin-Blood Alchemy' && charGenBand === 'fourteenthEtc')){
            disBlock[discipline] = 0;
        }
        else{
            disBlock[discipline] = randomizeAttributeDots(restDisDots);
        }
    }
}

//The function that adds a random specialty.
function addSpecialty(skillBlock, specialties){
    careerSkill = randomChoice(Object.keys(specialtiesToSkills));
    if(skillBlock[careerSkill] === 0 || (specialties[careerSkill] !== undefined && specialties[careerSkill].length >= skillBlock[careerSkill]) || 
    (specialties[careerSkill] !== undefined && specialties[careerSkill].length === specialtiesToSkills[careerSkill].length)){
        while(skillBlock[careerSkill] === 0 || (specialties[careerSkill] !== undefined && specialties[careerSkill].length >= skillBlock[careerSkill]) || 
        (specialties[careerSkill] !== undefined && specialties[careerSkill].length === specialtiesToSkills[careerSkill].length)){
            careerSkill = randomChoice(Object.keys(specialtiesToSkills));
        }
    }
    careerSpecialty = randomChoice(specialtiesToSkills[careerSkill]);
    if(specialties[careerSkill] === undefined){
        specialties[careerSkill] = [];
    }
    if(specialties[careerSkill].includes(careerSpecialty)){
        while(specialties[careerSkill].includes(careerSpecialty)){
            careerSpecialty = randomChoice(specialtiesToSkills[careerSkill]);
        }
    }
    specialties[careerSkill].push(careerSpecialty);    
}

function createCharacter(attributes){
    //Selects either the name given in the relevant input or names the character the placeholder "Character".
    if(nameDom.value !==''){
        charName = nameDom.value;
    }
    else{
        charName = 'BBEG';
    }
    //Selects a clan value and keeps a note of if it was generated randomly or not.
    let possCharClanAndRandom = pickValueFromDom(document.getElementsByName('clan'), clanList);
    //Stores the generated clan value and note of randomness in variables.
    let charClan = possCharClanAndRandom['possibleStorageVariable'];
    const isRandomClan = possCharClanAndRandom['isRandom'];
    //Selects a generation band value and keeps a note of if it was generated randomly or not.
    let possCharGenBandAndRandom = pickValueFromDom(document.getElementsByName('generation'), generationBands);
    let charGenBand = possCharGenBandAndRandom['possibleStorageVariable'];
    const isRandomGen = possCharGenBandAndRandom['isRandom'];
    let charGen = null;
    //Selects a specific generation and stores it in a variable.
    if(charGenBand === 'fourth-fifth'){
        charGen = randomChoice(methuselahs);
    }
    else if(charGenBand === 'sixth-ninth'){
        charGen = randomChoice(elders);
    }
    else if(charGenBand === 'tenth-eleventh'){
        charGen = randomChoice(ancillae);
    }
    else if(charGenBand === 'twelfth-thirteenth'){
        charGen = randomChoice(neonates);
    }
    else{
        charGen = 'fourteenthEtc'
    }
    /*Accounts and modifies for possible generation and clan conflicts (thin-bloods are 14th+ gen and 14th+ gen are thin-bloods) unless 
    two conflicting options are both intentionally selected, in which case the app informs you of your mistake and stops character
    creation.*/
    if((charGen !== 'fourteenthEtc' && charClan === 'thin-blood') || (charGen === 'fourteenthEtc' && charClan !== 'thin-blood')){
        if(isRandomClan && isRandomGen && charGen === 'fourteenthEtc' || (isRandomGen && isRandomClan === false && charClan !== 'thin-blood')){
            while(charGen === 'fourteenthEtc'){
                charGenBand = randomChoice([methuselahs, elders, ancillae, neonates]);
                charGen = randomChoice(charGenBand);
            }
        }
        else if(isRandomClan && isRandomGen || (isRandomGen && isRandomClan === false && charClan === 'thin-blood')){
            charGen = 'fourteenthEtc';
            charGenBand = 'fourteenthEtc';
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
    let attributeDots = [];
    if(charGenBand === 'fourth-fifth'){
        attributeDots = [5, 5, 5, 4, 4, 4, 4, 3, 3];
    }
    else if(charGenBand === 'sixth-ninth'){
        attributeDots = [5, 5, 4, 4, 4, 4, 3, 3, 3];
    }
    else if(charGenBand === 'tenth-eleventh'){
        attributeDots = [5, 5, 4, 4, 4, 3, 3, 3, 3];
    }
    else if(charGenBand === 'twelfth-thirteenth'){
        attributeDots = [5, 4, 4, 4, 4, 3, 3, 3, 2];
    }
    else{
        attributeDots = [5, 4, 4, 4, 3, 3, 3, 2, 2];
    }
    let attrBlock = {};
    let skillBlock = {};
    let skillDots = [];
    let disBlock = {};
    //Distributes dots in disciplines.
    distributeClanDisciplines(charClan, charGenBand, disBlock);
    distributeRestDisciplines(disBlock, charGenBand);
    //Distributes attribute dots.
    assignAttributeDots(attributeDots, attributes, attrBlock);
    /*Retrieves selected or randomly-generated distribution, then selects skill dot pool based on that distribution 
    and updates selection in the DOM.*/
    let distributionAndRandom = pickValueFromDom(document.getElementsByName('distribution'), distributions);
    let distribution = distributionAndRandom['possibleStorageVariable'];
    let isRandomDistribution = distributionAndRandom['isRandom'];
    if(charGenBand === 'fourth-fifth'){
        distributionList = [[5, 5, 5, 5, 5, 5, 5, 4, 4, 4, 4, 3, 3, 3, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
                            [5, 5, 5, 5, 4, 4, 4, 4, 3, 3, 3, 3, 3, 3, 2, 2, 2, 2, 2, 2, 1, 1, 0, 0, 0, 0, 0], 
                            [5, 5, 4, 4, 4, 3, 3, 3, 3, 3, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0]];
    }
    else if(charGenBand === 'sixth-ninth'){
        distributionList = [[5, 5, 5, 5, 5, 4, 4, 4, 3, 3, 3, 3, 3, 3, 3, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
                            [5, 5, 4, 4, 4, 3, 3, 3, 3, 3, 3, 3, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0], 
                            [5, 4, 4, 3, 3, 3, 3, 3, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0]];
    }
    else if(charGenBand === 'tenth-eleventh'){
        distributionList = [[5, 5, 5, 4, 4, 4, 3, 3, 3, 3, 3, 3, 3, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
                            [5, 4, 4, 4, 4, 3, 3, 3, 3, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0], 
                            [4, 4, 4, 4, 3, 3, 3, 3, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0]];
    }
    else{
        distributionList = [[5, 4, 4, 4, 3, 3, 3, 3, 3, 2, 2, 2, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
                            [5, 4, 4, 3, 3, 3, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
                            [4, 4, 3, 3, 3, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0]];
    }

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

    //Adds specialties as an empty object.

    const specialties = {};
    let numberOfSpecialties = null;
    if(charGen === 'fourteenthEtc'){
        numberOfSpecialties = 5;
    }
    else if(['twelfth', 'thirteenth'].includes(charGen)){
        numberOfSpecialties = 6;
    }
    else if(['tenth', 'eleventh'].includes(charGen)){
        numberOfSpecialties = 7;
    }
    else if(['sixth', 'seventh', 'eighth', 'ninth'].includes(charGen)){
        numberOfSpecialties = 8;
    }
    else if (['fourth', 'fifth'].includes(charGen)){
        numberOfSpecialties = 9;
    }

    //Adjusts free specialties to Academics, Craft, Science, and Performance.
    if(skillBlock['Academics'] !== 0){
        specialties['Academics'] = [];
        specialties['Academics'].push(randomChoice(specialtiesToSkills['Academics']))
        numberOfSpecialties--;
    }
    if(skillBlock['Craft' !== 0]){
        specialties['Craft'] = [];
        specialties['Craft'].push(randomChoice(specialtiesToSkills['Craft']));
        numberOfSpecialties--;
    }
    if(skillBlock['Science'] !== 0){
        specialties['Science'] = [];
        specialties['Science'].push(randomChoice(specialtiesToSkills['Science']));
        numberOfSpecialties--;
    }
    if(skillBlock['Performance'] !== 0 && specialties['Performance'] === undefined){
        specialties['Performance'] = [];
        specialties['Performance'].push(randomChoice(specialtiesToSkills['Performance']));
        numberOfSpecialties--;
    }
    else if(skillBlock['Performance'] !== 0){
        specialties['Performance'].push(randomChoice(specialtiesToSkills['Performance']));
        numberOfSpecialties--;
    }
    console.log(numberOfSpecialties);

    while(numberOfSpecialties > 0){
        addSpecialty(skillBlock, specialties);
        numberOfSpecialties--;
    }
   
    //Fills in nonexistent specialties.
    for(skill of skills){
        if(Object.keys(specialties).includes(skill)){
            continue;
        }
        else{
            specialties[skill] = '';
        }
    }

    //Sets advantages and flaws to empty objects.    
    advantages = {};
    flaws = {};

    /*Stores data to a single character object.*/
    let character = new BBEG(charClan, charGen, attrBlock, skillBlock, disBlock, specialties, advantages, flaws, charName);
    /*Selects properties of the character object to shorten DOM selection later.*/
    const charAttr = character.attributes;
    const charSkills = character.skills;
    const charDis = character.disciplines;
    const charSpec = character.specialties;
    const charAdv = character.advantages;
    const charFlaws = character.flaws;

    //Adjusts humanity for ancilla, elder, and methuselah-level characters.
    if(character.generation === 'tenth' || character.generation === 'eleventh'){
        character.humanity-= randomChoice([0, 1, 2]);
    }
    else if(['sixth', 'seventh', 'eighth', 'ninth'].includes(character.generation)){
        character.humanity -= randomChoice([1, 2, 3]);
    }
    else if(['fourth', 'fifth'].includes(character.generation)){
        character.humanity -= randomChoice([2, 3, 4]);
    }

    //Adjusts blood potency value for various generations.
    if(character.generation === 'fourteenthEtc'){
        character.bloodPotency = 0;
    }
    else if(['twelfth', 'thirteenth'].includes(character.generation)){
        character.bloodPotency = randomChoice([1, 2, 3]);
    }
    else if(['tenth', 'eleventh'].includes(character.generation)){
        character.bloodPotency = randomChoice([1, 2, 3, 4]);
    }
    else if(character.generation === 'ninth'){
        character.bloodPotency = randomChoice([2, 3, 4, 5]);
    }
    else if(character.generation === 'eighth'){
        character.bloodPotency = randomChoice([2, 3, 4, 5, 6]);
    }
    else if(character.generation === 'seventh'){
        character.bloodPotency = randomChoice([3, 4, 5, 6, 7]);
    }
    else if(character.generation === 'sixth'){
        character.bloodPotency = randomChoice([3, 4, 5, 6, 7, 8]);
    }
    else if(character.generation === 'fifth'){
        character.bloodPotency = randomChoice([4, 5, 6, 7, 8, 9]);
    }
    else if(character.generation === 'fourth'){
        character.bloodPotency = randomChoice([5, 6, 7, 8, 9, 10]);
    }

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