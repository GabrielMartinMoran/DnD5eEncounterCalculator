import { CONFIG } from '../config.js';
import { locateStr } from '../utils/lang-string-provider.js';
import { HTMLElement, onRender } from '../utils/render-utils.js';
import { uuid4 } from '../utils/uuid.js';

export const Monsters = () => {
    const addMonster = () => {
        const id = `chr-${uuid4()}`;
        const crSelectId = `cr-${id}`;
        const amountInputId = `amount-${id}`;
        const deleteBtnId = `removeMonster-${id}`;
        $('#monstersList').appendChild(
            HTMLElement(
                html`
                    <div>
                        <label>
                            ${locateStr('amount')}
                            <input class="amountInput" id="${amountInputId}" type="number" min="1" value="1" />
                        </label>
                        <label>
                            CR
                            <select id="${crSelectId}" value="${CONFIG.CHALLENGE_RATINGS[0]}">
                                ${CONFIG.CHALLENGE_RATINGS.map(
                                    (x) => html`<option value="${x}">${x} (${CONFIG.MONSTERS_XP_PER_CR[x]} XP)</option>`
                                )}
                            </select>
                        </label>
                        <button id="${deleteBtnId}">✖</button>
                    </div>
                `,
                id
            )
        );
        onRender(() => ($(`#${deleteBtnId}`).onclick = () => removeMonster(id)));
        return id;
    };

    const removeMonster = (id) => document.getElementById(id).remove();

    onRender(() => {
        $('#addMonsterBtn').onclick = () => addMonster();
    });

    return html`<div class="flex1">
        <div class="verticalMargin">
            <b>${locateStr('monsters')}</b>
            <button class="horizontalMargin" id="addMonsterBtn">+ ${locateStr('add')}</button>
        </div>
        <div class="horizontalMargin" id="monstersList"></div>
    </div>`;
};
