import { all } from 'redux-saga/effects';
import { appWatches } from '@redux/App';

export default function* rootSaga() {
    yield all([
        ...appWatches, // keep first to remove keys early when a page change happens
    ]);
}
