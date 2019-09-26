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
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';
import { syncHistoryWithStore } from 'react-router-redux';
import rootReducer from '@redux/RootReducer';
import rootSaga from '@redux/RootSaga';
import NotFound from '@pages/NotFound';
import Translator from '@infrastructure/Translator';
import config from '@constants/config';
import scroll from '@extension/scroll';
import log from '@extension/log';

const bindMiddleware = middleware => {
    if (
        process.env.BROWSER &&
        (process.env.NODE_ENV === 'development' ||
            process.env.NODE_ENV === 'staging')
    ) {
        const { composeWithDevTools } = require('redux-devtools-extension');
        return composeWithDevTools(applyMiddleware(...middleware));
    }
    return applyMiddleware(...middleware);
};

const onRouterError = error => {
    console.error('onRouterError', error);
};

/**
 * dependencies:
 * browserHistory
 * useScroll
 * OffsetScrollBehavior
 * location
 *
 * @param {*} initialState
 */
export default function clientRender(initialState) {
    const sagaMiddleware = createSagaMiddleware();
    const store = createStore(
        rootReducer,
        initialState,
        bindMiddleware([sagaMiddleware])
    );
    sagaMiddleware.run(rootSaga);
    const history = syncHistoryWithStore(browserHistory, store);
    log.developperLog();
    return render(
        <Provider store={store}>
            <Translator>
                <Router
                    routes={RootRoute}
                    history={history}
                    onError={onRouterError}
                    render={applyRouterMiddleware(scroll)}
                />
            </Translator>
        </Provider>,
        document.getElementById('content')
    );
}
