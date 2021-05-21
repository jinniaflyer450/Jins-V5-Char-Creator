class Character{
    constructor(clan, generation, attrBlock, skillBlock, disBlock, name='Character', humanity=7, bloodPotency=1, predatorType=null){
        this.name = name;
        this.clan = clan;
        this.generation = generation;
        this.bloodPotency = bloodPotency;
        this.predatorType = predatorType;
        this.humanity = humanity;
        this.attributes = attrBlock;
        this.skills = skillBlock;
        this.disciplines = disBlock;
    }
}