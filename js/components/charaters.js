import { locateStr } from '../utils/lang-string-provider.js';
import { HTMLElement, onRender } from '../utils/render-utils.js';
import { uuid4 } from '../utils/uuid.js';

export const Characters = () => {
    const addCharacter = () => {
        const id = `chr-${uuid4()}`;
        const levelSelectId = `level-${id}`;
        const amountInputId = `amount-${id}`;
        const deleteBtnId = `removeCharacter-${id}`;
        $('#charactersList').appendChild(
            HTMLElement(
                html`
                    <div>
                        <label>
                            ${locateStr('amount')}
                            <input class="amountInput" id="${amountInputId}" type="number" min="1" value="1" />
                        </label>
                        <label>
                            ${locateStr('level')}
                            <select id="${levelSelectId}" value="1">
                                ${[...Array(20).keys()].map((x) => html`<option value=${x + 1}>${x + 1}</option>`)}
                            </select>
                        </label>
                        <button id="${deleteBtnId}">✖</button>
                    </div>
                `,
                id
            )
        );
        onRender(() => ($(`#${deleteBtnId}`).onclick = () => removeCharacter(id)));
        return id;
    };
    const removeCharacter = (id) => document.getElementById(id).remove();

    onRender(() => {
        $('#addCharacterBtn').onclick = () => addCharacter();
    });

    return html`
        <div class="flex1">
            <div class="verticalMargin">
                <b>${locateStr('characters')}</b>
                <button class="horizontalMargin" id="addCharacterBtn">+ ${locateStr('add')}</button>
            </div>
            <div class="horizontalMargin" id="charactersList"></div>
        </div>
    `;
};
