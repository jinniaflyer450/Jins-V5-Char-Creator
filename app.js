const attributes = ['Strength', 'Dexterity', 'Stamina', 'Charisma', 'Manipulation', 'Composure', 'Intelligence', 'Wits', 'Resolve'];
let attributeVals = [4, 3, 3, 3, 2, 2, 2, 2, 1];
const skills = ['Athletics', 'Animal Ken', 'Academics', 'Brawl', 'Etiquette', 'Awareness', 'Craft', 'Insight', 'Finance', 'Drive', 'Intimidation', 'Investigation', 'Firearms', 'Leadership', 'Medicine', 'Larceny', 'Performance', 'Occult', 'Melee', 'Persuasion', 'Politics', 'Stealth', 'Streetwise', 'Science', 'Survival', 'Subterfuge', 'Technology'];
let skillVals = [];
let statBlock = {};
let skillBlock = {};
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

function resetGenerator(){
    attributeVals = [4, 3, 3, 3, 2, 2, 2, 2, 1];
    statBlock = {};
    skillBlock = {};
    skillVals = [];
}

function createCharacter(attributeVals, attributes){
    let stats = assignAttributeVals(attributeVals, attributes, statBlock);
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
    const savedStatsAttr = document.createElement('p');
    const savedStatsSkills = document.createElement('p');
    savedStatsAttr.innerText = `${charName}: `
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
    savedStatsSkills.innerText.length--;
    savedStats.classList.add('saved-stats');
    savedStats.append(savedStatsAttr);
    savedStats.append(savedStatsSkills);
    document.querySelector('#saved-sheets').append(savedStats);
}

document.querySelector('#save-character').addEventListener('click', function(e){
    e.preventDefault();
    saveStats();
})