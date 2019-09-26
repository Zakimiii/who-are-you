import React from 'react';
import { renderToString } from 'react-dom/server';
import ServerHTML from '@pages/ServerHTML';
import serverRender from '@webserver/server_render';
import models from 'db/models';
import secureRandom from 'secure-random';
import ErrorPage from '@pages/ServerError';
import { determineViewMode } from '@utils/Links';
import { getSupportedLocales } from '@network/misc';

const path = require('path');
const ROOT = path.join(__dirname, '../..');
const DB_RECONNECT_TIMEOUT =
    process.env.NODE_ENV === 'development' ? 1000 * 60 * 60 : 1000 * 60 * 10;

const supportedLocales = getSupportedLocales();

async function appRender(ctx, locales = false, resolvedAssets = false) {
    ctx.state.requestTimer.startTimer('appRender_ms');
    const store = {};
    // This is the part of SSR where we make session-specific changes:
    try {
        let userPreferences = {};
        if (!userPreferences.locale) {
            let locale = ctx.getLocaleFromHeader();
            if (locale) locale = locale.substring(0, 2);
            const supportedLocales = locales ? locales : getSupportedLocales();
            const localeIsSupported = supportedLocales.find(l => l === locale);
            if (!localeIsSupported) locale = 'ja';
            userPreferences.locale = locale;
        }
        // ... and that's the end of user-session-related SSR
        const initial_state = {
            app: {
                viewMode: determineViewMode(ctx.request.search),
            },
        };

        const { body, title, statusCode } = await serverRender(
            ctx.request.url,
            initial_state,
            ErrorPage,
            userPreferences,
            ctx.state.requestTimer
        );

        //TODO: remove meta
        const meta = '';

        let assets;
        // If resolvedAssets argument parameter is falsey we infer that we are in
        // development mode and therefore resolve the assets on each render.
        if (!resolvedAssets) {
            // Assets name are found in `webpack-stats` file
            const assets_filename = ROOT + '/../tmp/webpack-stats-dev.json';
            assets = require(assets_filename);
            delete require.cache[require.resolve(assets_filename)];
        } else {
            assets = resolvedAssets;
        }
        const props = { body, assets, title, meta };
        ctx.status = statusCode;
        ctx.body =
            '<!DOCTYPE html>' + renderToString(<ServerHTML {...props} />);
    } catch (err) {
        // Render 500 error page from server
        const { error, redirect } = err;
        if (error) throw error;

        // Handle component `onEnter` transition
        if (redirect) {
            const { pathname, search } = redirect;
            ctx.redirect(pathname + search);
        }

        throw err;
    }

    ctx.state.requestTimer.stopTimer('appRender_ms');
}

appRender.dbStatus = { ok: true };
module.exports = appRender;
