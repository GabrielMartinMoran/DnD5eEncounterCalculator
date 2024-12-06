import { CONFIG } from '../config.js';
import { normalizeToCharacterLevels, normalizeToMonsterCRs } from '../helpers/creature-normalizer.js';

export const calculate = (allies, enemies, difficultyAdjustments) => {
    if (allies.length === 0 || enemies.length === 0) return null;

    const characters = normalizeToCharacterLevels(allies);
    const monsters = normalizeToMonsterCRs(enemies);

    const avgPartyLevel = calculateAvgPartyLevel(characters);

    const totalXP = calculateTotalXP(monsters);

    let monstersDifficultyMultiplier = getMonstersDifficultyMultiplier(characters, monsters, difficultyAdjustments);

    const adjustedTotalXP = Math.floor(calculateTotalXP(monsters) * monstersDifficultyMultiplier);

    const partyTier = CONFIG.XP_PER_CHARACTER_LEVEL[avgPartyLevel];

    const { easy, medium, hard } = partyTier;

    const easyThreshold = easy * characters.length;
    const mediumThreshold = medium * characters.length;
    const hardThreshold = hard * characters.length;

    let difficulty = null;

    if (adjustedTotalXP >= hardThreshold) {
        difficulty = 'hard';
    } else if (adjustedTotalXP >= mediumThreshold) {
        difficulty = 'medium';
    } else if (adjustedTotalXP >= easyThreshold) {
        difficulty = 'easy';
    } else {
        difficulty = 'trivial';
    }

    let partyDailyBudget = 0;
    for (const character of characters) {
        partyDailyBudget +=
            CONFIG.XP_PER_CHARACTER_LEVEL[character.level].medium * CONFIG.MAX_RECOMMENDED_MEDIUM_ENCOUNTERS_PER_DAY;
    }

    return {
        avgPartyLevel: avgPartyLevel,
        totalXP: totalXP,
        adjustedTotalXP: adjustedTotalXP,
        partyTier: partyTier,
        thresholds: {
            easy: easyThreshold,
            medium: mediumThreshold,
            hard: hardThreshold,
        },
        difficultyMultiplier: monstersDifficultyMultiplier,
        difficulty: difficulty,
        xpPerCharacter: Math.floor(adjustedTotalXP / characters.length),
        partyDailyBudget: partyDailyBudget,
        partyDailyBudgetPercentage: Math.floor((adjustedTotalXP / partyDailyBudget) * 100),
        isLegendaryMonster: difficultyAdjustments.isLegendaryMonster,
    };
};

const calculateAvgPartyLevel = (characters) => {
    const levels = characters.map((c) => c.level);
    const avgLevel = levels.reduce((a, b) => a + b) / levels.length;
    return Math.floor(avgLevel);
};

const calculateTotalXP = (monsters) => {
    let totalXP = 0;
    for (const monster of monsters) {
        totalXP += CONFIG.MONSTERS_XP_PER_CR[monster.cr];
    }
    return totalXP;
};

const getMonstersDifficultyMultiplier = (characters, monsters, difficultyAdjustments) => {
    let monstersThresholdMultiplier = 1;

    if (
        monsters.length == 1 &&
        characters.length >= CONFIG.BIG_PARTY_SIZE &&
        !difficultyAdjustments.isLegendaryMonster
    ) {
        monstersThresholdMultiplier += CONFIG.XP_MULTIPLIERS.BIG_PARTY;
    }

    if (difficultyAdjustments.relevantCombatMagicItems) {
        monstersThresholdMultiplier += CONFIG.XP_MULTIPLIERS.RELEVANT_COMBAT_MAGIC_ITEMS;
    }

    if (difficultyAdjustments.combatOptimizedCharacters) {
        monstersThresholdMultiplier += CONFIG.XP_MULTIPLIERS.COMBAT_OPTIMIZED_CHARACTERS;
    }

    if (monstersThresholdMultiplier < CONFIG.MIN_POSSIBLE_MULTIPLIER) {
        monstersThresholdMultiplier = CONFIG.MIN_POSSIBLE_MULTIPLIER;
    }

    // Round to 2 decimals
    return Math.round(monstersThresholdMultiplier * 100) / 100;
};
