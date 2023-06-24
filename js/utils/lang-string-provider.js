import { TRANSLATIONS } from '../translations.js';
import { URLParamsProvider } from './url-params-provider.js';

export const locateStr = (key) => {
    const lang = URLParamsProvider.getLanguage();
    const langConfig = TRANSLATIONS[lang];
    if (!langConfig || !langConfig[key]) throw `'${key}' key not found for ${langConfig} language`;
    return langConfig[key];
};
