export interface User {
    _id: string;
    fireUid: String,
    premium: String, 
    email: String,

    characters: String[],
    races: String[],
    subraces: String[],
    classes: String[],
    subclasses: String[],
    spells: String[],
    items: String[],
    features: String[],
}
