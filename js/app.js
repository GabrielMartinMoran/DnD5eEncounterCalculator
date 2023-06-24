'use strict';

import { CONFIG } from './config.js';

import { Main } from './components/main.js';
import { URLParamsProvider } from './utils/url-params-provider.js';

/* DATA */

/* CODE */

const main = () => {
    if (!URLParamsProvider.hasSpecifiedLanguage()) {
        const url = new URL(window.location.href);
        url.searchParams.set('lang', CONFIG.DEFAULT_LANG);
        window.location.replace(url);
    }

    document.getElementById('app').innerHTML = Main();
};

main();
