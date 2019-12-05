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
import * as appActions from '@redux/App/AppReducer';
import LoadingIndicator from '@elements/LoadingIndicator';
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

    state = {
        fetched: false,
    }

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

    componentWillReceiveProps(nextProps) {
        const {
            more_loading,
            repositories,
        } = this.props;

        this.setState({
            fetched:
                more_loading &&
                !nextProps.more_loading &&
                repositories.length == nextProps.repositories.length,
        })
    }

    onWindowScroll() {
        const { getMore, username } = this.props;
        const { fetched } = this.state;
        const isEnd = isScrollEndByClass('heading-show-list__answers');
        if (isEnd && getMore && !fetched) getMore();
    }

    render() {
        const { repository, repositories, loading, more_loading } = this.props;

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
            <div className="heading-show-list__top">
                <HeadingWantedItem repository={repository} />
            </div>
        );

        const user = (
            <div className="heading-show-list__user">
                <UserSection
                    title={tt('g.votered')}
                    repository={repository.User}
                />
            </div>
        );

        const voter = (
            <div className="heading-show-list__user">
                <UserSection
                    title={tt('g.voter')}
                    repository={repository.Voter}
                />
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
                {repository.UserId != repository.VoterId && voter}
                {top}
                {user}
                <div className="heading-show-list__category">
                    {tt('g.answers')}
                </div>
                <div className="heading-show-list__new">
                    <AnswerNewSection repository={repository} />
                </div>
                <div className="heading-show-list__answers">
                    {repositories && renderItems(repositories)}
                </div>
                {more_loading && (
                    <center>
                        <LoadingIndicator
                            style={{ marginBottom: '2rem' }}
                            type={'circle'}
                        />
                    </center>
                )}
            </div>
        );
    }
}

export default connect(
    (state, props) => {
        return {
            repository: headingActions.getShowHeading(state),
            repositories: headingActions.getHeadingAnswer(state),
            loading: appActions.headingShowPageLoading(state),
            more_loading: state.app.get('more_loading'),
        };
    },

    dispatch => ({
        getMore: () => {
            dispatch(headingActions.getMoreHeadingAnswer());
        },
    })
)(HeadingShowList);
