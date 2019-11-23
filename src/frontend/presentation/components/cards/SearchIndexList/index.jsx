import React from 'react';
import PropTypes from 'prop-types';
import AppPropTypes from '@extension/AppPropTypes';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import shouldComponentUpdate from '@extension/shouldComponentUpdate';
import autobind from 'class-autobind';
import tt from 'counterpart';
import * as userActions from '@redux/User/UserReducer';
import * as searchActions from '@redux/Search/SearchReducer';
import * as appActions from '@redux/App/AppReducer';
import { browserHistory } from 'react-router';
import LoadingIndicator from '@elements/LoadingIndicator';
import { searchRoute } from '@infrastructure/RouteInitialize';
import FollowerBarItem from '@elements/FollowerBarItem';

class SearchIndexList extends React.Component {
    static propTypes = {
        loading: PropTypes.bool,
        repositories: PropTypes.array,
        loadMore: PropTypes.func,
        section: PropTypes.string,
    };

    static defaultProps = {
        loading: false,
        section: '',
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
            'SearchIndexList'
        );
    }

    componentWillReceiveProps(nextProps) {
        const { queryParams, searchUser, section } = this.props;

        if (!!queryParams.q && !!searchUser && nextProps.section == 'users') {
            searchUser(nextProps.queryParams.q);
        }
    }

    render() {
        const { repositories, section } = this.props;

        const renderItem = items =>
            items.map((item, key) => (
                <div className="heading-show-list__item" key={key}>
                    <FollowerBarItem repository={item} />
                </div>
            ));

        return (
            <div className="search-index-list">
                <div className="heading-show-list__category">
                    {tt('g.search_user_result')}
                </div>
                <div className="heading-show-list__items">
                    {repositories && renderItem(repositories)}
                </div>
            </div>
        );
    }
}

export default connect(
    (state, props) => {
        return {
            // loading: appActions.searchPageLoading(state),
            queryParams: browserHistory.getCurrentLocation().query,
            repositories: searchActions.getSearchUser(state),
        };
    },

    dispatch => ({
        searchUser: keyword => {
            dispatch(searchActions.searchUser({ keyword }));
        },
        loadMore: () => {
            dispatch(searchActions.getMoreSearchUser());
        },
    })
)(SearchIndexList);
