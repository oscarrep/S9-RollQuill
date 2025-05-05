export const STAT_NAME_MAP: { [key: string]: string } = {
    STR: 'Strength',
    DEX: 'Dexterity',
    CON: 'Constitution',
    INT: 'Intelligence',
    WIS: 'Wisdom',
    CHA: 'Charisma'
  };
  
  export const REVERSE_STAT_NAME_MAP: { [key: string]: string } = Object.fromEntries(
    Object.entries(STAT_NAME_MAP).map(([key, value]) => [value, key])
  );