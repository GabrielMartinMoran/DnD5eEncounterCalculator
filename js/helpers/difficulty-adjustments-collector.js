export const collectDifficultyAdjustments = () => {
    return {
        relevantCombatMagicItems: $('#relevantCombatMagicItemsChk').checked,
        combatOptimizedCharacters: $('#combatOptimizedCharactersChk').checked
    };
};
