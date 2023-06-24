import { CONFIG } from '../config.js';
import { locateStr } from '../utils/lang-string-provider.js';
import { titleCase } from '../utils/string-utils.js';

export const Results = (results) => {
    const renderDifficulty = (difficulty) => {
        return html`<b class="${difficulty}Encounter">${titleCase(locateStr(difficulty))}</b>`;
    };

    const calculateTier = (avgPartyLevel) => {
        for (const tierConfig of CONFIG.CHARACTER_TIERS) {
            if (tierConfig.levels[0] <= avgPartyLevel && tierConfig.levels[1] >= avgPartyLevel) {
                return tierConfig.tier;
            }
        }
    };

    return html` <div>
        <div>
            <div>
                <span
                    ><b>${locateStr('avgPartyLevel')}: </b> ${results.avgPartyLevel} (${locateStr('tier')}
                    ${calculateTier(results.avgPartyLevel)})</span
                >
            </div>

            <div class="verticalMargin">
                <b>${locateStr('difficulty')}: </b> ${renderDifficulty(results.difficulty)}
            </div>
            <div class="horizontalMargin verticalMargin">
                <div><b>${locateStr('totalXP')}: </b> ${results.totalXP}</div>
                <div><b>${locateStr('difficultyMultiplier')}: </b> ${results.difficultyMultiplier}</div>
                <div><b>${locateStr('adjustedXP')}: </b> ${results.adjustedTotalXP}</div>
            </div>

            <div class="horizontalMargin verticalMargin">
                <i>
                    ${{
                        trivial: locateStr('trivialExplanation'),
                        easy: locateStr('easyExplanation'),
                        medium: locateStr('mediumExplanation'),
                        hard: locateStr('hardExplanation'),
                        deadly: locateStr('deadlyExplanation'),
                    }[results.difficulty]}
                </i>
            </div>
            <div class="horizontalMargin verticalMargin">
                <b> ${locateStr('referenceThresholds')}:</b>
                <ul>
                    <li>
                        <b>${renderDifficulty('trivial')}:</b> ${locateStr('lessThan')} ${results.thresholds.easy} XP
                    </li>
                    <li><b>${renderDifficulty('easy')}:</b> ${locateStr('from')} ${results.thresholds.easy} XP</li>
                    <li><b>${renderDifficulty('medium')}:</b> ${locateStr('from')} ${results.thresholds.medium} XP</li>
                    <li><b>${renderDifficulty('hard')}:</b> ${locateStr('from')} ${results.thresholds.hard} XP</li>
                    <li><b>${renderDifficulty('deadly')}:</b> ${locateStr('from')} ${results.thresholds.deadly} XP</li>
                </ul>
            </div>
            <div>
                <div>
                    <b>${locateStr('dailyXPBudget')}:</b>
                    <span class="${results.partyDailyBudgetPercentage > 100 ? 'deadlyEncounter' : ''}"
                        >${results.adjustedTotalXP}</span
                    >
                    / ${results.partyDailyBudget} XP
                </div>
                <div class="verticalMargin">
                    ${locateStr('dailyXPBudgetPercentage').replace(
                        '{perc}',
                        html`<b>${results.partyDailyBudgetPercentage}</b>`
                    )}
                </div>
                <div class="horizontalMargin verticalMargin"><i>${locateStr('dailyXPBudgetExplanation')}</i></div>
            </div>
        </div>
    </div>`;
};
