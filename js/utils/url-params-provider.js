import { CONFIG } from '../config.js';
import { TRANSLATIONS } from '../translations.js';

export class URLParamsProvider {
    static #getParams() {
        const urlSearchParams = new URLSearchParams(window.location.search);
        return Object.fromEntries(urlSearchParams.entries());
    }

    static getLanguage() {
        const params = this.#getParams();
        const lang = params['lang'];
        if (!lang || !TRANSLATIONS[lang.toUpperCase()]) return CONFIG.DEFAULT_LANG;
        return lang.toUpperCase();
    }

    static hasSpecifiedLanguage() {
        const params = this.#getParams();
        const lang = params['lang'];
        return lang && TRANSLATIONS[lang.toUpperCase()];
    }
}
