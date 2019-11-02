import React from 'react';
import PropTypes from 'prop-types';
import AppPropTypes from '@extension/AppPropTypes';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import shouldComponentUpdate from '@extension/shouldComponentUpdate';
import autobind from 'class-autobind';
import tt from 'counterpart';
import UserShowHeader from '@modules/UserShowHeader';
import HeadingNewButton from '@elements/HeadingNewButton';
import HeadingItem from '@modules/HeadingItem';
import { isScrollEndByClass } from '@extension/scroll';
import * as userActions from '@redux/User/UserReducer';
import * as authActions from '@redux/Auth/AuthReducer';
import * as headingActions from '@redux/Heading/HeadingReducer';
import * as appActions from '@redux/App/AppReducer';
import LoadingIndicator from '@elements/LoadingIndicator';
import HeadingNewSection from '@elements/HeadingNewSection';

class PostIndexList extends React.Component {
    static propTypes = {
        username: PropTypes.string,
        repository: AppPropTypes.User,
    };

    static defaultProps = {
        username: null,
        repository: null,
    };

    state = {};

    constructor(props) {
        super(props);
        autobind(this);
        this.shouldComponentUpdate = shouldComponentUpdate(
            this,
            'PostIndexList'
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
        const isEnd = isScrollEndByClass('user-show-list__body__items');
        if (isEnd && getMore) getMore();
    }

    render() {
        const { repository, repositories, loading } = this.props;

        const renderItems = items =>
            items.map((item, key) => (
                <div className="user-show-list__body__item" key={key}>
                    <HeadingItem repository={item} />
                </div>
            ));

        return (
            <div className="user-show-list">
                <div className="user-show-list__body">
                    <div className="user-show-list__body__category">
                        {tt('g.posts')}
                    </div>
                    <div className="user-show-list__body__items">
                        {loading ? (
                            <center>
                                <LoadingIndicator type={'circle'} />
                            </center>
                        ) : (
                            repositories &&
                            repositories.length > 0 &&
                            renderItems(repositories)
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(
    (state, props) => {
        return {
            repository: authActions.getCurrentUser(state),
            repositories: userActions.getUserPost(state),
            loading: appActions.postIndexPageLoading(state),
        };
    },

    dispatch => ({
        getMore: () => {
            dispatch(userActions.getMoreUserPost());
        },
    })
)(PostIndexList);
