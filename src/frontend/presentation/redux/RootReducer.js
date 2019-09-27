import { Map, fromJS } from 'immutable';
import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
// import { contentStats } from '@utils/StateFunctions';
import { appReducer } from '@redux/App';
import { authReducer } from '@redux/Auth';
import { answerReducer } from '@redux/Answer';
import { headingReducer } from '@redux/Heading';
import { searchReducer } from '@redux/Search';
import { sessionReducer } from '@redux/Session';
import { userReducer } from '@redux/User';

function initReducer(reducer, type) {
    return (state, action) => {
        if (!state) return reducer(state, action);

        // @@redux/INIT server and client init
        if (action.type === '@@redux/INIT' || action.type === '@@INIT') {
            if (!(state instanceof Map)) {
                state = fromJS(state);
            }
            // if (type === 'global') {
            //     const content = state.get('content').withMutations(c => {
            //         c.forEach((cc, key) => {
            //             if (!c.getIn([key, 'stats'])) {
            //                 // This may have already been set in UniversalRender; if so, then
            //                 //   active_votes were cleared from server response. In this case it
            //                 //   is important to not try to recalculate the stats. (#1040)
            //                 c.setIn([key, 'stats'], fromJS(contentStats(cc)));
            //             }
            //         });
            //     });
            //     state = state.set('content', content);
            // }
            return state;
        }

        if (action.type === '@@router/LOCATION_CHANGE' && type === 'global') {
            state = state.set('pathname', action.payload.pathname);
            // console.log(action.type, type, action, state.toJS())
        }

        return reducer(state, action);
    };
}

export default combineReducers({
    app: initReducer(appReducer),
    auth: initReducer(authReducer),
    answer: initReducer(answerReducer),
    heading: initReducer(headingReducer),
    search: initReducer(searchReducer),
    session: initReducer(sessionReducer),
    user: initReducer(userReducer),
    routing: initReducer(routerReducer),
    form: formReducer,
});
