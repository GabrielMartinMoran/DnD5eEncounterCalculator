export const collectDifficultyAdjustments = () => {
    return {
        levelOneFeatChk: $('#levelOneFeatChk').checked,
        relevantCombatMagicItems: $('#relevantCombatMagicItemsChk').checked,
        newSubclasses: $('#newSubclassesChk').checked,
        combatOptimizedCharacters: $('#combatOptimizedCharactersChk').checked,
    };
};
