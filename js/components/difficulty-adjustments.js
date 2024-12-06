import { locateStr } from '../utils/lang-string-provider.js';
import { HTMLElement, onRender } from '../utils/render-utils.js';

export const DifficultyAdjutments = () => {
    onRender(() => {});

    return html`
        <div class="mainColumn">
            <div><b>${locateStr('difficultyAdjustmentOptions')}</b></div>
            <div class="verticalMargin">
                <small>${locateStr('difficultyAdjustmentOptionsDisclaimer')}</small>
            </div>
            <div class="column verticalMargin">
                <label class="verticalMargin flex1"
                    ><input type="checkbox" id="relevantCombatMagicItemsChk" />${locateStr(
                        'relevanCombatMagicItems'
                    )}</label
                >
                <label class="verticalMargin flex1"
                    ><input type="checkbox" id="combatOptimizedCharactersChk" />${locateStr(
                        'obtimizedCharacters'
                    )}</label
                >
            </div>
        </div>
    `;
};
