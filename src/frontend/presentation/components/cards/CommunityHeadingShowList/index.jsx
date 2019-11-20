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
import CommunityAnswerItem from '@modules/CommunityAnswerItem';
import * as communityHeadingActions from '@redux/CommunityHeading/CommunityHeadingReducer';
import * as appActions from '@redux/App/AppReducer';
import LoadingIndicator from '@elements/LoadingIndicator';
import { isScrollEndByClass } from '@extension/scroll';
import CommunityAnswerNewSection from '@elements/CommunityAnswerNewSection';

class CommunityHeadingShowList extends React.Component {
    static propTypes = {
        repository: AppPropTypes.CommunityHeading,
        repositories: PropTypes.array,
    };

    static defaultProps = {
        repository: models.CommunityHeading.build(),
        repositories: [],
    };

    state = {};

    constructor(props) {
        super(props);
        autobind(this);
        this.shouldComponentUpdate = shouldComponentUpdate(
            this,
            'CommunityHeadingShowList'
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
        const { repository, repositories, loading } = this.props;

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
                <CommunityHeadingWantedItem repository={repository} />
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
                    <CommunityAnswerItem repository={item} />
                </div>
            ));

        return (
            <div className="heading-show-list">
                {top}
                {voter}
                {/*user*/}
                <div className="heading-show-list__category">
                    {tt('g.answers')}
                </div>
                <div className="heading-show-list__new">
                    <CommunityAnswerNewSection repository={repository} />
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
            repository: communityHeadingActions.getShowHeading(state),
            repositories: communityHeadingActions.getHeadingAnswer(state),
            loading: appActions.headingShowPageLoading(state),
        };
    },

    dispatch => ({
        getMore: () => {
            dispatch(communityHeadingActions.getMoreHeadingAnswer());
        },
    })
)(CommunityHeadingShowList);
