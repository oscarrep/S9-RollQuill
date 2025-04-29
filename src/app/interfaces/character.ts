export interface Character {
    createdBy: string;
    name: string;
    race: string;
    subrace?: string;
    class: string;
    subclass: string;
    level: number;
    speed?: number;
    ability_scores: {
        STR: [{ name: 'Strength' }, { value: number }]
        DEX: [{ name: 'Dexterity' }, { value: number }]
        CON: [{ name: 'Constitution' }, { value: number }]
        INT: [{ name: 'Intelligence' }, { value: number }]
        WIS: [{ name: 'Wisdom' }, { value: number }]
        CHA: [{ name: 'Charisma' }, { value: number }]
    };
    savingThrows: string[];
    classSkills: string[];
    backgroundSkills: string[];
    expertise: string[];
    image?: string;
    _id?: string;
}
