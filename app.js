const attributes = ['Strength', 'Dexterity', 'Stamina', 'Charisma', 'Manipulation', 'Composure', 'Intelligence', 'Wits', 'Resolve'];
let attributeVals = [4, 3, 3, 3, 2, 2, 2, 2, 1];
const skills = ['Athletics', 'Animal Ken', 'Academics', 'Brawl', 'Etiquette', 'Awareness', 'Craft', 'Insight', 'Finance', 'Drive', 'Intimidation', 'Investigation', 'Firearms', 'Leadership', 'Medicine', 'Larceny', 'Performance', 'Occult', 'Melee', 'Persuasion', 'Politics', 'Stealth', 'Streetwise', 'Science', 'Survival', 'Subterfuge', 'Technology'];
let skillVals = [];
let statBlock = {};
let skillBlock = {};
let disBlock = {};

const allNormalDisciplines = ['Animalism', 'Auspex', 'Celerity', 'Dominate', 'Fortitude', 'Obfuscate', 'Oblivion', 'Potence', 'Presence', 'Protean', 'Blood Sorcery'];
const banuHaqimDis = ['Blood Sorcery', 'Celerity', 'Obfuscate'];
const brujahDis = ['Celerity', 'Potence', 'Presence'];
const gangrelDis = ['Animalism', 'Fortitude', 'Protean'];
const hecataDis = ['Auspex', 'Fortitude', 'Oblivion'];
const lasombraDis = ['Dominate', 'Oblivion', 'Potence'];
const malkDis = ['Auspex', 'Obfuscate', 'Dominate'];
const nosDis = ['Animalism', 'Obfuscate', 'Potence'];
const minDis = ['Obfuscate', 'Presence', 'Protean'];
const ravnosDis = ['Animalism', 'Obfuscate', 'Presence'];
const salubriDis = ['Auspex', 'Dominate', 'Fortitude'];
const thinDis = ['Thin-Blood Alchemy'];
const torDis = ['Auspex', 'Celerity', 'Presence'];
const tremDis = ['Auspex', 'Dominate', 'Blood Sorcery'];
const tzimDis = ['Animalism', 'Dominate', 'Protean'];
const venDis = ['Dominate', 'Fortitude', 'Presence'];
const clanDisciplines = {
    'banu-haqim': banuHaqimDis, 'brujah': brujahDis, 'caitiff': allNormalDisciplines, 
    'gangrel': gangrelDis, 'hecata': hecataDis, 'lasombra': lasombraDis,
    'malkavian': malkDis, 'nosferatu': nosDis, 'ministry': minDis,
    'ravnos': ravnosDis, 'salubri': salubriDis, 'toreador': torDis,
    'tremere': tremDis, 'tzimisce': tzimDis, 'ventrue': venDis
}

let nameDom = document.querySelector('#char-name');

let strDom = document.querySelector('#str');
let dexDom = document.querySelector('#dex');
let stmDom = document.querySelector('#stm');
let chaDom = document.querySelector('#cha');
let mnpDom = document.querySelector('#mnp');
let cmpDom = document.querySelector('#cmp');
let intDom = document.querySelector('#int');
let witDom = document.querySelector('#wit');
let rsvDom = document.querySelector('#rsv');

let atDom = document.querySelector('#athletics');
let akDom = document.querySelector('#animal-ken');
let acDom = document.querySelector('#academics');
let brDom = document.querySelector('#brawl');
let eqDom = document.querySelector('#etiquette');
let awDom = document.querySelector('#awareness');
let crDom = document.querySelector('#craft');
let isDom = document.querySelector('#insight');
let fcDom = document.querySelector('#finance');
let drDom = document.querySelector('#drive');
let itDom = document.querySelector('#intimidation');
let ivDom = document.querySelector('#investigation');
let faDom = document.querySelector('#firearms');
let ldDom = document.querySelector('#leadership');
let mdDom = document.querySelector('#medicine');
let lcDom = document.querySelector('#larceny');
let pfDom = document.querySelector('#performance');
let ocDom = document.querySelector('#occult');
let mlDom = document.querySelector('#melee');
let psDom = document.querySelector('#persuasion');
let poDom = document.querySelector('#politics');
let shDom = document.querySelector('#stealth');
let swDom = document.querySelector('#streetwise');
let scDom = document.querySelector('#science');
let svDom = document.querySelector('#survival');
let sbDom = document.querySelector('#subterfuge');
let tcDom = document.querySelector('#technology');

