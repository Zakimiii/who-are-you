import React from 'react';
import PropTypes from 'prop-types';
import AppPropTypes from '@extension/AppPropTypes';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import shouldComponentUpdate from '@extension/shouldComponentUpdate';
import autobind from 'class-autobind';
import tt from 'counterpart';
import HeadingWantedItem from '@modules/HeadingWantedItem';
import models from '@network/client_models';
import UserSection from '@elements/UserSection';
import AnswerShowHeader from '@modules/AnswerShowHeader';
import * as answerActions from '@redux/Answer/AnswerReducer';
import { isScrollEndByClass } from '@extension/scroll';

class AnswerShowList extends React.Component {
    static propTypes = {
        repository: AppPropTypes.Answer,
    };

    static defaultProps = {
        repository: models.Answer.build(),
    };

    state = {};

    constructor(props) {
        super(props);
        autobind(this);
        this.shouldComponentUpdate = shouldComponentUpdate(
            this,
            'AnswerShowList'
        );
    }

    render() {
        const { repository } = this.props;

        if (!repository) return <div />;

        const top = (
            <div className="answer-show-list__top">
                <AnswerShowHeader repository={repository} />
            </div>
        );

        const user = (
            <div className="answer-show-list__user">
                <UserSection repository={repository.User} />
            </div>
        );

        const body = (
            <div className="answer-show-list__top">
                <HeadingWantedItem repository={repository.Heading} />
            </div>
        );

        return (
            <div className="answer-show-list">
                {top}
                {user}
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
            repository: answerActions.getShowAnswer(state),
        };
    },

    dispatch => ({})
)(AnswerShowList);
