import { CONFIG } from '../config.js';

const levelToCR = (level) => {
    const cr = level * CONFIG.LEVEL_TO_CR_CONVERSION_FACTOR;
    if (cr < 1) return '1/2'; // Level 1 returns this
    return Math.round(cr);
};

const CRToLevel = (cr) => {
    // We eval to convert all CRs (including fractions) to numbers
    const numericCR = eval(cr);
    const level = numericCR / CONFIG.LEVEL_TO_CR_CONVERSION_FACTOR;
    if (level < 1) return 1;
    return Math.round(level);
};

export const normalizeToCharacterLevels = (creatures) => {
    const characters = [];
    for (const creature of creatures) {
        if (creature.type === 'character') {
            characters.push(creature);
        } else {
            characters.push({
                type: 'character',
                level: CRToLevel(creature.cr),
            });
        }
    }
    return characters;
};

export const normalizeToMonsterCRs = (creatures) => {
    const monsters = [];
    for (const creature of creatures) {
        if (creature.type === 'monster') {
            monsters.push(creature);
        } else {
            monsters.push({
                type: 'monster',
                cr: levelToCR(creature.level),
            });
        }
    }
    return monsters;
};
