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
        strength: number;
        dexterity: number;
        constitution: number;
        intelligence: number;
        wisdom: number;
        charisma: number;
    };
    skills: string[];
    expertise: string[];
    _id: string;
}
