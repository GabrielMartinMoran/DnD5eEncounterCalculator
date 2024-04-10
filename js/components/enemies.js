import { collectEnemies } from '../helpers/collectors.js';
import { locateStr } from '../utils/lang-string-provider.js';
import { HTMLElement, onRender } from '../utils/render-utils.js';
import { uuid4 } from '../utils/uuid.js';
import { CombatantEditor } from './combatant-editor.js';

export const Enemies = () => {
    const addEnemy = (type) => {
        const id = `enemy-${uuid4()}`;
        const deleteBtnId = `removeEnemy-${id}`;
        $('#enemiesList').appendChild(HTMLElement(CombatantEditor(id, type, deleteBtnId), id));
        onRender(() => ($(`#${deleteBtnId}`).onclick = () => removeEnemy(id)));
        return id;
    };

    const removeEnemy = (id) => {
        document.getElementById(id).remove();
        onchange();
    };

    onRender(() => {
        $('#addEnemyMonsterBtn').onclick = () => addEnemy('monster');
        $('#addEnemyCharacterBtn').onclick = () => addEnemy('character');
    });

    const onchange = () => {
        const monsters = collectEnemies();
        const isLegendaryMonsterChk = $('#isLegendaryMonsterChk');
        const isLegendaryMonsterChkLabel = $('#isLegendaryMonsterChkLabel');
        if (monsters.length === 1) {
            isLegendaryMonsterChk.disabled = false;
            isLegendaryMonsterChkLabel.classList.remove('grayText');
        } else {
            isLegendaryMonsterChk.disabled = true;
            isLegendaryMonsterChk.checked = false;
            isLegendaryMonsterChkLabel.classList.add('grayText');
        }
    };

    return html`<div class="flex1">
        <div class="verticalMargin">
            <strong class="combatSideTitle">${locateStr('enemies')}</strong>
            <span class="horizontalMargin"></span>
            <button class="addCombatantBtn" id="addEnemyMonsterBtn">🧌 ${locateStr('addMonster')}</button>
            <button class="addCombatantBtn" id="addEnemyCharacterBtn">🧙🏻‍♂️ ${locateStr('addCharacter')}</button>
        </div>
        <div class="horizontalMargin" id="enemiesList"></div>
    </div>`;
};
