import { all } from 'redux-saga/effects';
import { appWatches } from '@redux/App';
import { authWatches } from '@redux/Auth';
import { answerWatches } from '@redux/Answer';
import { headingWatches } from '@redux/Heading';
import { searchWatches } from '@redux/Search';
import { sessionWatches } from '@redux/Session';
import { userWatches } from '@redux/User';
import { notificationWatches } from '@redux/Notification';
import { templateWatches } from '@redux/Template';

export default function* rootSaga() {
    yield all([
        ...appWatches, // keep first to remove keys early when a page change happens
        ...authWatches,
        ...answerWatches,
        ...headingWatches,
        ...searchWatches,
        ...sessionWatches,
        ...userWatches,
        ...notificationWatches,
        ...templateWatches,
    ]);
}
