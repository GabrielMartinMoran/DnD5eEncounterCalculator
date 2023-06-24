import { onRender } from '../utils/render-utils.js';
import { calculate } from '../utils/encounter-calculator.js';
import { Characters } from './charaters.js';
import { Monsters } from './monsters.js';
import { collectCharacters } from '../helpers/characters-collector.js';
import { collectMonsters } from '../helpers/monsters-collector.js';
import { DifficultyAdjutments } from './difficulty-adjustments.js';
import { collectDifficultyAdjustments } from '../helpers/difficulty-adjustments-collector.js';
import { Results } from './results.js';
import { locateStr } from '../utils/lang-string-provider.js';
import { URLParamsProvider } from '../utils/url-params-provider.js';

export const Main = () => {
    const doCalculation = () => {
        const characters = collectCharacters();
        const monsters = collectMonsters();
        if (characters.length === 0 || monsters.length === 0) return;
        const difficultyAdjustments = collectDifficultyAdjustments();
        const result = calculate(characters, monsters, difficultyAdjustments);
        $('#results').innerHTML = Results(result);
    };

    const generateLangURL = (lang) => {
        return `${window.location.origin}${window.location.pathname}?lang=${lang}`;
    };

    onRender(() => {
        $('#calculateBtn').onclick = () => doCalculation();
    });

    return html`
        <h1 id="title">${locateStr('title')}</h1>
        <div>
            ${URLParamsProvider.getLanguage() === 'ES'
                ? 'Español'
                : html`<a href="${generateLangURL('ES')}">Español</a>`}
            |
            ${URLParamsProvider.getLanguage() === 'EN'
                ? 'English'
                : html`<a href="${generateLangURL('EN')}">English</a>`}
        </div>
        <div class="row verticalMargin">
            <div class="column flex1 horizontalMargin">
                <div class="column">${Characters()} ${Monsters()}</div>
                <button class="verticalMargin" id="calculateBtn">${locateStr('calculate')}</button>
                <div class="horizontalMargin flex1" id="results"></div>
            </div>
            <div class="flex1 horizontalMargin">${DifficultyAdjutments()}</div>
        </div>
    `;
};
