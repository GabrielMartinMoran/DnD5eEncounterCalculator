import { locateStr } from '../utils/lang-string-provider.js';
import { titleCase } from '../utils/string-utils.js';

export const Results = (results) => {
    const renderDifficulty = (difficulty) => {
        return html`<b class="${difficulty}Encounter">${titleCase(locateStr(difficulty))}</b>`;
    };

    const calculateTier = (avgPartyLevel) => {};

    return html` <div>
        <div>
            <div>
                <span><b>${locateStr('avgPartyLevel')}: </b> ${results.avgPartyLevel} </span>
                <div class="horizontalMargin"></div>
            </div>
            <div class="verticalMargin">
                <b>${locateStr('difficulty')}: </b> ${renderDifficulty(results.difficulty)}
            </div>
            <div class="horizontalMargin verticalMargin">
                <span><b>${locateStr('totalXP')}: </b> ${results.totalXP} </span> |
                <span><b>${locateStr('adjustedXP')}: </b> ${results.adjustedTotalXP} </span> |
                <span><b>${locateStr('difficultyMultiplier')}: </b> ${results.difficultyMultiplier} </span>
            </div>
            <div class="horizontalMargin verticalMargin">
                ${{
                    trivial: locateStr('trivialExplanation'),
                    easy: locateStr('easyExplanation'),
                    medium: locateStr('mediumExplanation'),
                    hard: locateStr('hardExplanation'),
                    deadly: locateStr('deadlyExplanation'),
                }[results.difficulty]}
            </div>
            <div class="verticalMargin">
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
        </div>
    </div>`;
};
