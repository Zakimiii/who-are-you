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
import AnswerItem from '@modules/AnswerItem';
import * as headingActions from '@redux/Heading/HeadingReducer';
import { isScrollEndByClass } from '@extension/scroll';
import AnswerNewSection from '@elements/AnswerNewSection';

class HeadingShowList extends React.Component {
    static propTypes = {
        repository: AppPropTypes.Heading,
        repositories: PropTypes.array,
    };

    static defaultProps = {
        repository: models.Heading.build(),
        repositories: [],
    };

    state = {};

    constructor(props) {
        super(props);
        autobind(this);
        this.shouldComponentUpdate = shouldComponentUpdate(
            this,
            'HeadingShowList'
        );
    }

    componentWillMount() {
        if (process.env.BROWSER)
            window.addEventListener('scroll', this.onWindowScroll, false);
    }

    componentWillUnmount() {
        if (process.env.BROWSER)
            window.removeEventListener('scroll', this.onWindowScroll, false);
    }

    onWindowScroll() {
        const { getMore, username } = this.props;
        const isEnd = isScrollEndByClass('heading-show-list__answers');
        if (isEnd && getMore) getMore();
    }

    render() {
        const { repository, repositories } = this.props;

        const top = (
            <div className="heading-show-list__top">
                <HeadingWantedItem repository={repository} />
            </div>
        );

        const user = (
            <div className="heading-show-list__user">
                <UserSection repository={repository.User} />
            </div>
        );

        const renderItems = items =>
            items.map((item, key) => (
                <div className="heading-show-list__answer" key={key}>
                    <AnswerItem repository={item} />
                </div>
            ));

        return (
            <div className="heading-show-list">
                {top}
                {user}
                <div className="heading-show-list__category">{'回答一覧'}</div>
                <div className="heading-show-list__new">
                    <AnswerNewSection repository={repository} />
                </div>
                <div className="heading-show-list__answers">
                    {repositories && renderItems(repositories)}
                </div>
            </div>
        );
    }
}

export default connect(
    (state, props) => {
        return {
            repository: headingActions.getShowHeading(state),
            repositories: headingActions.getHeadingAnswer(state),
        };
    },

    dispatch => ({
        getMore: () => {
            dispatch(headingActions.getMoreHeadingAnswer());
        },
    })
)(HeadingShowList);