let animDom = document.querySelector('#animalism');
let auspDom = document.querySelector('#auspex');
let celeDom = document.querySelector('#celerity');
let domiDom = document.querySelector('#dominate');
let fortDom = document.querySelector('#fortitude');
let obfuDom = document.querySelector('#obfuscate');
let obliDom = document.querySelector('#oblivion');
let poteDom = document.querySelector('#potence');
let presDom = document.querySelector('#presence');
let protDom = document.querySelector('#protean');
let blooDom = document.querySelector('#blood-sorcery');

function randomizeAttributeVal(valGroup){
    const currValIndex = Math.floor(Math.random()*(valGroup.length));
    const currVal = valGroup[currValIndex];
    valGroup.splice(currValIndex, 1);
    return currVal;
}

//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/values Recalled how to use Object.values() here.

function assignAttributeVals(valGroup, attributeGroup, block){
    for(let attribute of attributeGroup){
        let attributeVal = randomizeAttributeVal(valGroup);
        block[attribute] = attributeVal;
    }
    return block;
}

function distributeClanDisciplines(clan){
    let clanDisVals = [2, 1, 0];
    return assignAttributeVals(clanDisVals, clanDisciplines[clan], disBlock);
}

function distributeRestDisciplines(clan){
    for(discipline of allNormalDisciplines){
        if(clanDisciplines[clan].includes(discipline)){
            continue;
        }
        else{
            disBlock[discipline] = 0;
        }
    }
}

function resetGenerator(){
    attributeVals = [4, 3, 3, 3, 2, 2, 2, 2, 1];
    statBlock = {};
    skillBlock = {};
    skillVals = [];
    clanDisVals = [];
    disBlock = {};
}

