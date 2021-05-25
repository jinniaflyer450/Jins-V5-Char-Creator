class Character{
    constructor(clan, generation, attrBlock, skillBlock, disBlock, predatorType, specialties, name='Character', humanity=7, bloodPotency=1){
        this.name = name;
        this.clan = clan;
        this.generation = generation;
        this.bloodPotency = bloodPotency;
        this.predatorType = predatorType;
        this.specialties = specialties;
        this.humanity = humanity;
        this.attributes = attrBlock;
        this.skills = skillBlock;
        this.disciplines = disBlock;
    }
}