import { CONFIG } from '../config.js';

export const calculate = (characters, monsters, difficultyAdjustments) => {
    if (characters.length === 0 || monsters.length === 0) return null;

    const avgPartyLevel = calculateAvgPartyLevel(characters);

    const totalXP = calculateTotalXP(monsters);

    let monstersDifficultyMultiplier = getMonstersDifficultyMultiplier(characters, monsters, difficultyAdjustments);

    const adjustedTotalXP = calculateTotalXP(monsters) * monstersDifficultyMultiplier;

    const partyTier = CONFIG.XP_PER_CHARACTER_LEVEL[avgPartyLevel];

    const { easy, medium, hard, deadly } = partyTier;

    const easyThreshold = easy * characters.length;
    const mediumThreshold = medium * characters.length;
    const hardThreshold = hard * characters.length;
    const deadlyThreshold = deadly * characters.length;

    let difficulty = null;

    if (adjustedTotalXP >= deadlyThreshold) {
        difficulty = 'deadly';
    } else if (adjustedTotalXP >= hardThreshold) {
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
        partyDailyBudget += CONFIG.DAILY_XP_BUDGET[character.level];
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
            deadly: deadlyThreshold,
        },
        difficultyMultiplier: monstersDifficultyMultiplier,
        difficulty: difficulty,
        xpPerCharacter: Math.floor(adjustedTotalXP / characters.length),
        partyDailyBudget: partyDailyBudget,
        partyDailyBudgetPercentage: Math.floor((adjustedTotalXP / partyDailyBudget) * 100),
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
    const getBaseDifficultyMultiplierIndex = (monsters) => {
        if (monsters.length >= CONFIG.MAX_MONSTERS_AMOUNT) return CONFIG.MONSTERS_AMOUNT_MULTIPLIER.length - 1;
        for (let i = 0; i < CONFIG.MONSTERS_AMOUNT_MULTIPLIER.length; i++) {
            const multiplierConfig = CONFIG.MONSTERS_AMOUNT_MULTIPLIER[i];
            if (multiplierConfig.range.find((x) => x === monsters.length)) {
                return i;
            }
        }
    };

    let monstersThresholdMultiplierIndex = getBaseDifficultyMultiplierIndex(monsters);

    if (characters.length >= CONFIG.BIG_PARTY_SIZE && monstersThresholdMultiplierIndex > 0) {
        monstersThresholdMultiplierIndex -= 1;
    }

    let monstersThresholdMultiplier = CONFIG.MONSTERS_AMOUNT_MULTIPLIER[monstersThresholdMultiplierIndex].multiplier;

    if (characters.length <= CONFIG.SMALL_PARTY_SIZE) {
        monstersThresholdMultiplier +=
            monsters.length >= CONFIG.MAX_MONSTERS_AMOUNT
                ? CONFIG.XP_MULTIPLIERS.TOO_MANY_ENEMIES_SMALL_PARTY
                : CONFIG.XP_MULTIPLIERS.SMALL_PARTY;
    }
    if (monsters.length == 1 && characters.length >= CONFIG.BIG_PARTY_SIZE) {
        monstersThresholdMultiplier += CONFIG.XP_MULTIPLIERS.BIG_PARTY;
    }

    if (difficultyAdjustments.levelOneFeatChk) {
        monstersThresholdMultiplier += CONFIG.XP_MULTIPLIERS.LEVEL_ONE_FEAT;
    }

    if (difficultyAdjustments.relevantCombatMagicItems) {
        monstersThresholdMultiplier += CONFIG.XP_MULTIPLIERS.RELEVANT_COMBAT_MAGIC_ITEMS;
    }

    if (difficultyAdjustments.newSubclasses) {
        monstersThresholdMultiplier += CONFIG.XP_MULTIPLIERS.NEW_SUBCLASSES;
    }

    if (difficultyAdjustments.combatOptimizedCharacters) {
        monstersThresholdMultiplier += CONFIG.XP_MULTIPLIERS.COMBAT_OPTIMIZED_CHARACTERS;
    }

    return monstersThresholdMultiplier;
};