function createCharacter(attributeVals, attributes){
    let clanDom = [...document.getElementsByName('clan')];
    let charClan = null;
    for(clan of clanDom){
        if(clan.checked === true){
            charClan = clan.value;
        }
        else{
            continue;
        }
    }
    distributeClanDisciplines(charClan);
    distributeRestDisciplines(charClan);
    let stats = assignAttributeVals(attributeVals, attributes, statBlock);
    let distribution = null;
    let distDom = [...document.getElementsByName('distribution')]
    for(distBtn of distDom){
        if(distBtn.checked === true){
            distribution = distBtn.value;
        }
        else{
            continue;
        }
    }
    if(distribution === 'specialist'){
        skillVals = [4, 3, 3, 3, 2, 2, 2, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    }
    else if(distribution === 'balanced'){
        skillVals = [3, 3, 3, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    }
    else{
        skillVals = [3, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0];
    }
    skillBlock = assignAttributeVals(skillVals, skills, skillBlock);
    let str = stats['Strength'];
    let dex = stats['Dexterity'];
    let stm = stats['Stamina'];
    let cha = stats['Charisma'];
    let mnp = stats['Manipulation'];
    let cmp = stats['Composure'];
    let int = stats['Intelligence'];
    let wit = stats['Wits'];
    let rsv = stats['Resolve'];
    
    let at = skillBlock['Athletics'];
    let ak = skillBlock['Animal Ken'];
    let ac = skillBlock['Academics'];
    let br = skillBlock['Brawl'];
    let eq = skillBlock['Etiquette'];
    let aw = skillBlock['Awareness'];
    let cr = skillBlock['Craft'];
    let is = skillBlock['Insight'];
    let fc = skillBlock['Finance'];
    let dr = skillBlock['Drive'];
    let it = skillBlock['Intimidation'];
    let iv = skillBlock['Investigation'];
    let fa = skillBlock['Firearms'];
    let ld = skillBlock['Leadership'];
    let md = skillBlock['Medicine'];
    let lc = skillBlock['Larceny'];
    let pf = skillBlock['Performance'];
    let oc = skillBlock['Occult'];
    let ml = skillBlock['Melee'];
    let ps = skillBlock['Persuasion'];
    let po = skillBlock['Politics'];
    let sh = skillBlock['Stealth'];
    let sw = skillBlock['Streetwise'];
    let sc = skillBlock['Science'];
    let sv = skillBlock['Survival'];
    let sb = skillBlock['Subterfuge'];
    let tc = skillBlock['Technology'];
    
    let anim = disBlock['Animalism'];
    let ausp = disBlock['Auspex'];
    let cele = disBlock['Celerity'];
    let domi = disBlock['Dominate'];
    let fort = disBlock['Fortitude'];
    let obfu = disBlock['Obfuscate'];
    let obli = disBlock['Oblivion'];
    let pote = disBlock['Potence'];
    let pres = disBlock['Presence'];
    let prot = disBlock['Protean'];
    let bloo = disBlock['Blood Sorcery'];

    strDom.innerText = str;
    dexDom.innerText = dex;
    stmDom.innerText = stm;
    chaDom.innerText = cha;
    mnpDom.innerText = mnp;
    cmpDom.innerText = cmp;
    intDom.innerText = int;
    witDom.innerText = wit;
    rsvDom.innerText = rsv;

    atDom.innerText = at;
    akDom.innerText = ak;
    acDom.innerText = ac;
    brDom.innerText = br;
    eqDom.innerText = eq;
    awDom.innerText = aw;
    crDom.innerText = cr;
    isDom.innerText = is;
    fcDom.innerText = fc;
    drDom.innerText = dr;
    itDom.innerText = it;
    ivDom.innerText = iv;
    faDom.innerText = fa;
    ldDom.innerText = ld;
    mdDom.innerText = md;
    lcDom.innerText = lc;
    pfDom.innerText = pf;
    ocDom.innerText = oc;
    mlDom.innerText = ml;
    psDom.innerText = ps;
    poDom.innerText = po;
    shDom.innerText = sh;
    swDom.innerText = sw;
    scDom.innerText = sc;
    svDom.innerText = sv;
    sbDom.innerText = sb;
    tcDom.innerText = tc;

    animDom.innerText = anim;
    auspDom.innerText = ausp;
    celeDom.innerText = cele;
    domiDom.innerText = domi;
    fortDom.innerText = fort;
    obfuDom.innerText = obfu;
    obliDom.innerText = obli;
    poteDom.innerText = pote;
    presDom.innerText = pres;
    protDom.innerText = prot;
    blooDom.innerText = bloo;
}

document.querySelector('#create-character').addEventListener('click', function(e){
    e.preventDefault();
    resetGenerator();
    createCharacter(attributeVals, attributes);
})


//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys Was reminded of how to name pairs here.
function saveStats(){
    const charName = nameDom.value;
    const savedStats = document.createElement('div');
    const savedStatsName = document.createElement('h3');
    const savedStatsAttr = document.createElement('p');
    const savedStatsSkills = document.createElement('p');
    const savedStatsDisciplines = document.createElement('p');
    savedStatsName.innerText = `${charName}: `
    savedStatsAttr.innerText = `Attributes: `
    savedStatsSkills.innerText = `Skills: `
    savedStatsDisciplines.innerText = `Disciplines:`
    for(let [key, value] of Object.entries(statBlock)){
        savedStatsAttr.innerText += `${key} ${value} `
    }
    for(let [key, value] of Object.entries(skillBlock)){
        if(value !== 0){
            savedStatsSkills.innerText += `${key} ${value} `
        }
        else{
            continue;
        }
    }
    for(let [key, value] of Object.entries(disBlock)){
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

document.querySelector('#save-character').addEventListener('click', function(e){
    e.preventDefault();
    saveStats();
})