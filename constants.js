//Basic attributes.
const attributes = ['Strength', 'Dexterity', 'Stamina', 'Charisma', 'Manipulation', 'Composure', 'Intelligence', 'Wits', 'Resolve'];
//Skills.
const skills = ['Athletics', 'Animal Ken', 'Academics', 'Brawl', 'Etiquette', 'Awareness', 
                'Craft', 'Insight', 'Finance', 'Drive', 'Intimidation', 'Investigation', 
                'Firearms', 'Leadership', 'Medicine', 'Larceny', 'Performance', 'Occult', 
                'Melee', 'Persuasion', 'Politics', 'Stealth', 'Streetwise', 'Science', 
                'Survival', 'Subterfuge', 'Technology'];

//Container for the completed character.
let character = null;

//All available distributions, all available clans, all available disciplines, all available generations, and all available predator types. 
//(TODO: add none/mortals and/or ghouls)
let distributionList = [[4, 3, 3, 3, 2, 2, 2, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
                        [3, 3, 3, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
                        [3, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0]];
const clanList = ['banu-haqim', 'brujah', 'caitiff', 'gangrel', 'hecata', 'lasombra', 'malkavian', 'ministry', 
                'nosferatu', 'ravnos', 'salubri', 'toreador', 'tremere', 'tzimisce', 'ventrue', 'thin-blood'];
const allNormalDisciplines = ['Animalism', 'Auspex', 'Celerity', 'Dominate', 'Fortitude', 'Obfuscate', 
                            'Oblivion', 'Potence', 'Presence', 'Protean', 'Blood Sorcery'];
const generations = ['tenth', 'eleventh', 'twelfth', 'thirteenth', 'fourteenthEtc'];
const distributions = ['specialist', 'balanced', 'jack']; 
const predTypes = ['Alleycat', 'Bagger', 'Blood-Leech', 'Cleaver', 'Consensualist', 'Farmer', 'Osiris', 'Sandman', 'Scene-Queen', 'Siren'];

//Clans matched to their clan disciplines.
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

//A single object containing clans matched to their clan disciplines.
const clanDisciplines = {
    'banu-haqim': banuHaqimDis, 'brujah': brujahDis, 'caitiff': allNormalDisciplines, 
    'gangrel': gangrelDis, 'hecata': hecataDis, 'lasombra': lasombraDis,
    'malkavian': malkDis, 'nosferatu': nosDis, 'ministry': minDis,
    'ravnos': ravnosDis, 'salubri': salubriDis, 'thin-blood': thinDis, 
    'toreador': torDis, 'tremere': tremDis, 'tzimisce': tzimDis, 
    'ventrue': venDis
}

//A single object containing predator types matched to their predator type disciplines.

const predDisciplines = {
    'Alleycat': ['Celerity', 'Potence'], 'Bagger': ['Blood Sorcery', 'Obfuscate'], 'Blood-Leech': ['Celerity', 'Protean'],
    'Cleaver': ['Dominate', 'Animalism'], 'Consensualist': ['Auspex', 'Fortitude'], 'Farmer': ['Animalism', 'Protean'],
    'Osiris': ['Blood Sorcery', 'Presence'], 'Sandman': ['Auspex', 'Obfuscate'], 'Scene-Queen': ['Dominate', 'Potence'],
    'Siren': ['Fortitude', 'Presence']
}

//A single object containing specialties matched to their predator type disciplines.
const predSpecialties = {
    'Alleycat': {'Intimidation': '(stickups)', 'Brawl': '(grappling)'}, 'Bagger': {'Larceny': '(lockpicking)', 'Streetwise': '(black market)'},
    'Blood-Leech': {'Brawl': '(Kindred)', 'Stealth': '(against Kindred)'}, 'Cleaver': {'Persuasion': '(gaslighting)', 'Subterfuge': '(coverups)'},
    'Consensualist': {'Medicine': '(phlebotomy)', 'Persuasion': '(victims)'}, 'Farmer': {'Animal Ken': '(your animal)', 'Survival': '(hunting)'},
    'Osiris': {'Occult': '(your tradition)', 'Performance': '(your entertainment field)'}, 'Sandman': {'Medicine': '(anesthetics)', 'Stealth': '(break-in)'}, 
    'Scene-Queen': {'Etiquette': '(your scene)', 'Leadership': '(your scene)', 'Streetwise': '(your scene)'}, 
    'Siren': {'Persuasion': '(seduction)', 'Subterfuge': '(seduction)'}
}

//A single object containing specialties matched to their skills:

const specialtiesToSkills = 
{'Athletics': ['[specific organized sport]', '[specific individual sport]', 'chases', 'lifting'],
'Animal Ken:': ['dogs', 'cats', 'horses', 'wild animals', 'specific animal', 'taming wild animals', 'pets', 'training animals'],
'Academics': ['calculus', '[specific level of mathematics]', 'statistics', 'academic research', '[native language] literature', '[specific language] linguistics', '[specific area of the world] history', '[home country] history', '[specific area of the world] studies', 'gender studies'],
'Brawl': ['grappling', 'nonlethal combat', 'bar brawls', 'restraining holds', 'against Kindred', 'against werewolves', 'against [specific type of foe]'],
'Etiquette': ['[specific scene]', '[native country/culture]', '[specific foreign country/culture]', 'Camarilla court', 'Elysium', 'Anarch court', 'Sabbat'],
'Awareness': ['keeping watch', 'small details', 'audio cues', 'visual cues', 'tactile cues'],
'Craft': ['woodworking', 'cooking', 'sewing', 'embroidery', 'painting ([specific style])', 'sketching', 'drawing ([specific style or application])', 'photography', 'metalworking', 'mechanical work [specific type of item]'],
'Insight': ['small details', 'motivations', 'methods of doing something', 'likes and dislikes'],
'Finance': ['index funds', 'foreign currency', 'bonds', 'hedge funds', 'housing market', 'banking', 'finances of [specific company]', 'New York Stock Exchange', 'household budgeting'],
'Drive': ['racecar driving', 'stunt driving', 'getaway driving', 'motorcycles', 'buses', 'semitrucks', 'manual transmission', 'passenger jets', 'helicoptors', 'two-seater planes', 'car chases'],
'Intimidation': ['the Mafia', 'veiled threats', 'social pressure', 'physical threats', 'blackmail', '[specific gang]'],
'Investigation': ['crime scenes', 'conspiracy theories', '[specific type of location]', 'online investigation', 'collaboration with [specific organization]'],
'Firearms': ['[your bespoke gun]', 'sniper shots', 'automatic weapons', 'semi-automatic weapons', 'tranquilizer guns', 'nonlethal shots', 'pre-20th century guns', 'crossbows', 'archery'],
'Leadership': ['guerilla warfare tactics', 'conventional warfare tactics', 'corporate leadership', 'family leadership', 'interpersonal conflict resolution', '[specific sport] coaching'],
'Medicine': ['pharmaceuticals', 'homeopathic methods', 'general practitioner medicine', 'phlebotomy', 'anesthetics', '[specific body part or system] surgery', '[specific system] health', 'sports medicine', 'preventitive medicine', 'psychiatry', 'plastic surgery', 'hematology'],
'Larceny': ['break-ins', 'lockpicking', 'carjacking', 'stealing from [specific target]', 'white-collar'],
'Performance': ['[specific musical instrument]', 'poetry', 'singing [genre of music]', 'dancing [type of dance]', 'illusionism/magic tricks', 'public speaking', 'stand-up comedy'],
'Occult': ['[specific tradition]', '[specific era]', '[specific ritual or practice]', 'seances', 'Ouija boards', 'poppets', 'fringe cults'],
'Melee': ['katanas', 'Western swords', 'daggers', '[your bespoke melee weapon]', 'staves', 'improvised staves', 'baseball bats', 'hockey sticks', 'hatchets', 'battleaxes'],
'Persuasion': ['victims', 'persuading [specific person or type of poeple]', 'seduction', 'persuasive writing', 'advertisements', 'public relations'],
'Politics': ['political debates', '[mortal native country]', '[mortal native region or city]', '[specific mortal foreign country]', '[specific mortal foreign region or city]', '[Camarilla region or city]', '[Anarch region or city]', '[Sabbat region or city]', '[specific organization]'],
'Stealth': ['break-ins', 'surprise attack setup', '[specific type of location]', 'rural/wilderness'],
'Streetwise': ['[region of birth city]', '[region of current home city]', '[region of known city]', '[type of community]', '[type of interaction within a community]'],
'Science': ['engineering', 'quantum physics', 'macro-level physics', 'organic chemistry', 'inorganic chemistry', 'biochemistry', 'microbiology', 'genetics', 'ecology', 'psychology', 'sociology', 'environmental science'],
'Survival': ['hunting', '[type of climate and terrain]', '[specific location]', 'finding [resource]', 'improvised survival equipment', 'wilderness navigation'],
'Subterfuge': ['against [specific type of foe]', 'cover-ups', 'seduction', 'white-collar', 'written', 'spreading rumors'],
'Technology': ['[specific coding language]', 'web development', 'mechanical engineering', 'technology in [specific field/business/organization]', '[brand of technology]']}

//A single object containing advantages matched to predator types.
let predAdvantages = {
    'Alleycat': {'Contacts': [0, 1, 2, 3]}, 'Bagger': {'Iron Gullet': [3]}, 'Blood-Leech': '', 'Cleaver': {'Herd': [2]}, 'Consensualist': '', 
    'Farmer': '',  'Osiris': {'Fame': [0, 1, 2, 3], 'Herd': [0, 1, 2, 3]}, 'Sandman': {'Resources': [1]}, 
    'Scene-Queen': {'Fame': [1], 'Contacts': [1]}, 'Siren': {'Looks': [2]}
}


//A single object containing flaws matched to predator types.
let predFlaws = {
    'Alleycat': '', 'Bagger': {'Enemy': [2]}, 'Blood-Leech': {'Dark Secret: Diablerist': [0, 2], 'Shunned': [0, 2], 'Prey Exclusion (mortals)': [2]},
    'Cleaver': {'Dark Secret: Cleaver': [1]}, 'Consensualist': {'Dark Secret: Masquerade Breacher': [1], 'Prey Exclusion (non-consenting)': [1]},
    'Farmer': {'Feeding Flaw: Vegan': 2}, 'Osiris': {'Enemies': [0, 1, 2], 'Mythic': [0, 1, 2]}, 'Sandman': '',
    'Scene-Queen': {'Influence Flaw: Disliked': [0, 1], 'Prey Exclusion: outside [your scene]': [0, 1]}, 'Siren': {'Enemy': [1]}
}