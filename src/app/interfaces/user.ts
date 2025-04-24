export interface User {
    _id: string;
    fireUid: string,
    premium: string, 
    email: string,

    characters: string[],
    races: string[],
    subraces: string[],
    classes: string[],
    subclasses: string[],
    spells: string[],
    items: string[],
    features: string[],
}
