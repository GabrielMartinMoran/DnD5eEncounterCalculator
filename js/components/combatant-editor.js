import { CONFIG } from '../config.js';
import { locateStr } from '../utils/lang-string-provider.js';

export const CombatantEditor = (id, type, deleteBtnId) => {
    const amountInputId = `amount-${id}`;
    const selectId = type === 'character' ? `level-${id}` : `cr-${id}`;
    return html`
        <div>
            <span>${type === 'character' ? '🧙🏻‍♂️' : '🧌'}</span>
            <label>
                ${locateStr('amount')}
                <input class="amountInput" id="${amountInputId}" type="number" min="1" value="1" />
            </label>
            ${type === 'character'
                ? html`
                      <label>
                          <span class="levelCRLabel">${locateStr('level')}</span>
                          <select class="levelCRSelect" id="${selectId}" value="1">
                              ${[...Array(20).keys()].map((x) => html`<option value=${x + 1}>${x + 1}</option>`)}
                          </select>
                      </label>
                  `
                : html`
                      <label>
                          <span class="levelCRLabel">CR</span>
                          <select class="levelCRSelect" id="${selectId}" value="${CONFIG.CHALLENGE_RATINGS[0]}">
                              ${CONFIG.CHALLENGE_RATINGS.map(
                                  (x) => html`<option value="${x}">${x} (${CONFIG.MONSTERS_XP_PER_CR[x]} XP)</option>`
                              )}
                          </select>
                      </label>
                  `}
            <button id="${deleteBtnId}">✖</button>
        </div>
    `;
};
