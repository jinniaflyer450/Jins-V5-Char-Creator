//Generations available to PCs.
const generations = ['tenth', 'eleventh', 'twelfth', 'thirteenth', 'fourteenthEtc'];

//Predator types.
const predTypes = ['Alleycat', 'Bagger', 'Blood-Leech', 'Cleaver', 'Consensualist', 'Farmer', 'Osiris', 'Sandman', 'Scene-Queen', 'Siren'];

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

//A single object containing general advantages.

//A single object containing general flaws.