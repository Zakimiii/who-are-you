import 'babel-core/register';
import 'babel-polyfill';
import 'whatwg-fetch';
import store from 'store';
import { Set, Map, fromJS, List } from 'immutable';
import '@assets/stylesheets/app.scss';
import plugins from '@utils/JsPlugins';
import Iso from 'iso';
import clientRender from '@infrastructure/client_render';
import ConsoleExports from '@utils/ConsoleExports';
import { determineViewMode } from '@utils/Links';
import frontendLogger from '@utils/FrontendLogger';
import * as cu2 from '@network/current_user';
import env from '@env/env.json';
import extension from '@extension';

window.addEventListener('error', frontendLogger);

const CMD_LOG_T = 'log-t';
const CMD_LOG_TOGGLE = 'log-toggle';
const CMD_LOG_O = 'log-on';

//FIXME: what is it?
// try {
// if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'staging') {
//     // Adds some object refs to the global window object
//     ConsoleExports.init(window);
// }
// } catch (e) {
//     console.error(e);
// }

function runApp(initial_state) {
    process.env.NODE_ENV == 'development' &&
        console.log('Initial state', initial_state);
    const konami = {
        code: 'xyzzy',
        enabled: false,
    };
    const buff = konami.code.split('');
    const cmd = command => {
        console.log('got command:' + command);
        switch (command) {
            case CMD_LOG_O:
                konami.enabled = false;
            case CMD_LOG_TOGGLE:
            case CMD_LOG_T:
                konami.enabled = !konami.enabled;
                return 'api logging ' + konami.enabled;
            default:
                return 'That command is not supported.';
        }
        //return 'done';
    };

    const enableKonami = () => {
        if (!window.s) {
            console.log('The cupie doll is yours.');
            window.s = command => {
                return cmd.call(this, command);
            };
        }
    };

    window.document.body.onkeypress = e => {
        buff.shift();
        buff.push(e.key);
        if (buff.join('') === konami.code) {
            enableKonami();
            cmd(CMD_LOG_T);
        }
    };

    if (window.location.hash.indexOf('#' + konami.code) === 0) {
        enableKonami();
        cmd(CMD_LOG_O);
    }

    plugins(env);

    initial_state.app.viewMode = determineViewMode(window.location.search);

    const locale = store.get('language');
    if (locale) initial_state.user.locale = locale;

    initial_state.auth.current_user = cu2.setInitialCurrentUser(store);

    const location = `${window.location.pathname}${window.location.search}${
        window.location.hash
    }`;

    try {
        clientRender(initial_state);
    } catch (error) {
        console.error(error);
    }
}

if (!window.Intl) {
    require.ensure(
        ['intl/dist/Intl'],
        require => {
            window.IntlPolyfill = window.Intl = require('intl/dist/Intl');
            require('intl/locale-data/jsonp/en-US.js');
            require('intl/locale-data/jsonp/es.js');
            require('intl/locale-data/jsonp/ru.js');
            require('intl/locale-data/jsonp/fr.js');
            require('intl/locale-data/jsonp/it.js');
            require('intl/locale-data/jsonp/ko.js');
            require('intl/locale-data/jsonp/ja.js');
            Iso.bootstrap(runApp);
        },
        'IntlBundle'
    );
} else {
    Iso.bootstrap(runApp);
}
