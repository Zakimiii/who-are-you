import config from '@constants/config';
import OneSignal from 'onesignal-node';
import env from '@env/env.json';
import { getValueWithLangs } from '@locales';
import { ClientError } from '@extension/Error';

const client = new OneSignal.Client({
    userAuthKey: env.ONESIGNAL.USER_AUTH_KEY,
    app: {
        appAuthKey: env.ONESIGNAL.APP_AUTH_KEY,
        appId: env.ONESIGNAL.APP_ID,
    },
});

export default class Notification {
    static getTimer(key) {
        switch (key) {
            case 'S':
                return 4000;
            case 'M':
                return 8000;
            case 'L':
                return 12000;
        }
    }

    constructor() {}

    async push({
        tt_key,
        icon = config.CURRENT_APP_URL + '/images/selfinity-mini-logo2.png',
        url = '/',
        ids = [],
    }) {
        if (!tt_key || !icon || !url || !ids) return false;

        var notification =
            ids.length > 0
                ? new OneSignal.Notification({
                      url,
                      headings: getValueWithLangs(
                          'notifications.' + tt_key + '.title'
                      ),
                      contents: getValueWithLangs(
                          'notifications.' + tt_key + '.body'
                      ),
                      include_player_ids: ids,
                  })
                : new OneSignal.Notification({
                      url,
                      headings: getValueWithLangs(
                          'notifications.' + tt_key + '.title'
                      ),
                      contents: getValueWithLangs(
                          'notifications.' + tt_key + '.body'
                      ),
                  });

        client.sendNotification(notification, (e, httpResponse, data) => {
            if (e) {
                throw new ClientError({
                    error: e,
                    tt_key: 'errors.invalid_response_from_server',
                });
            } else {
                return true;
            }
        });
    }
}

export var OneSignalWindow = [];
export var getOneSignalWindow = () => {
    try {
        if (process.env.BROWSER && OneSignalWindow instanceof Array) {
            OneSignalWindow = window.OneSignal || [];
            OneSignalWindow.push(function() {
                OneSignalWindow.init({
                    appId: env.ONESIGNAL.APP_ID,
                });
            });
            return OneSignalWindow;
        } else {
            return OneSignalWindow;
        }
    } catch (e) {
        return OneSignalWindow;
    }
};
