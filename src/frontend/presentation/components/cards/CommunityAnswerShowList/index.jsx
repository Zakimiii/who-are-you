import React from 'react';
import PropTypes from 'prop-types';
import AppPropTypes from '@extension/AppPropTypes';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import shouldComponentUpdate from '@extension/shouldComponentUpdate';
import autobind from 'class-autobind';
import tt from 'counterpart';
import CommunityHeadingWantedItem from '@modules/CommunityHeadingWantedItem';
import models from '@network/client_models';
import UserSection from '@elements/UserSection';
import CommunityAnswerShowHeader from '@modules/CommunityAnswerShowHeader';
import * as communityAnswerActions from '@redux/CommunityAnswer/CommunityAnswerReducer';
import * as appActions from '@redux/App/AppReducer';
import LoadingIndicator from '@elements/LoadingIndicator';
import { isScrollEndByClass } from '@extension/scroll';

class CommunityAnswerShowList extends React.Component {
    static propTypes = {
        repository: AppPropTypes.CommunityAnswer,
    };

    static defaultProps = {
        repository: models.CommunityAnswer.build(),
    };

    state = {};

    constructor(props) {
        super(props);
        autobind(this);
        this.shouldComponentUpdate = shouldComponentUpdate(
            this,
            'CommunityAnswerShowList'
        );
    }

    render() {
        const { repository, loading } = this.props;

        if (!repository || !repository.Heading) return <div />;

        if (loading) {
            return (
                <center>
                    <LoadingIndicator
                        style={{ marginTop: '2rem' }}
                        type={'circle'}
                    />
                </center>
            );
        }

        const top = (
            <div className="answer-show-list__top">
                <CommunityAnswerShowHeader repository={repository} />
            </div>
        );

        const voter = (
            <div className="answer-show-list__user">
                <UserSection
                    title={tt('g.respondent')}
                    repository={repository.User}
                />
            </div>
        );

        const user = (
            <div className="answer-show-list__user">
                <UserSection
                    title={tt('g.votered')}
                    repository={repository.Heading.User}
                />
            </div>
        );

        const body = (
            <div className="answer-show-list__top">
                <CommunityHeadingWantedItem repository={repository.Heading} />
            </div>
        );

        return (
            <div className="answer-show-list">
                {top}
                {voter}
                {/*user*/}
                <div className="heading-show-list__category">
                    {tt('g.answered_theme')}
                </div>
                {body}
            </div>
        );
    }
}

export default connect(
    (state, props) => {
        return {
            repository: communityAnswerActions.getShowAnswer(state),
            loading: appActions.answerShowPageLoading(state),
        };
    },

    dispatch => ({})
)(CommunityAnswerShowList);
