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
import { communityWatches } from '@redux/Community';
import { categoryWatches } from '@redux/Category';
import { communityAnswerWatches } from '@redux/CommunityAnswer';
import { communityHeadingWatches } from '@redux/CommunityHeading';
import { communityTemplateWatches } from '@redux/CommunityTemplate';

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
        ...communityWatches,
        ...categoryWatches,
        ...communityAnswerWatches,
        ...communityHeadingWatches,
        ...communityTemplateWatches,
    ]);
}
