//The input in the DOM that allows users to enter a name or label.
let nameDom = document.querySelector('#char-name');

//The span that displays a character's humanity in the DOM.
let humDom = document.querySelector('#humanity');

//The table cells in the DOM that contain basic character attribute dot values after the app runs.
let strDom = document.querySelector('#str');
let dexDom = document.querySelector('#dex');
let stmDom = document.querySelector('#stm');
let chaDom = document.querySelector('#cha');
let mnpDom = document.querySelector('#mnp');
let cmpDom = document.querySelector('#cmp');
let intDom = document.querySelector('#int');
let witDom = document.querySelector('#wit');
let rsvDom = document.querySelector('#rsv');

//The table cells in the DOM that contain character skill dot values after the app runs.
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

//The table cells in the DOM that contain character discipline dot values after the app runs.
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
let thinAlchDom = document.querySelector('#thin-blood-alchemy');

//The radio buttons in the DOM that allow for selection of generation.
let tenthDom = document.querySelector('#tenth');
let eleventhDom = document.querySelector('#eleventh');
let twelfthDom = document.querySelector('#twelfth');
let thirteenthDom = document.querySelector('#thirteenth');
let fourteenthEtcDom = document.querySelector('#fourteenthEtc');
let randomGenSelect = document.querySelector('#random-gen');

//The areas where randomly picked clans and skill dot distributions are shown (if the user randomized them) after the app runs.
let randomClan = document.querySelector('#random-clan');
let randomDist = document.querySelector('#random-dist');
let randomGen = document.querySelector('#shows-random-gen');
let randomPred = document.querySelector('#shows-pred-type');