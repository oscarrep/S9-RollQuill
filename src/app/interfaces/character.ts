export interface Character {
    createdBy: string;
    name: string;
    race: string;
    subrace: string;
    class: string;
    subclass: string;
    level: number;
    speed: number;
    stats: {
        Strength: number;
        Dexterity: number;
        Constitution: number;
        Intelligence: number;
        Wisdom: number;
        Charisma: number;
    };
    savingThrows: string[];
    skills: string[];
    expertise: string[];
    image: string;
    _id: string;
}
