//A function that chooses randomly between multiple choices.
function randomChoice(choices){
    return choices[Math.floor(Math.random()*choices.length)];
}

/*The function that, given an array of dot values, chooses a random index within that array, takes the value at that index, 
removes the value at that index, and returns the value that was at that index.*/
function randomizeAttributeDots(dotsGroup){
    const currDotsIndex = Math.floor(Math.random()*(dotsGroup.length));
    const currDots = dotsGroup[currDotsIndex];
    dotsGroup.splice(currDotsIndex, 1);
    return currDots;
}

//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/values Recalled how to use Object.values() here.

//The function that resets the generator after each use so that it may be used again.
function resetGenerator(){
    character = null;
    distributionList = null;
    randomClan.innerText = '';
    randomDist.innerText = '';
    randomGen.innerText = '';
    if(randomPred !== null){
        randomPred.innerText = '';
    }
}

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
            possibleStorageVariable = randomChoice(staticValues);
            isRandom = true;
        }
        else{
            continue;
        }
    }
    return {possibleStorageVariable, isRandom}; 
}

//A function that checks an attribute that could possibly be a problem against a list of attributes that would be a problem and an
//attribute key and value that is going to be retained no matter what. If the attribute is a problem, a new attribute will be selected from the relevant
//array.
function checkAgainst(possibleOffendingAttribute, constantOffendingAttributes, constantRetainedAttributeValue, 
    possConstantRetainedAttributeValues, constantListToSelectNewAttribute){
    if(constantOffendingAttributes.includes(possibleOffendingAttribute) && 
    possConstantRetainedAttributeValues.includes(constantRetainedAttributeValue)){
        while(constantOffendingAttributes.includes(possibleOffendingAttribute)){
            possibleOffendingAttribute = randomChoice(constantListToSelectNewAttribute);
        }
    }
    return possibleOffendingAttribute;
}

//A function that works similarly to checkAgainst, except that the retained attribute key and value must match rather than not match.
function checkFor(possibleOffendingAttribute, constantOffendingAttributes, constantRetainedAttributeValue, possConstantRetainedAttributeValues, 
    constantListToSelectNewAttribute){
        if(constantOffendingAttributes.includes(possibleOffendingAttribute) && 
        !(possConstantRetainedAttributeValues.includes(constantRetainedAttributeValue))){
            while((constantOffendingAttributes.includes(possibleOffendingAttribute))){
                possibleOffendingAttribute = randomChoice(constantListToSelectNewAttribute);
            }
        }
        return possibleOffendingAttribute;
    }

//The function that shows a conflict in generation and clan status if it exists.
function generationConflictAlert(){
    alert('Thin-bloods are always of 14th gen or higher. Characters of 14th gen or higher are typically thin-bloods.');
    resetGenerator();
    return;
}

//A function that fills in a descriptive paragraph.
function fillDescription(details, paragraph){
    for(let [key, value] of Object.entries(details)){
        if(value !== 0){
            paragraph.innerText += `${key} ${value} `
        }
        else{
            continue;
        }
    }
}