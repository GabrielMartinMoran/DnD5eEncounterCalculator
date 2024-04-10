import { locateStr } from '../utils/lang-string-provider.js';
import { HTMLElement, onRender } from '../utils/render-utils.js';
import { uuid4 } from '../utils/uuid.js';
import { CombatantEditor } from './combatant-editor.js';

export const Allies = () => {
    const addAlly = (type) => {
        const id = `ally-${uuid4()}`;
        const deleteBtnId = `removeAlly-${id}`;
        $('#alliesList').appendChild(HTMLElement(CombatantEditor(id, type, deleteBtnId), id));
        onRender(() => ($(`#${deleteBtnId}`).onclick = () => removeAlly(id)));
        return id;
    };

    const removeAlly = (id) => document.getElementById(id).remove();

    onRender(() => {
        $('#addAllyCharacterBtn').onclick = () => addAlly('character');
        $('#addAllyMonsterBtn').onclick = () => addAlly('monster');
    });

    return html`
        <div class="flex1">
            <div class="verticalMargin">
                <strong class="combatSideTitle">${locateStr('allies')}</strong>
                <span class="horizontalMargin"></span>
                <button class="addCombatantBtn" id="addAllyCharacterBtn">🧙🏻‍♂️ ${locateStr('addCharacter')}</button>
                <button class="addCombatantBtn" id="addAllyMonsterBtn">🧌 ${locateStr('addMonster')}</button>
            </div>
            <div class="horizontalMargin" id="alliesList"></div>
        </div>
    `;
};
