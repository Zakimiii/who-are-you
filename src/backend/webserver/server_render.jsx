import Iso from 'iso';
import React from 'react';
import { render } from 'react-dom';
import { renderToString } from 'react-dom/server';
import {
    Router,
    RouterContext,
    match,
    applyRouterMiddleware,
    browserHistory,
} from 'react-router';
import { Provider } from 'react-redux';
import RootRoute from '@infrastructure/RootRoute';
import * as appActions from '@redux/App/AppReducer';
import { createStore, applyMiddleware, compose } from 'redux';
import { useScroll } from 'react-router-scroll';
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';
import { syncHistoryWithStore } from 'react-router-redux';
import rootReducer from '@redux/RootReducer';
import rootSaga from '@redux/RootSaga';
import { component as NotFound } from '@pages/NotFound';
import Translator from '@infrastructure/Translator';
import config from '@constants/config';
import runRouter from '@extension/runRouter';

/**
 *
 * @param {*} location
 * @param {*} initialState
 * @param {*} ErrorPage
 * @param {*} userPreferences
 * @param {*} offchain
 * @param {RequestTimer} requestTimer
 * @returns promise
 */
export default async function serverRender(
    location,
    initialState,
    ErrorPage,
    userPreferences,
    requestTimer
) {
    let [error, redirect, renderProps] = await runRouter(
        location,
        RootRoute
    ).catch(e => {
        console.error('Routing error:', e.toString(), location);
        return {
            title: `Routing error - ${config.APP_NAME}`,
            statusCode: 500,
            body: renderToString(
                ErrorPage ? <ErrorPage /> : <span>Routing error</span>
            ),
        };
    });

    if (error || !renderProps) {
        return {
            title: `Page Not Found - ${config.APP_NAME}`,
            statusCode: 404,
            body: renderToString(<NotFound />),
        };
    }

    let server_store;
    try {
        server_store = createStore(rootReducer, {
            app: initialState.app,
        });

        server_store.dispatch({
            type: '@@router/LOCATION_CHANGE',
            payload: { pathname: location },
        });
        server_store.dispatch(appActions.setUserPreferences(userPreferences));
    } catch (e) {
        const msg = (e.toString && e.toString()) || e.message || e;
        const stack_trace = e.stack || '[no stack]';
        console.error('State/store create error: ', msg, stack_trace);
        return {
            title: `Server error - ${config.APP_NAME}`,
            statusCode: 500,
            body: renderToString(<ErrorPage />),
        };
    }

    let app, status;
    try {
        requestTimer.startTimer('ssr_ms');
        app = renderToString(
            <Provider store={server_store}>
                <Translator>
                    <RouterContext {...renderProps} />
                </Translator>
            </Provider>
        );
        requestTimer.stopTimer('ssr_ms');
    } catch (re) {
        console.error('Rendering error: ', re, re.stack);
        app = renderToString(<ErrorPage />);
        status = 500;
    }
    status = 200;

    return {
        title: `${config.APP_NAME}`,
        titleBase: `${config.APP_NAME} - `,
        statusCode: status,
        body: Iso.render(app, server_store.getState()),
    };
}
